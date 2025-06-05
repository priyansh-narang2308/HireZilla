"use client";

import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Clock, Lightbulb, Video, Mic, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/services/supabase-client';
import toast from 'react-hot-toast';
import { InterviewDataContext } from '@/contexts/InterviewDataContext';

const InterviewPage = () => {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const videoRef = useRef(null);


  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);

  const router = useRouter();

  useEffect(() => {
    interview_id && getInterviwDetail();
  }, [interview_id]);

  const getInterviwDetail = async () => {
    setLoading(true);
    const { data: Interviews, error } = await supabase
      .from('Interviews')
      .select("jobPosition, jobDescription, duration, type")
      .eq("interview_id", interview_id);

    if (error) {
      console.log(error);
      toast.error("Interview Link Error");
    } else {
      setInterviewData(Interviews[0]);
    }
    setLoading(false);
  };

  const startPreview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setPreviewing(true);
    } catch (err) {
      toast.error("Unable to access camera/mic");
      console.error(err);
    }
  };

  const onJoinInterview = async () => {
    setLoading(true);
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("interview_id", interview_id);

    console.log(Interviews[0]);
    setInterviewInfo({
      userName: userName,
      interviewData: Interviews[0]
    });
    router.push(`/interview/${interview_id}/start`);
    setLoading(false);

    if (error) {
      console.log(error);
    }

  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-6xl border border-green-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex flex-col items-center lg:items-start">
              <Image
                src="/interviewlogo.png"
                alt="Interview Logo"
                width={120}
                height={120}
                className="rounded-xl shadow-lg mb-4"
              />
              <h1 className="text-3xl font-bold text-green-700 mb-1">HireZilla</h1>
              <h2 className="text-xl font-semibold text-green-600 text-center lg:text-left">
                {interviewData?.jobPosition || "Loading position..."}
              </h2>
              {interviewData?.duration && (
                <div className="flex items-center text-gray-500 gap-2 mt-2">
                  <Clock className="w-5 h-5" />
                  <span>{interviewData.duration} Minutes</span>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Enter your full name
                </label>
                <Input
                  id="fullName"
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full"
                />
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  <span className="font-semibold">Before you begin:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Stable internet connection</li>
                  <li>Use laptop/desktop with mic & camera</li>
                  <li>Quiet and well-lit environment</li>
                  <li>Resume and ID nearby</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {loading ?
                <Button
                  onClick={() => onJoinInterview()}
                  disabled={loading || !userName}
                  className="w-full sm:w-auto cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Video className="w-5 h-5" />
                  <Loader2 />  Joining Interview
                </Button> : <Button
                  onClick={() => onJoinInterview()}
                  disabled={loading || !userName}
                  className="w-full sm:w-auto cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Video className="w-5 h-5" />
                  Join Interview
                </Button>
              }
              <Button
                type="button"
                onClick={startPreview}
                className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <Mic className="w-5 h-5" />
                Test Audio/Video
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md aspect-video bg-gray-100 rounded-xl border-2 border-gray-200 overflow-hidden flex items-center justify-center">
              {previewing ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                />
              ) : (
                <div className="text-center p-6">
                  <div className="mx-auto bg-gray-200 rounded-full p-4 mb-3 w-16 h-16 flex items-center justify-center">
                    <Video className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">Video preview will appear here</p>
                  <p className="text-sm text-gray-400 mt-1">Click "Test Audio/Video" to start</p>
                </div>
              )}
            </div>
            {previewing && (
              <p className="mt-3 text-sm text-green-600 font-medium flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Camera and microphone are working
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;