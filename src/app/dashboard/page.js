'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';



export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to setup page
        router.push('/dashboard/setup');
    }, [router]);

    // Return a minimal loading state while redirecting
    return (
        <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Redirecting...</p>
        </div>
    );
}