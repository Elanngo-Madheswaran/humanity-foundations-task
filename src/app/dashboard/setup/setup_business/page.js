// app/dashboard/setup/setup-business/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SetupBusinessPage() {
    const router = useRouter();
    const API_BASE_URL = 'http://34.10.166.233';
    
    // Form state
    const [businessData, setBusinessData] = useState({
        business_name: '',
        business_email: '',
        business_phno: '',
        description: '',
        products: '',
        city: '',
        state: '',
        zip_code: '',
        company_size: '',
        industry: '',
        business_type: 'service', // Default value
        tone_of_communication: 'professional', // Default value
        response_style: 'formal', // Default value
        auto_offer_help: false,
        user_initiated_only: false,
        platform_setup: true
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
            return;
        }
        
        // Check if we have business data in localStorage
        const savedBusinessData = localStorage.getItem('businessOwnerData');
        if (savedBusinessData) {
            setBusinessData(JSON.parse(savedBusinessData));
        }
        
        // Check if the user already has a business account
        fetchBusinessOwnerData(token);
    }, [router]);

    const fetchBusinessOwnerData = async (token) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/create-business-owner`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data && data.length > 0) {
                    // User already has business data
                    setBusinessData(data[0]);
                    localStorage.setItem('businessOwnerData', JSON.stringify(data[0]));
                }
            }
        } catch (error) {
            console.error('Error fetching business owner data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setBusinessData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/');
                return;
            }
            
            // Save to localStorage regardless of API success
            localStorage.setItem('businessOwnerData', JSON.stringify(businessData));
            
            // Get current user ID
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            const userId = userData.id;
            
            if (!userId) {
                // Continue to next page even without user ID
                router.push('/dashboard/setup/sync-customer');
                return;
            }
            
            // Prepare data for API
            const apiData = {
                ...businessData,
                user: userId
            };
            
            const response = await fetch(`${API_BASE_URL}/auth/create-business-owner`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(apiData)
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('Business owner created:', data);
            } else {
                console.error('Failed to create business owner:', await response.text());
            }
        } catch (error) {
            console.error('Error submitting business data:', error);
        }
        
        router.push('/dashboard/setup/sync-customer');
    };

    const [businessLogo, setBusinessLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBusinessLogo(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex">
            <div className="flex">
                <div className="">
                    <div className="bg-white p-6 rounded-md shadow-sm">
                        <h2 className="text-xl font-medium mb-2">Build Your Business Identity</h2>
                        <p className="text-gray-600 mb-6">Help us tailor the referral experience by adding key details about your business</p>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Business Logo</label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="file"
                                        id="logoUpload"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                        className="hidden"
                                    />
                                    <label 
                                        htmlFor="logoUpload" 
                                        className="border border-gray-300 rounded px-4 py-2 text-sm cursor-pointer hover:bg-gray-50"
                                    >
                                        Choose Image
                                    </label>
                                    {logoPreview && (
                                        <div className="relative">
                                            <img 
                                                src={logoPreview} 
                                                alt="Business logo preview" 
                                                className="h-16 w-16 object-cover rounded-md"
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => {
                                                    setBusinessLogo(null);
                                                    setLogoPreview(null);
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Business Description</label>
                                <textarea 
                                    name="description"
                                    value={businessData.description}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded p-2 text-sm"
                                    placeholder="Enter business description..."
                                    rows="3"
                                ></textarea>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Business Name</label>
                                    <input 
                                        type="text"
                                        name="business_name"
                                        value={businessData.business_name}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        placeholder="Enter business name"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Business Email</label>
                                    <input 
                                        type="email"
                                        name="business_email"
                                        value={businessData.business_email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        placeholder="e.g., business@example.com"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Business Phone No.</label>
                                    <input 
                                        type="text"
                                        name="business_phno"
                                        value={businessData.business_phno}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        placeholder="Enter phone no."
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Industry</label>
                                    <input
                                        type="text"
                                        name="industry"
                                        value={businessData.industry}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        placeholder="Enter industry"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Business Type</label>
                                    <select 
                                        name="business_type"
                                        value={businessData.business_type}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                    >
                                        <option value="product">Product</option>
                                        <option value="service">Service</option>
                                        <option value="both">Both</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Products</label>
                                    <input 
                                        type="text"
                                        name="products"
                                        value={businessData.products}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        placeholder="Enter products..."
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Company Size</label>
                                    <input 
                                        type="text"
                                        name="company_size"
                                        value={businessData.company_size}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        placeholder="e.g., 1-10 employees"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">City</label>
                                    <input 
                                        type="text"
                                        name="city"
                                        value={businessData.city}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        placeholder="Enter city"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">State</label>
                                    <input 
                                        type="text"
                                        name="state"
                                        value={businessData.state}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        placeholder="Enter state"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Zip Code</label>
                                    <input 
                                        type="text"
                                        name="zip_code"
                                        value={businessData.zip_code}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        placeholder="Enter zip code"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Tone of Communication</label>
                                    <input 
                                        type="text"
                                        name="tone_of_communication"
                                        value={businessData.tone_of_communication}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        placeholder="e.g., professional, friendly"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Response Style</label>
                                    <input 
                                        type="text"
                                        name="response_style"
                                        value={businessData.response_style}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        placeholder="e.g., formal, casual"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="auto_offer_help"
                                        name="auto_offer_help"
                                        checked={businessData.auto_offer_help}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="auto_offer_help" className="text-sm">Auto Offer Help</label>
                                </div>
                                
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="user_initiated_only"
                                        name="user_initiated_only"
                                        checked={businessData.user_initiated_only}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="user_initiated_only" className="text-sm">User Initiated Only</label>
                                </div>
                            </div>
                            
                            <div className="flex justify-end">
                                <button 
                                    type="submit" 
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded"
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
