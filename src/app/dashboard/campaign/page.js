'use client';
import React, { useState } from 'react';
import { FiPlus, FiSearch, FiFilter, FiEye, FiTrash2 } from 'react-icons/fi';
import { TbBulb } from 'react-icons/tb';


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
                    <button className=" flex justify-center items-center mt-1.5 p-3 bg-gradient-to-r from-blue-600/80 to-blue-200  text-white py-1.5 rounded-md hover:bg-blue-600 text-xl">
                        <FiPlus className="my-2" /> Create New Campaign
                    </button>
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