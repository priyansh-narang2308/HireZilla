"use client";

import { InterviewDataContext } from "@/contexts/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertCompo from "./_components/alert-compo";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const StartInterview = () => {
  const { interviewInfo } = useContext(InterviewDataContext);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
  const router = useRouter();

  useEffect(() => {
    let interval;
    if (aiSpeaking || userSpeaking) {
      interval = setInterval(() => setCallDuration((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [aiSpeaking, userSpeaking]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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
    router.push("/feedback")
  };

  const handleCameraToggle = async () => {
    setShowCamera((prev) => !prev);
    if (!showCamera && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera error:", err);
      }
    } else if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  vapi.on("call-start", () => toast.success("Call Connected"));
  vapi.on("call-end", () => toast.success("Interview Ended"));
  vapi.on("speech-start", ({ speaker }) => {
    speaker === "assistant"
      ? (setAiSpeaking(true), setUserSpeaking(false))
      : (setUserSpeaking(true), setAiSpeaking(false));
  });
  vapi.on("speech-end", () => {
    setAiSpeaking(false);
    setUserSpeaking(false);
  });

  vapi.on("message", (message) => {
    console.log(message);
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="flex justify-between items-center border-b border-gray-700 pb-4">
        <h1 className="text-xl md:text-2xl font-bold text-green-400">
          AI Interview
        </h1>
        <div className="flex items-center gap-2 text-gray-400">
          <Timer className="w-4 h-4 text-green-400" />
          {formatTime(callDuration)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div
          className={`bg-gray-800 border rounded-xl h-64 md:h-80 flex flex-col items-center justify-center ${
            aiSpeaking ? "border-green-500" : "border-gray-700"
          }`}
        >
          <div className="relative">
            <Image
              src="/ailogo.png"
              alt="AI"
              width={80}
              height={80}
              className={`rounded-full ${aiSpeaking ? "scale-110" : ""}`}
            />
          </div>
          <span className="mt-2 text-gray-300">AI Recruiter</span>
          {aiSpeaking && <div className="mt-1 text-green-400">Speaking...</div>}
        </div>

        {/* User Panel */}
        <div
          className={`bg-gray-800 border rounded-xl h-64 md:h-80 flex flex-col items-center justify-center ${
            userSpeaking ? "border-blue-500" : "border-gray-700"
          }`}
        >
          {showCamera ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="h-40 rounded-lg"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl">
              {interviewInfo?.userName?.[0]?.toUpperCase() || "U"}
            </div>
          )}
          <span className="mt-2 text-gray-300">You</span>
          {userSpeaking && (
            <div className="mt-1 text-blue-400">Speaking...</div>
          )}
          <Button
            onClick={handleCameraToggle}
            variant="default"
            size="sm"
            className="mt-2"
          >
            {showCamera ? "Hide Camera" : "Show Camera"}
          </Button>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Button
          className={`flex items-center gap-2 ${
            userSpeaking ? "bg-green-700" : "bg-green-600"
          }`}
        >
          <Mic size={16} />
          {userSpeaking ? "Speaking..." : "Speak"}
        </Button>

        <AlertCompo stopInterview={stopInterview}>
          <Button variant="destructive" className="flex items-center gap-2">
            <Phone size={16} />
            End Interview
          </Button>
        </AlertCompo>
      </div>

      <div className="text-center mt-4 text-gray-400">
        {aiSpeaking
          ? "AI is speaking..."
          : userSpeaking
          ? "Listening to you..."
          : "Interview in progress"}
      </div>
    </div>
  );
};

export default StartInterview;
