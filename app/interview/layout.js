"use client";

import { InterviewDataContext } from '@/contexts/InterviewDataContext';
import React, { useState } from 'react';

const InterviewLayout = ({ children }) => {

    const [interviewInfo, setInterviewInfo] = useState("");

    return (
        <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
            <div>{children}</div>
        </InterviewDataContext.Provider>
    );
};

export default InterviewLayout;