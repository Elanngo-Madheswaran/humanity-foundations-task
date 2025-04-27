'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SyncCustomerData() {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const router = useRouter();
    
    // Check for business data on component mount
    useEffect(() => {
        const businessData = localStorage.getItem('businessOwnerData');
        
        // If no business data is found, redirect to the business setup page
        if (!businessData) {
            router.push('/dashboard/setup/setup_business');
        }
    }, [router]);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) {
            setIsDragging(true);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleNext = () => {
        // Handle the file upload or Zapier connection logic here
        router.push('/dashboard/setup/ai-agent-rules');
    };

    return (
        <div className="bg-white p-6 rounded-md shadow-sm">
            <h1 className="text-xl font-medium mb-6">Import Customer Data: Sync with Zapier or Upload CSV</h1>
            
            <div className="mb-8">
                <button 
                    className="w-full py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                >
                    Connect with Zapier
                </button>
            </div>
            
            <div className="flex items-center justify-center mb-8">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="px-4 text-gray-500 text-sm">or</span>
                <div className="flex-grow h-px bg-gray-200"></div>
            </div>
            
            <div 
                className={`border-2 border-dashed rounded-md p-8 mb-6 flex flex-col items-center justify-center cursor-pointer ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="text-blue-500 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                </div>
                <p className="text-gray-600 mb-2">Drag and drop files here</p>
                <p className="text-gray-500 text-sm mb-4">or</p>
                
                <label className="cursor-pointer w-full flex">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <span className="text-blue-500 p-2 border border-blue-500 rounded-md hover:bg-blue-50 transition-colors w-full self-center text-center">Click to Upload CSV File</span>
                </label>
                
                {file && (
                    <div className="mt-4 text-sm text-gray-600">
                        Selected: {file.name}
                    </div>
                )}
            </div>
            
            <div className='w-full flex justify-center'>
                <button
                    onClick={handleNext}
                    className="w-50 mt-1.5 bg-gradient-to-r from-blue-600/80 to-blue-200  text-white py-1.5 rounded-md hover:bg-blue-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
}