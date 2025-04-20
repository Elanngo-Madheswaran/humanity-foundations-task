'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FirstCampaign() {
    const router = useRouter();
    const [campaignData, setCampaignData] = useState({
        campaignName: '',
        promoterSettings: {
            rewardType: 'Points',
            rewardValue: '',
            promoterMessage: '',
            followUpStrategy: 'SMS',
            followUpWait: 5,
            actions: []
        },
        leadsSettings: {
            rewardType: 'Discount',
            rewardValue: '',
            referredMessage: '',
            formFields: {
                fullName: true,
                emailAddress: true,
                phoneNumber: false,
                agreement: true
            },
            followUpStrategy: 'SMS',
            followUpWait: 5,
            actions: []
        }
    });

    const handleInputChange = (section, field, value) => {
        setCampaignData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleNestedInputChange = (section, nestedSection, field, value) => {
        setCampaignData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [nestedSection]: {
                    ...prev[section][nestedSection],
                    [field]: value
                }
            }
        }));
    };

    const handleAddAction = (section) => {
        const newAction = {
            type: 'Email',
            phoneNumber: '',
            message: '',
            id: Date.now()
        };

        setCampaignData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                actions: [...prev[section].actions, newAction]
            }
        }));
    };

    const handleLaunch = () => {
        console.log('Campaign data submitted:', campaignData);
        router.push('/dashboard');
    };

    return (
        <div className="px-4 py-6 bg-white">
            <h1 className="text-xl font-medium text-gray-800">Create New Campaign</h1>
            <p className="text-sm text-gray-600 mb-4">Create a new referral campaign in just few steps.</p>

            {/* Campaign Name */}
            <div className="mb-6 bg-white rounded-lg p-4 shadow">
                <h2 className="text-base font-medium mb-2">Campaign Name</h2>
                <input
                    type="text"
                    placeholder="e.g., Summer Referral Special"
                    value={campaignData.campaignName}
                    onChange={(e) => setCampaignData({...campaignData, campaignName: e.target.value})}
                    className="w-full p-3 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Promoter Settings */}
            <div className="mb-6 bg-white rounded-lg p-4 shadow">
                <h2 className="text-base font-medium mb-3">Promoter Settings</h2>
                
                <div className="flex space-x-4 mb-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reward Type*</label>
                        <div className="bg-blue-50 p-2 rounded text-sm">
                            <div>Points</div>
                            <div className="text-xs text-gray-500">($1 is equivalent to 10 points)</div>
                        </div>
                    </div>
                    
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reward Value*</label>
                        <input
                            type="text"
                            placeholder="e.g., 200 points"
                            value={campaignData.promoterSettings.rewardValue}
                            onChange={(e) => handleInputChange('promoterSettings', 'rewardValue', e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Promoter Message*</label>
                    <textarea
                        placeholder="e.g., 'Hey! Share this with your friends and get $20 for each successful signup!'"
                        value={campaignData.promoterSettings.promoterMessage}
                        onChange={(e) => handleInputChange('promoterSettings', 'promoterMessage', e.target.value)}
                        className="w-full p-2 border rounded text-sm h-20"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Follow-Up Strategy*</label>
                    <div className="flex space-x-4">
                        <div className="flex items-center p-2 bg-white border rounded">
                            <input 
                                type="radio" 
                                id="promoterSMS" 
                                name="promoterFollowUp" 
                                checked={campaignData.promoterSettings.followUpStrategy === 'SMS'} 
                                onChange={() => handleInputChange('promoterSettings', 'followUpStrategy', 'SMS')}
                                className="mr-2"
                            />
                            <label htmlFor="promoterSMS" className="text-sm">SMS</label>
                        </div>
                        <div className="flex items-center p-2 bg-white border rounded">
                            <input 
                                type="radio" 
                                id="promoterWait" 
                                name="promoterFollowUp"
                                checked={campaignData.promoterSettings.followUpStrategy === 'Wait'} 
                                onChange={() => handleInputChange('promoterSettings', 'followUpStrategy', 'Wait')}
                                className="mr-2"
                            />
                            <label htmlFor="promoterWait" className="text-sm">Wait {campaignData.promoterSettings.followUpWait} days</label>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-3">
                    <div className="mb-3">
                        <label className="block text-sm text-gray-700 mb-1">Action Type</label>
                        <div className="flex space-x-4 mb-3">
                            <div className="flex items-center">
                                <input type="radio" id="promoterEmail" name="promoterActionType" defaultChecked className="mr-1" />
                                <label htmlFor="promoterEmail" className="text-sm">Email</label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" id="promoterSMSAction" name="promoterActionType" className="mr-1" />
                                <label htmlFor="promoterSMSAction" className="text-sm">SMS</label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" id="promoterWaitAction" name="promoterActionType" className="mr-1" />
                                <label htmlFor="promoterWaitAction" className="text-sm">Wait Duration</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
                        <select className="w-full p-2 border rounded text-sm">
                            <option value="">Select</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm text-gray-700 mb-1">Follow-Up Message</label>
                        <textarea
                            placeholder="Enter message..."
                            className="w-full p-2 border rounded text-sm h-16"
                        />
                    </div>

                    <button 
                        className="w-full py-2 bg-blue-500 text-white rounded-md flex items-center justify-center text-sm"
                        onClick={() => handleAddAction('promoterSettings')}
                    >
                        + Add Action
                    </button>
                </div>
            </div>

            {/* Leads Settings */}
            <div className="mb-6 bg-white rounded-lg p-4 shadow">
                <h2 className="text-base font-medium mb-3">Leads Settings</h2>
                
                <div className="flex space-x-4 mb-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reward Type*</label>
                        <div className="bg-blue-50 p-2 rounded text-sm">
                            <div>Discount</div>
                        </div>
                    </div>
                    
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reward Value*</label>
                        <input
                            type="text"
                            placeholder="e.g., 20%"
                            value={campaignData.leadsSettings.rewardValue}
                            onChange={(e) => handleInputChange('leadsSettings', 'rewardValue', e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Referred Message*</label>
                    <textarea
                        placeholder="e.g., 'You've been invited! Sign up now and get 15% off your first order.'"
                        value={campaignData.leadsSettings.referredMessage}
                        onChange={(e) => handleInputChange('leadsSettings', 'referredMessage', e.target.value)}
                        className="w-full p-2 border rounded text-sm h-20"
                    />
                </div>

                <div className="mb-4">
                    <div className="flex items-center mb-1">
                        <label className="block text-sm font-medium text-gray-700">Form Fields*</label>
                        <div className="ml-1 text-gray-400">ⓘ</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="fullName" 
                                checked={campaignData.leadsSettings.formFields.fullName} 
                                onChange={(e) => handleNestedInputChange('leadsSettings', 'formFields', 'fullName', e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="fullName" className="text-sm">Full Name</label>
                        </div>
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="emailAddress" 
                                checked={campaignData.leadsSettings.formFields.emailAddress}
                                onChange={(e) => handleNestedInputChange('leadsSettings', 'formFields', 'emailAddress', e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="emailAddress" className="text-sm">Email Address</label>
                        </div>
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="phoneNumber" 
                                checked={campaignData.leadsSettings.formFields.phoneNumber}
                                onChange={(e) => handleNestedInputChange('leadsSettings', 'formFields', 'phoneNumber', e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="phoneNumber" className="text-sm">Phone Number</label>
                        </div>
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="agreement" 
                                checked={campaignData.leadsSettings.formFields.agreement}
                                onChange={(e) => handleNestedInputChange('leadsSettings', 'formFields', 'agreement', e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="agreement" className="text-sm">Agreement</label>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Follow-Up Strategy*</label>
                    <div className="flex space-x-4">
                        <div className="flex items-center p-2 bg-white border rounded">
                            <input 
                                type="radio" 
                                id="leadsSMS" 
                                name="leadsFollowUp" 
                                checked={campaignData.leadsSettings.followUpStrategy === 'SMS'} 
                                onChange={() => handleInputChange('leadsSettings', 'followUpStrategy', 'SMS')}
                                className="mr-2"
                            />
                            <label htmlFor="leadsSMS" className="text-sm">SMS</label>
                        </div>
                        <div className="flex items-center p-2 bg-white border rounded">
                            <input 
                                type="radio" 
                                id="leadsWait" 
                                name="leadsFollowUp"
                                checked={campaignData.leadsSettings.followUpStrategy === 'Wait'} 
                                onChange={() => handleInputChange('leadsSettings', 'followUpStrategy', 'Wait')}
                                className="mr-2"
                            />
                            <label htmlFor="leadsWait" className="text-sm">Wait {campaignData.leadsSettings.followUpWait} days</label>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-3">
                    <div className="mb-3">
                        <label className="block text-sm text-gray-700 mb-1">Action Type</label>
                        <div className="flex space-x-4 mb-3">
                            <div className="flex items-center">
                                <input type="radio" id="leadsEmail" name="leadsActionType" defaultChecked className="mr-1" />
                                <label htmlFor="leadsEmail" className="text-sm">Email</label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" id="leadsSMSAction" name="leadsActionType" className="mr-1" />
                                <label htmlFor="leadsSMSAction" className="text-sm">SMS</label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" id="leadsWaitAction" name="leadsActionType" className="mr-1" />
                                <label htmlFor="leadsWaitAction" className="text-sm">Wait Duration</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
                        <select className="w-full p-2 border rounded text-sm">
                            <option value="">Select</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm text-gray-700 mb-1">Follow-Up Message</label>
                        <textarea
                            placeholder="Enter message..."
                            className="w-full p-2 border rounded text-sm h-16"
                        />
                    </div>

                    <button 
                        className="w-full py-2 bg-blue-500 text-white rounded-md flex items-center justify-center text-sm"
                        onClick={() => handleAddAction('leadsSettings')}
                    >
                        + Add Action
                    </button>
                </div>
            </div>

            <button 
                className="w-full py-3 bg-blue-500 text-white rounded-md text-center font-medium"
                onClick={handleLaunch}
            >
                Launch
            </button>
        </div>
    );
}