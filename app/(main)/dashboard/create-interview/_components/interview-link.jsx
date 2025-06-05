'use client';

import { Copy, CheckCircle, Mail, LinkedIn,Slack, Smartphone, Timer, ListTodo, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import toast from 'react-hot-toast';
import React from 'react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const InterviewLink = ({ interview_id, formData }) => {
    
    const getInterviewYUrl = () => {
        const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id;
        return url;
    };
    const handleCopy = () => {
        const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id;
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
    };

    const router = useRouter();

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    return (
        <div className="flex flex-col items-center justify-start pt-12 px-4 pb-8 min-h-screen ">
            <Card className="w-full max-w-3xl shadow-2xl border border-gray-200 rounded-xl overflow-hidden">
                <CardContent className="p-6 space-y-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="bg-green-50 p-3 rounded-full">
                            <CheckCircle className="text-green-600 w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Your AI Interview is Ready!
                        </h2>
                        <p className="text-gray-600 text-sm max-w-md">
                            Share this link with your candidates to start the interview process.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="text-lg font-medium text-gray-700">Interview Link</div>
                            <span className="text-md text-blue-700 font-semibold bg-blue-100 px-2 py-1 rounded-full">Valid for 30 days</span>
                        </div>

                        <div className="flex items-center gap-2">

                            <Input disabled={true} defaultValue={getInterviewYUrl()} className="text-sm text-black font-medium truncate" />
                            <Button
                                onClick={handleCopy}
                                variant="outline"
                                size="sm"
                                className="text-blue-700 cursor-pointer border-blue-200 hover:bg-blue-50"
                            >
                                <Copy className="w-4 h-4 cursor-pointer" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-gray-500 text-xs">
                            <div className="flex flex-col items-center bg-gray-50 rounded-lg p-2">
                                <Timer className="w-4 h-4 mb-1" />
                                <span className="text-black">{formData?.duration} Minutes</span>
                            </div>
                            <div className="flex flex-col items-center bg-gray-50 rounded-lg p-2">
                                <ListTodo className="w-4 h-4 mb-1" />
                                <span className="text-black">{formData?.questions} 10 Questions</span>
                            </div>
                            <div className="flex flex-col items-center bg-gray-50 rounded-lg p-2">
                                <Calendar className="w-4 h-4 mb-1" />
                                <span className="text-black">Expires on: {expiryDate.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}</span>

                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium">Share via</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <Button variant="outline" className="flex cursor-pointer gap-2 items-center justify-center h-10">
                                <Mail className="w-4 h-4" /> Email
                            </Button>
                            <Button variant="outline" className="flex cursor-pointer gap-2 items-center justify-center h-10">
                                <Slack className="w-4 h-4" /> LinkedIn
                            </Button>
                            <Button variant="outline" className="flex gap-2 cursor-pointer items-center justify-center h-10">
                                <Smartphone className="w-4 h-4" /> SMS
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-gray-200">
                        <Button onClick={() => router.push("/dashboard")} variant="default" className={"cursor-pointer"}>
                            <ArrowLeft /> Back to Dashboard
                        </Button>
                        <Button onClick={() => router.push("/dashboard/create-interview")} className="bg-green-600 hover:bg-green-700 text-white cursor-pointer">
                            + Create New Interview
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default InterviewLink;