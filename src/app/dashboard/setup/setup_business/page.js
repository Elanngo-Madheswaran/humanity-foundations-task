// app/dashboard/setup/setup-business/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SetupBusinessPage() {
    const router = useRouter();
    
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
