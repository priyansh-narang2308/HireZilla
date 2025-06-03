"use client";

import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState,useEffect } from 'react';
import FormContainer from './_components/form-container';

const CreateInterview = () => {

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState("");

  useEffect(() => {
    console.log("Formdata: ", formData);
  }, [formData]);

  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className='mt-10 px-10 md:px-24 lg:px-44 xl:px-56'>
      <div className='flex gap-5 items-center'>
        <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
        <h2 className='font-bold text-2xl'>Create new inteview</h2>
      </div>
      <Progress value={step * 33.33} className={"my-5 text-green-400"} />
      <FormContainer onHandleInputChange={onHandleInputChange} />
    </div>
  );
};

export default CreateInterview;