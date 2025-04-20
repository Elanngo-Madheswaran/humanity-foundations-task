'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


export default function SetupRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/dashboard/setup/setup_business');
    }, [router]);

    return null;
}



