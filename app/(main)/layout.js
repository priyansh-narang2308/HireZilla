import React from 'react';
import DashboardProvider from './provider';

const DashboardLayout = ({ children }) => {
    return (
        <div className="bg-gray-200 min-h-screen">
            <DashboardProvider>
                <div className="p-4 md:p-10">{children}</div>
            </DashboardProvider>
        </div>
    );
};

export default DashboardLayout;
