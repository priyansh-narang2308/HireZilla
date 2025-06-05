"use client";

import { InterviewDataContext } from "@/contexts/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertCompo from "./_components/alert-compo";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import clsx from "clsx";

const StartInterview = () => {
  const { interviewInfo } = useContext(InterviewDataContext);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);

  // Timer effect
  useEffect(() => {
    let interval;
    if (aiSpeaking || userSpeaking) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [aiSpeaking, userSpeaking]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    interviewInfo && StartCall();
  }, [interviewInfo]);

  const StartCall = () => {
    const questionList = interviewInfo?.interviewData?.questionList
      ?.map((item) => item?.question)
      .join(", ");


    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hey ${interviewInfo?.userName}, how’s it going? Ready to jump into your interview for the ${interviewInfo?.interviewData?.jobPosition} role? Let’s get started!`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You're an AI interviewer designed to sound very human—friendly, slightly informal, and engaging. 
You’re conducting a voice-based interview for the position of ${interviewInfo?.interviewData?.jobPosition}.

Start the conversation casually, like a human would. Use natural pauses, fillers like "umm", "ah", "alright", and conversational phrases like "you know?", "let’s see", etc.

Example intro:
"Hey ${interviewInfo?.userName}! Ah, hope you're doing well. So, today we're diving into your interview for the ${interviewInfo?.interviewData?.jobPosition} role. Ready? Let’s roll."

Your job:
- Ask one interview question at a time from this list:
  ${questionList}
- Wait for the candidate's full answer before asking the next question.
- If the candidate seems stuck, offer gentle hints or casually rephrase.
  For example:
  "Umm, think about how React manages state internally… Does that ring a bell?"
- Respond with short, natural feedback after answers:
  - “Oh nice, yeah that’s a solid one.”
  - “Hmm… not quite, but you’re close!”
  - “Yup, you nailed that one.”
- Keep your tone natural—like you're chatting over coffee.
- Occasionally use casual expressions like:
  - "Alright, next up!"
  - "Hmm, okay let’s go with a tricky one now..."
  - "You’re doing great, let’s keep going."

After about 5–7 questions, wrap things up:
- Give a quick summary of how they did, e.g.:
  - “That was awesome! You handled some tough stuff really well.”
- End on a cheerful, encouraging note:
  - “Thanks for chatting! Keep practicing and I’m sure you’ll crush it out there.”

Important:
✅ Sound casual and human
✅ Use filler words, pauses, and soft humor
✅ Never sound robotic or overly formal
✅ Focus the interview content on React, but make the experience fun
      `.trim(),
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    vapi.stop();
  };

  const handleCameraToggle = async () => {
    setShowCamera((prev) => !prev);
    if (!showCamera && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access error:", err);
      }
    } else {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    }
  };

  vapi.on("call-start", () => {
    toast.success("Call Connected");
    setCallDuration(0);
  });
  vapi.on("call-end", () => toast.success("Interview Ended"));
  vapi.on("speech-start", ({ speaker }) => {
    if (speaker === "assistant") {
      setAiSpeaking(true);
      setUserSpeaking(false);
    } else {
      setUserSpeaking(true);
      setAiSpeaking(false);
    }
  });
  vapi.on("speech-end", () => {
    setAiSpeaking(false);
    setUserSpeaking(false);
  });

  return (
    <div className="min-h-screen bg-[#0D1117] text-white px-6 py-10 lg:px-32 xl:px-48 transition-all">
      <div className="flex justify-between items-center border-b border-gray-700 pb-6">
        <h1 className="text-3xl font-extrabold tracking-wide text-green-400">
          AI Interview Session
        </h1>
        <div className="flex items-center gap-2 text-gray-400 text-lg font-semibold">
          <Timer className="w-5 h-5 text-green-400 animate-pulse" />
          {formatTime(callDuration)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div
          className={clsx(
            "bg-[#161B22] border rounded-2xl h-[400px] flex flex-col items-center justify-center gap-4 relative transition-all",
            aiSpeaking
              ? "border-green-500 shadow-lg shadow-green-500/30"
              : "border-gray-700"
          )}
        >
          {aiSpeaking && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent opacity-20 animate-pulse"></div>
          )}

          <div className="relative z-10 flex flex-col items-center justify-center gap-4">
            <div className={clsx(
              "rounded-full p-1 transition-all",
              aiSpeaking ? "ring-2 ring-green-500" : "ring-1 ring-gray-600"
            )}>
              <Image
                src="/ailogo.png"
                alt="AI Logo"
                width={120}
                height={120}
                className={clsx(
                  "rounded-full object-cover shadow-md",
                  aiSpeaking ? "scale-105" : "scale-100"
                )}
              />
            </div>
            <span className="text-lg font-semibold text-gray-300">
              AI Recruiter
            </span>
            {aiSpeaking && (
              <div className="flex space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>
        </div>

        <div
          className={clsx(
            "bg-[#161B22] border rounded-2xl h-[400px] flex flex-col items-center justify-center gap-4 relative transition-all",
            userSpeaking
              ? "border-blue-500 shadow-lg shadow-blue-500/30"
              : "border-gray-700"
          )}
        >
          {userSpeaking && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-20 animate-pulse"></div>
          )}

          <div className="relative z-10 flex flex-col items-center justify-center gap-4">
            {showCamera ? (
              <div className={clsx(
                "rounded-xl overflow-hidden transition-all",
                userSpeaking ? "ring-2 ring-blue-500" : "ring-1 ring-gray-600"
              )}>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className={clsx(
                "w-24 h-24 rounded-full bg-green-600 flex items-center justify-center text-white text-4xl font-bold shadow-md transition-all",
                userSpeaking ? "ring-2 ring-blue-500 scale-105" : "ring-1 ring-gray-600 scale-100"
              )}>
                {interviewInfo?.userName?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <span className="text-lg font-semibold text-gray-300">You</span>
            {userSpeaking && (
              <div className="flex space-x-2 mt-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>

          <Button
            variant={"outline"}
            onClick={handleCameraToggle}
            className="absolute top-4 right-4 px-3 py-1 text-sm text-black hover:bg-gray-300 rounded-full shadow z-10"
          >
            {showCamera ? "Hide Camera" : "Show Camera"}
          </Button>
        </div>
      </div>

      <div className="flex justify-center gap-8 mt-12 flex-wrap">
        <Button
          className={clsx(
            "flex items-center justify-center gap-3 text-white font-semibold py-3 px-6 min-w-[220px] rounded-full shadow-lg",
            userSpeaking ? "bg-green-700" : "bg-green-600 hover:bg-green-700"
          )}
        >
          <Mic className="w-5 h-5" />
          {userSpeaking ? "Speaking..." : "Speak to Answer"}
        </Button>

        <AlertCompo stopInterview={stopInterview}>
          <Button className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 min-w-[220px] rounded-full shadow-lg">
            <Phone className="w-5 h-5" />
            End Interview
          </Button>
        </AlertCompo>
      </div>

      <h2 className={clsx(
        "text-center mt-6 text-2xl font-medium",
        aiSpeaking || userSpeaking ? "text-green-400" : "text-gray-400"
      )}>
        {aiSpeaking
          ? "AI Recruiter is speaking..."
          : userSpeaking
            ? "Listening to your response..."
            : "Interview In Progress..."}
      </h2>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default StartInterview;


