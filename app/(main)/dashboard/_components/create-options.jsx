"use client"

import { Phone, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const CreateOptions = () => {

    const router = useRouter();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[var(--sidebar)] border border-[var(--sidebar-border)] hover:border-green-500 rounded-xl p-6 shadow-md hover:shadow-green-500/20 transition-all duration-300 group cursor-pointer">
                <div className="flex items-center gap-4" onClick={() => router.push("/dashboard/create-interview")}>
                    <div className="bg-green-600/10 text-green-400 p-3 rounded-lg group-hover:bg-green-600/20 transition" >
                            <Video className="h-6 w-6" />
                        </div>
                        <h2 className="text-lg font-semibold text-black group-hover:text-green-400 transition">
                            Create New Interview
                        </h2>
                </div>
                <p className="text-sm text-muted-foreground mt-3 ml-1">
                    Use AI to automate interviews and streamline your hiring flow.
                </p>
            </div>

            <div className="bg-gradient-to-br from-[#0f0f0f] to-[#111] border border-[var(--sidebar-border)] hover:border-green-400 rounded-xl p-6 shadow-md hover:shadow-green-500/10 transition-all duration-300 group cursor-pointer">
                <div className="flex items-center gap-4">
                    <div className="bg-green-600/10 text-green-400 p-3 rounded-lg group-hover:bg-green-600/20 transition">
                        <Phone className="h-6 w-6" />
                    </div>
                    <h2 className="text-lg font-semibold text-white group-hover:text-green-400 transition">
                        Create Phone Screening
                    </h2>
                </div>
                <p className="text-sm text-muted-foreground mt-3 ml-1">
                    Schedule quick phone screenings to pre-qualify candidates with ease.
                </p>
            </div>
        </div >
    );
};

export default CreateOptions;
