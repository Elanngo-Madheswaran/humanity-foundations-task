'use client';
import React, { useState } from 'react';
import { FiPlus, FiSearch, FiFilter, FiEye, FiTrash2 } from 'react-icons/fi';
import { TbBulb } from 'react-icons/tb';
import axios from 'axios';

export default function CampaignPage() {
    const [campaigns, setCampaigns] = useState([
        {
            id: 1,
            name: 'Summer Referral Program',
            startDate: '5/31/2024',
            endDate: '8/30/2024',
            status: 'Active',
            referrals: 245,
            conversion: 32,
            roi: 287,
            suggestion: 'Increase reward by 10% to boost conversion rates during peak season'
        },
        {
            id: 2,
            name: 'Early Bird Special',
            startDate: '8/20/2024',
            endDate: '9/19/2024',
            status: 'Inactive',
            referrals: 300,
            conversion: 40,
            roi: 320,
            suggestion: 'Extend your campaign! Strong engagement suggests higher conversions with more time.'
        }
    ]);

    const [activeTab, setActiveTab] = useState('Past Promoters');
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [businessOwner, setBusinessOwner] = useState({
        business_name: '',
        business_email: '',
        business_phno: '',
        industry: '',
        business_type: 'Small',
        products: '',
        company_size: '',
        city: '',
        state: '',
        zip_code: '',
        tone_of_communication: 'Professional',
        response_style: 'Detailed',
        auto_offer_help: true,
        user_initiated_only: false,
        platform_setup: true,
        user: 1 // Default user ID, replace with actual user ID
    });
    
    const businessTypes = ['Small', 'Medium', 'Large'];
    const toneOptions = ['Professional', 'Casual', 'Friendly', 'Formal'];
    const styleOptions = ['Detailed', 'Concise', 'Technical', 'Simple'];
    
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBusinessOwner({
            ...businessOwner,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://34.10.166.233/auth/create-business-owner', 
                businessOwner,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 201) {
                alert('Business owner registered successfully!');
                setShowRegisterForm(false);
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Failed to register business owner: ' + (error.response?.data?.message || error.message));
        }
    };

    if (showRegisterForm) {
        return (
            <div className="p-8 bg-white">
                <h2 className="text-2xl font-bold mb-6">Register Business Owner</h2>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name*</label>
                            <input
                                type="text"
                                name="business_name"
                                required
                                value={businessOwner.business_name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Business Email*</label>
                            <input
                                type="email"
                                name="business_email"
                                required
                                value={businessOwner.business_email}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Business Phone*</label>
                            <input
                                type="text"
                                name="business_phno"
                                required
                                value={businessOwner.business_phno}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Industry*</label>
                            <input
                                type="text"
                                name="industry"
                                required
                                value={businessOwner.industry}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                            <select
                                name="business_type"
                                value={businessOwner.business_type}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            >
                                {businessTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Products/Services*</label>
                            <input
                                type="text"
                                name="products"
                                required
                                value={businessOwner.products}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Size*</label>
                            <input
                                type="text"
                                name="company_size"
                                required
                                value={businessOwner.company_size}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
                            <input
                                type="text"
                                name="city"
                                required
                                value={businessOwner.city}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
                            <input
                                type="text"
                                name="state"
                                required
                                value={businessOwner.state}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code*</label>
                            <input
                                type="text"
                                name="zip_code"
                                required
                                value={businessOwner.zip_code}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tone of Communication*</label>
                            <select
                                name="tone_of_communication"
                                required
                                value={businessOwner.tone_of_communication}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            >
                                {toneOptions.map(tone => (
                                    <option key={tone} value={tone}>{tone}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Response Style*</label>
                            <select
                                name="response_style"
                                required
                                value={businessOwner.response_style}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            >
                                {styleOptions.map(style => (
                                    <option key={style} value={style}>{style}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="auto_offer_help"
                                checked={businessOwner.auto_offer_help}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <label className="text-sm text-gray-700">Auto offer help</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="user_initiated_only"
                                checked={businessOwner.user_initiated_only}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <label className="text-sm text-gray-700">User initiated only</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="platform_setup"
                                checked={businessOwner.platform_setup}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <label className="text-sm text-gray-700">Platform setup</label>
                        </div>
                    </div>
                    
                    <div className="flex space-x-4">
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Register Business
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setShowRegisterForm(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="p-8 bg-white">
            <div className="mb-6">
                <div className="flex space-x-4 border-b">
                    {['Past Promoters', 'New Promoters', 'New Leads'].map((tab) => (
                        <button
                            key={tab}
                            className={`py-2 px-4 ${activeTab === tab ? 'bg-blue-100 text-blue-500 rounded-t-lg' : 'text-gray-500'}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="border rounded-lg p-6">
                <div className="flex justify-between mb-8">
                    <div className="space-x-4 flex">
                        <button className="flex justify-center items-center mt-1.5 p-3 bg-gradient-to-r from-blue-600/80 to-blue-200 text-white py-1.5 rounded-md hover:bg-blue-600 text-xl">
                            <FiPlus className="my-2" /> Create New Campaign
                        </button>
                        <button 
                            className="flex justify-center items-center mt-1.5 p-3 bg-gradient-to-r from-green-600/80 to-green-200 text-white py-1.5 rounded-md hover:bg-green-600 text-xl"
                            onClick={() => setShowRegisterForm(true)}
                        >
                            <FiPlus className="my-2" /> Register Business
                        </button>
                    </div>
                    <div className="flex space-x-3">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search campaigns..."
                                className="pl-10 pr-4 py-2 border rounded-md w-64"
                            />
                        </div>
                        <button className="border rounded-md px-4 py-2 flex items-center">
                            <FiFilter className="mr-2" /> Filter
                        </button>
                    </div>
                </div>

                <div className="mb-4 text-sm text-gray-600">
                    {campaigns.length} Campaigns • 1 Active
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {campaigns.map((campaign) => (
                        <div key={campaign.id} className="border rounded-lg overflow-hidden">
                            <div className="p-4 flex justify-between items-center border-b">
                                <div>
                                    <h3 className="text-lg font-medium">{campaign.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {campaign.startDate} - {campaign.endDate}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                    campaign.status === 'Active' 
                                        ? 'bg-blue-100 text-blue-500' 
                                        : 'bg-gray-100 text-gray-500'
                                }`}>
                                    {campaign.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-3 p-4">
                                <div>
                                    <p className="text-sm text-gray-500">Referrals</p>
                                    <p className="text-xl font-semibold">{campaign.referrals}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Conversion</p>
                                    <p className="text-xl font-semibold">{campaign.conversion}%</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">ROI</p>
                                    <p className="text-xl font-semibold">{campaign.roi}%</p>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 flex items-start space-x-3">
                                <TbBulb className="text-blue-500 mt-1 flex-shrink-0" />
                                <p className="text-sm text-gray-700">{campaign.suggestion}</p>
                            </div>

                            <div className="p-3 flex justify-end space-x-4">
                                <button>
                                    <FiTrash2 className="text-red-400 hover:text-red-600" />
                                </button>
                                <button>
                                    <FiEye className="text-gray-400 hover:text-gray-600" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}