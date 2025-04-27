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

     useEffect(() => {
            const businessData = localStorage.getItem('businessOwnerData');
            
            // If no business data is found, redirect to the business setup page
            if (!businessData) {
                router.push('/dashboard/setup/setup_business');
            }
        }, [router]);

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
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-medium text-gray-800">Create New Campaign</h1>
            <p className="text-gray-600 mb-6">Create a new referral campaign in just few steps.</p>
            
            <div className="border-t border-gray-200 my-4"></div>

            {/* Campaign Name */}
            <div className="mb-6 bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Campaign Name</h2>
                <input
                    type="text"
                    placeholder="e.g., Summer Referral Special"
                    value={campaignData.campaignName}
                    onChange={(e) => setCampaignData({...campaignData, campaignName: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Promoter Settings */}
            <div className="mb-6 bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-medium mb-6">Promoter Settings</h2>
                
                <div className="flex flex-wrap md:flex-nowrap gap-4 mb-6">
                    <div className="w-full md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Reward Type<span className="text-red-500">*</span></label>
                        <div className="bg-blue-50 p-4 rounded text-center text-blue-600 font-medium">
                            <div>Points</div>
                            <div className="text-xs text-gray-500">($1 is equivalent to 10 points)</div>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Reward Value<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            placeholder="e.g., 200 points"
                            value={campaignData.promoterSettings.rewardValue}
                            onChange={(e) => handleInputChange('promoterSettings', 'rewardValue', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Promoter Message<span className="text-red-500">*</span></label>
                    <textarea
                        placeholder="e.g., 'Hey! Share this with your friends and get $20 for each successful signup!'"
                        value={campaignData.promoterSettings.promoterMessage}
                        onChange={(e) => handleInputChange('promoterSettings', 'promoterMessage', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md h-24"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Follow-Up Strategy<span className="text-red-500">*</span></label>
                    <div className="flex gap-4">
                        <div className="flex items-center p-3 border border-gray-300 rounded-md">
                            <input 
                                type="radio" 
                                id="promoterSMS" 
                                name="promoterFollowUp" 
                                checked={campaignData.promoterSettings.followUpStrategy === 'SMS'} 
                                onChange={() => handleInputChange('promoterSettings', 'followUpStrategy', 'SMS')}
                                className="mr-2"
                            />
                            <label htmlFor="promoterSMS">SMS</label>
                        </div>
                        <div className="flex items-center p-3 border border-gray-300 rounded-md">
                            <input 
                                type="radio" 
                                id="promoterWait" 
                                name="promoterFollowUp"
                                checked={campaignData.promoterSettings.followUpStrategy === 'Wait'} 
                                onChange={() => handleInputChange('promoterSettings', 'followUpStrategy', 'Wait')}
                                className="mr-2"
                            />
                            <label htmlFor="promoterWait">Wait {campaignData.promoterSettings.followUpWait} days</label>
                        </div>
                    </div>
                </div>
                {campaignData.promoterSettings.actions.length > 0 && (
                    <div className="mt-4 mb-6">
                        {campaignData.promoterSettings.actions.map((action, index) => (
                            <div key={action.id} className="bg-white p-4 rounded-lg shadow-sm mb-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                checked={action.type === 'Email'}
                                                onChange={() => {
                                                    const updatedActions = [...campaignData.promoterSettings.actions];
                                                    updatedActions[index].type = 'Email';
                                                    handleInputChange('promoterSettings', 'actions', updatedActions);
                                                }}
                                                className="mr-2"
                                            />
                                            <span>Email</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                checked={action.type === 'SMS'}
                                                onChange={() => {
                                                    const updatedActions = [...campaignData.promoterSettings.actions];
                                                    updatedActions[index].type = 'SMS';
                                                    handleInputChange('promoterSettings', 'actions', updatedActions);
                                                }}
                                                className="mr-2"
                                            />
                                            <span>SMS</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                checked={action.type === 'Wait Duration'}
                                                onChange={() => {
                                                    const updatedActions = [...campaignData.promoterSettings.actions];
                                                    updatedActions[index].type = 'Wait Duration';
                                                    handleInputChange('promoterSettings', 'actions', updatedActions);
                                                }}
                                                className="mr-2"
                                            />
                                            <span>Wait Duration</span>
                                        </label>
                                    </div>
                                </div>

                                {action.type === 'SMS' && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <div className="relative">
                                            <select
                                                className="w-full p-3 border border-gray-300 rounded-md appearance-none"
                                                value={action.phoneNumber}
                                                onChange={(e) => {
                                                    const updatedActions = [...campaignData.promoterSettings.actions];
                                                    updatedActions[index].phoneNumber = e.target.value;
                                                    handleInputChange('promoterSettings', 'actions', updatedActions);
                                                }}
                                            >
                                                <option value="">Select</option>
                                                <option value="phone1">Phone 1</option>
                                                <option value="phone2">Phone 2</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Follow-Up Message</label>
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded-md h-24"
                                        placeholder="Enter message..."
                                        value={action.message}
                                        onChange={(e) => {
                                            const updatedActions = [...campaignData.promoterSettings.actions];
                                            updatedActions[index].message = e.target.value;
                                            handleInputChange('promoterSettings', 'actions', updatedActions);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="border-t border-gray-200 pt-6">
                    <button 
                        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
                        onClick={() => handleAddAction('promoterSettings')}
                    >
                        + Add Action
                    </button>
                </div>
            </div>

            {/* Leads Settings */}
            <div className="mb-6 bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-medium mb-6">Leads Settings</h2>
                
                <div className="flex flex-wrap md:flex-nowrap gap-4 mb-6">
                    <div className="w-full md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Reward Type<span className="text-red-500">*</span></label>
                        <div className="bg-blue-50 p-4 rounded text-center text-blue-600 font-medium">
                            Discount
                        </div>
                    </div>
                    
                    <div className="w-full md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Reward Value<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            placeholder="e.g., 20%"
                            value={campaignData.leadsSettings.rewardValue}
                            onChange={(e) => handleInputChange('leadsSettings', 'rewardValue', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Referred Message<span className="text-red-500">*</span></label>
                    <textarea
                        placeholder="e.g., 'You've been invited! Sign up now and get 15% off your first order'"
                        value={campaignData.leadsSettings.referredMessage}
                        onChange={(e) => handleInputChange('leadsSettings', 'referredMessage', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md h-24"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Form Fields <span className="text-gray-500 text-xs">• Required</span></label>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="fullName"
                                checked={campaignData.leadsSettings.formFields.fullName}
                                onChange={(e) => handleNestedInputChange('leadsSettings', 'formFields', 'fullName', e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="fullName">Full Name</label>
                        </div>
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="emailAddress"
                                checked={campaignData.leadsSettings.formFields.emailAddress}
                                onChange={(e) => handleNestedInputChange('leadsSettings', 'formFields', 'emailAddress', e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="emailAddress">Email Address</label>
                        </div>
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="phoneNumber"
                                checked={campaignData.leadsSettings.formFields.phoneNumber}
                                onChange={(e) => handleNestedInputChange('leadsSettings', 'formFields', 'phoneNumber', e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="phoneNumber">Phone Number</label>
                        </div>
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="agreement"
                                checked={campaignData.leadsSettings.formFields.agreement}
                                onChange={(e) => handleNestedInputChange('leadsSettings', 'formFields', 'agreement', e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="agreement">Agree</label>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Follow-Up Strategy<span className="text-red-500">*</span></label>
                    <div className="flex gap-4">
                        <div className="flex items-center p-3 border border-gray-300 rounded-md">
                            <input 
                                type="radio" 
                                id="leadsSMS" 
                                name="leadsFollowUp" 
                                checked={campaignData.leadsSettings.followUpStrategy === 'SMS'} 
                                onChange={() => handleInputChange('leadsSettings', 'followUpStrategy', 'SMS')}
                                className="mr-2"
                            />
                            <label htmlFor="leadsSMS">SMS</label>
                        </div>
                        <div className="flex items-center p-3 border border-gray-300 rounded-md">
                            <input 
                                type="radio" 
                                id="leadsWait" 
                                name="leadsFollowUp"
                                checked={campaignData.leadsSettings.followUpStrategy === 'Wait'} 
                                onChange={() => handleInputChange('leadsSettings', 'followUpStrategy', 'Wait')}
                                className="mr-2"
                            />
                            <label htmlFor="leadsWait">Wait {campaignData.leadsSettings.followUpWait} days</label>
                        </div>
                    </div>
                </div>

                {campaignData.leadsSettings.actions.length > 0 && (
                    <div className="mt-4 mb-6">
                        {campaignData.leadsSettings.actions.map((action, index) => (
                            <div key={action.id} className="bg-white p-4 rounded-lg shadow-sm mb-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                checked={action.type === 'Email'}
                                                onChange={() => {
                                                    const updatedActions = [...campaignData.leadsSettings.actions];
                                                    updatedActions[index].type = 'Email';
                                                    handleInputChange('leadsSettings', 'actions', updatedActions);
                                                }}
                                                className="mr-2"
                                            />
                                            <span>Email</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                checked={action.type === 'SMS'}
                                                onChange={() => {
                                                    const updatedActions = [...campaignData.leadsSettings.actions];
                                                    updatedActions[index].type = 'SMS';
                                                    handleInputChange('leadsSettings', 'actions', updatedActions);
                                                }}
                                                className="mr-2"
                                            />
                                            <span>SMS</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                checked={action.type === 'Wait Duration'}
                                                onChange={() => {
                                                    const updatedActions = [...campaignData.leadsSettings.actions];
                                                    updatedActions[index].type = 'Wait Duration';
                                                    handleInputChange('leadsSettings', 'actions', updatedActions);
                                                }}
                                                className="mr-2"
                                            />
                                            <span>Wait Duration</span>
                                        </label>
                                    </div>
                                </div>

                                {action.type === 'SMS' && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <div className="relative">
                                            <select
                                                className="w-full p-3 border border-gray-300 rounded-md appearance-none"
                                                value={action.phoneNumber}
                                                onChange={(e) => {
                                                    const updatedActions = [...campaignData.leadsSettings.actions];
                                                    updatedActions[index].phoneNumber = e.target.value;
                                                    handleInputChange('leadsSettings', 'actions', updatedActions);
                                                }}
                                            >
                                                <option value="">Select</option>
                                                <option value="phone1">Phone 1</option>
                                                <option value="phone2">Phone 2</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Follow-Up Message</label>
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded-md h-24"
                                        placeholder="Enter message..."
                                        value={action.message}
                                        onChange={(e) => {
                                            const updatedActions = [...campaignData.leadsSettings.actions];
                                            updatedActions[index].message = e.target.value;
                                            handleInputChange('leadsSettings', 'actions', updatedActions);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="border-t border-gray-200 pt-6">
                    <button 
                        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
                        onClick={() => handleAddAction('leadsSettings')}
                    >
                        + Add Action
                    </button>
                </div>
            </div>

            {/* Launch Button */}
            <button 
                className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium mb-6"
                onClick={handleLaunch}
            >
                Launch Campaign
            </button>
        </div>
    );
}