'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../public/components/Navbar';



export default function DashboardLayout({ children }) {
    const router = useRouter();

    useEffect(() => {
        // Check for authentication
        const token = localStorage.getItem('token');
        if (!token) router.push('/');
    }, [router]);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-56 bg-white border-r border-gray-200">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-medium text-blue-600">Platform Setup</h2>
                </div>
                <Navbar />
            </div>

            {/* Main content */}
            <div className="flex-1">
                {children}
            </div>

            {/* Floating action button */}
            <div className="fixed bottom-8 right-8">
                <button className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}