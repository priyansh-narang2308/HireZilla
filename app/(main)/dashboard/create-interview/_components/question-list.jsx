import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import QuestionListContainer from './question-list-container';
import { supabase } from '@/services/supabase-client';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const QuestionList = ({ formData, onCreateLink }) => {
    const [loading, setLoading] = useState(false);
    const [questionList, setQuestionList] = useState([]);
    const { user } = useUser();

    const router = useRouter();

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (formData) {
            generateAIQuestions();
        }
    }, [formData]);

    const generateAIQuestions = async () => {
        setLoading(true);
        try {
            const result = await axios.post("/api/ai-model", {
                ...formData,
            });

            let content = result.data.content || "";
            content = content.replace(/```json|```/g, "").trim();

            console.log("RAW content:", content);

            let parsed;
            try {
                parsed = JSON.parse(content);
            } catch (firstErr) {
                try {
                    // If direct parse fails, try to fix common issues
                    // 1. Remove any trailing commas
                    content = content.replace(/,\s*([}\]])/g, '$1');
                    // 2. Fix unquoted property names
                    content = content.replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3');
                    // 3. Escape any problematic characters
                    content = content.replace(/\\'/g, "'").replace(/\\"/g, '"');

                    parsed = JSON.parse(content);
                } catch (finalErr) {
                    console.error("Final JSON parsing error:", finalErr);
                    return;
                }
            }

            // Handle different possible response formats
            let questions = [];
            if (Array.isArray(parsed)) {
                questions = parsed;
            } else if (parsed && typeof parsed === 'object') {
                questions = parsed.interviewQuestions ||
                    parsed.questions ||
                    parsed.items ||
                    (parsed.data && Array.isArray(parsed.data) ? parsed.data : []);
            }

            if (Array.isArray(questions)) {
                // Filter out any invalid entries and ensure each has at least a question property
                const validQuestions = questions.filter(q =>
                    q && (typeof q.question === 'string' || typeof q.text === 'string')
                ).map(q => ({
                    question: q.question || q.text,
                    type: q.type || 'General'
                }));

                if (validQuestions.length > 0) {
                    setQuestionList(validQuestions);
                    toast.success("Questions Generated Successfully");
                } else {
                    toast.error("No valid questions found in AI response.");
                }
            } else {
                toast.error("Unexpected questions format in AI response.");
            }

        } catch (error) {
            console.error("Request failed:", error);
            toast.error(error.response?.data?.message || "Failed to generate questions.");
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async () => {

        setSaving(true);
        const interview_id = uuidv4();
        const { data, error } = await supabase
            .from('Interviews')
            .insert([
                {
                    ...formData,
                    questionList: questionList,
                    userEmail: user?.email,
                    interview_id: interview_id
                },
            ])
            .select();

        console.log(data);
        setSaving(false);
        toast.success("Saved");

        onCreateLink(
            interview_id
        );
    };

    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-50 bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-md flex items-center justify-center">
                    <div className="bg-white rounded-3xl px-10 py-8 shadow-2xl border border-green-400 animate-pulse max-w-md text-center">
                        <img
                            src="/loading.gif"
                            alt="Loading..."
                            className="w-24 h-24 mx-auto mb-4"
                        />
                        <h2 className="text-2xl font-semibold text-green-700">
                            Generating Questions...
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">
                            Please wait while we craft personalized interview questions for you.
                        </p>
                    </div>
                </div>
            )}

            {!loading && questionList?.length > 0 && (
                <>
                    <QuestionListContainer questionList={questionList} />

                    <div className="flex justify-end mt-10 ">
                        {saving ? <Button onClick={onFinish} disabled={saving} className="cursor-pointer w-full rounded-full">
                            <Loader2 className='animate-spin' />            Creating Interview Link
                        </Button> : <Button onClick={onFinish} className="cursor-pointer w-full rounded-full">
                            Create Interview Link
                        </Button>}

                    </div>
                </>
            )}
        </>
    );
};

export default QuestionList;