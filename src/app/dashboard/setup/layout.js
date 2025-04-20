// app/dashboard/setup/layout.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SetupLayout({ children }) {
    const pathname = usePathname();

    const steps = [
        { name: "Set Up Business Profile", path: "/dashboard/setup/setup_business" },
        { name: "Sync Your Customer Data", path: "/dashboard/setup/sync-customer" },
        { name: "Set Up AI Agent Rules", path: "/dashboard/setup/ai-agent-rules" },
        { name: "Set Up First Campaign", path: "/dashboard/setup/first-campaign" }
    ];

    // Get current step index
    const currentStepIndex = steps.findIndex(step => step.path === pathname);

    return (
        <div className="flex-1">
            <div className="flex justify-between items-center m-5">
                <h1 className="text-2xl font-medium">Platform Setup</h1>
                <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Sidebar */}
                <div className="w-1/3">
                    <div className="bg-white p-6 rounded-md shadow-sm">
                        <h2 className="text-xl text-blue-600 font-medium mb-4">Get Started with ReferralHub</h2>
                        <p className="text-gray-600 mb-6">To get started with better referrals & rewards, complete your account setup in a few easy steps.</p>

                        <div className="border-t border-gray-200 pt-4">
                            {steps.map((step, idx) => {
                                const isCompleted = idx < currentStepIndex;
                                const isCurrent = idx === currentStepIndex;
                                
                                return (
                                    <Link 
                                        key={idx} 
                                        href={step.path} 
                                        className={`block mb-4 ${isCurrent ? 'bg-blue-50 rounded-md p-2 -ml-2' : ''}`}
                                    >
                                        <div className="flex items-start">
                                            <div className={`h-6 w-6 rounded-full flex-shrink-0 mt-1 flex items-center justify-center ${
                                                isCompleted 
                                                    ? 'bg-green-500 border-green-500' 
                                                    : isCurrent 
                                                        ? 'bg-white border-2 border-blue-600' 
                                                        : 'border-2 border-gray-300'
                                            }`}>
                                                {isCompleted && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {isCurrent && (
                                                    <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <h3 className={`font-medium ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : ''}`}>
                                                    {step.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Not Started'}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Main form */}
                <div className="w-2/3">
                    {children}
                </div>
            </div>
        </div>
    );
}
