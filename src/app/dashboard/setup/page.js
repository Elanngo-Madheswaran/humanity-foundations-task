'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';



export default function SetupPage() {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(null);
    
    // Form state
    const [businessData, setBusinessData] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
        services: '',
        products: '',
        city: '',
        state: '',
        zipCode: '',
        companySize: '',
        industry: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) router.push('/');
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBusinessData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Business data submitted:', businessData);
        // Add API call to save data
    };

    return (
        <div className="flex-1 p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-medium">Platform Setup</h1>
                <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Left column - Onboarding steps */}
                <div className="w-1/3">
                    <div className="bg-white p-6 rounded-md shadow-sm">
                        <h2 className="text-xl text-blue-600 font-medium mb-4">Get Started with ReferralHub</h2>
                        <p className="text-gray-600 mb-6">To get started with better referrals & rewards, complete your account setup in a few easy steps.</p>

                        <div className="border-t border-gray-200 pt-4">
                            <div className="flex items-start mb-4">
                                <div className="h-6 w-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-1"></div>
                                <div className="ml-4">
                                    <h3 className="font-medium">Set Up Business Profile</h3>
                                    <p className="text-sm text-gray-500">Not Started</p>
                                </div>
                            </div>

                            <div className="flex items-start mb-4">
                                <div className="h-6 w-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-1"></div>
                                <div className="ml-4">
                                    <h3 className="font-medium">Sync Your Customer Data</h3>
                                    <p className="text-sm text-gray-500">Not Started</p>
                                </div>
                            </div>

                            <div className="flex items-start mb-4">
                                <div className="h-6 w-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-1"></div>
                                <div className="ml-4">
                                    <h3 className="font-medium">Set Up AI Agent Rules</h3>
                                    <p className="text-sm text-gray-500">Not Started</p>
                                </div>
                            </div>

                            <div className="flex items-start mb-4">
                                <div className="h-6 w-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-1"></div>
                                <div className="ml-4">
                                    <h3 className="font-medium">Set Up First Campaign</h3>
                                    <p className="text-sm text-gray-500">Not Started</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column - Business Identity Form */}
                <div className="w-2/3">
                    <div className="bg-white p-6 rounded-md shadow-sm">
                        <h2 className="text-xl font-medium mb-2">Build Your Business Identity</h2>
                        <p className="text-gray-600 mb-6">Help us tailor the referral experience by adding key details about your business</p>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Business Logo</label>
                                <button className="border border-gray-300 rounded px-4 py-2 text-sm">Choose Image</button>
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
                                        name="name"
                                        value={businessData.name}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        placeholder="Enter business name"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Business Email</label>
                                    <input 
                                        type="email"
                                        name="email"
                                        value={businessData.email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        placeholder="e.g., robert.lee@myemail.com"
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Business Phone No.</label>
                                    <input 
                                        type="text"
                                        name="phone"
                                        value={businessData.phone}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        placeholder="Enter phone no."
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Industry</label>
                                    <select 
                                        name="industry"
                                        value={businessData.industry}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                    >
                                        <option value="">Select</option>
                                        <option value="technology">Technology</option>
                                        <option value="healthcare">Healthcare</option>
                                        <option value="finance">Finance</option>
                                        <option value="retail">Retail</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Services</label>
                                    <input 
                                        type="text"
                                        name="services"
                                        value={businessData.services}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        placeholder="Enter services..."
                                    />
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
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Company Size <span className="text-gray-400">(Optional)</span></label>
                                    <select 
                                        name="companySize"
                                        value={businessData.companySize}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                    >
                                        <option value="">Select</option>
                                        <option value="1-10">1-10 employees</option>
                                        <option value="11-50">11-50 employees</option>
                                        <option value="51-200">51-200 employees</option>
                                        <option value="201+">201+ employees</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">City</label>
                                    <select 
                                        name="city"
                                        value={businessData.city}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                    >
                                        <option value="">Select</option>
                                        <option value="new-york">New York</option>
                                        <option value="san-francisco">San Francisco</option>
                                        <option value="chicago">Chicago</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">State</label>
                                    <select 
                                        name="state"
                                        value={businessData.state}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                    >
                                        <option value="">Select</option>
                                        <option value="ny">New York</option>
                                        <option value="ca">California</option>
                                        <option value="il">Illinois</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Zip Code</label>
                                    <input 
                                        type="text"
                                        name="zipCode"
                                        value={businessData.zipCode}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        placeholder="Enter zip code"
                                    />
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