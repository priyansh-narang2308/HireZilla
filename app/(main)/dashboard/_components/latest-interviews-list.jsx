"use client";

import { Button } from '@/components/ui/button';
import { VideoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LatestInterviews = () => {
    const [interviewList, setInterviewList] = useState([]);
    const router = useRouter();

    return (
        <div className="my-8">
            <h2 className="text-2xl font-semibold text-black mb-4">
                Previously Created Interviews
            </h2>

            {interviewList?.length === 0 && (
                <div className="p-8 rounded-xl bg-[var(--sidebar)] border border-[var(--sidebar-border)] flex flex-col items-center justify-center gap-4 shadow-md text-center">
                    <VideoIcon className="h-10 w-10 text-green-500" />
                    <h3 className="text-black text-lg font-medium">
                        You don't have any interviews created.
                    </h3>
                    <Button
                        onClick={() => router.push("/dashboard/create-interview")}
                        className="bg-green-500 cursor-pointer hover:bg-green-400 text-black font-semibold px-5 py-2 rounded-md transition-all shadow-green-400/20 shadow"
                    >
                        Create New Interview
                    </Button>
                </div>
            )}
        </div>
    );
};

export default LatestInterviews;
