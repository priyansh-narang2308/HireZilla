"use client";

import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import FormContainer from './_components/form-container';
import QuestionList from './_components/question-list';
import toast from 'react-hot-toast';
import InterviewLink from './_components/interview-link';

const CreateInterview = () => {

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState("");

  const [interviewId, setInterviewId] = useState("");

  useEffect(() => {
    console.log("Formdata: ", formData);
  }, [formData]);

  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const onGoToNext = () => {
    if (!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData?.type) {
      toast.error("All Details Required!");
      return;
    }
    setStep(step + 1);
  };

  const onCreateLink = (interview_id) => {
    setInterviewId(interview_id);
    setStep(step + 1);
  };

  return (
    <div className='mt-10 px-10 md:px-24 lg:px-44 xl:px-56'>
      <div className='flex gap-5 items-center'>
        <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
        <h2 className='font-bold text-2xl'>Create new inteview</h2>
      </div>
      <Progress value={step * 33.33} className={"my-5 text-green-400"} />
      {
        step === 1 ? <FormContainer onHandleInputChange={onHandleInputChange} goToNext={() => onGoToNext()} />
          : step === 2 ? <QuestionList formData={formData} onCreateLink={(interview_id) => onCreateLink(interview_id)} />
            : step === 3 ? <InterviewLink interview_id={interviewId} formData={formData} /> : null
      }
    </div>
  );
};

export default CreateInterview;