"use client";

import { useUser } from '@/app/provider';
import { Bell } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const WelcomeContainer = () => {
    const { user } = useUser();

    return (
        <div className="bg-white text-[var(--sidebar-foreground)] p-6 md:p-8 rounded-2xl w-full flex flex-col md:flex-row justify-between items-center shadow-md gap-4 md:gap-0 transition-all">
            <div className="flex flex-col items-start">
                <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-1">
                    Welcome back{user?.name ? `, ${user.name}` : ''} 👋
                </h2>
                <p className="text-sm md:text-base text-gray-800">
                    AI-driven interviews. Hassle-free hiring.
                </p>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/20 transition">
                    <Bell className="w-5 h-5 " />
                </button>
                {user?.picture && (
                    <Image
                        src={user.picture}
                        alt="avatar"
                        width={40}
                        height={40}
                        className="rounded-full border border-green-500 shadow-lg cursor-pointer"
                    />
                )}
            </div>
        </div>
    );
};

export default WelcomeContainer;
