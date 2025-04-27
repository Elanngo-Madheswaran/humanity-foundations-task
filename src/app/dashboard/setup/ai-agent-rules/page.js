'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';



export default function AIAgentRulesPage() {
    const router = useRouter();
    const [toneOfCommunication, setToneOfCommunication] = useState('');
    const [responseStyle, setResponseStyle] = useState('');
    const [autoOfferHelp, setAutoOfferHelp] = useState(false);
    const [userInitiatedOnly, setUserInitiatedOnly] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically save the AI agent rules to your backend
        // For now, we'll just navigate to the next step
        router.push('/dashboard/setup/first-campaign');
    };
     useEffect(() => {
            const businessData = localStorage.getItem('businessOwnerData');
            
            // If no business data is found, redirect to the business setup page
            if (!businessData) {
                router.push('/dashboard/setup/setup_business');
            }
        }, [router]);

    return (
        <div className="bg-white p-6 rounded-md shadow-sm">
            <h1 className="text-2xl font-medium mb-8">Set Up AI Agent Rules</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 mb-2">Tone of Communication</label>
                    <div className="relative">
                        <select 
                            className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white pr-10"
                            value={toneOfCommunication}
                            onChange={(e) => setToneOfCommunication(e.target.value)}
                        >
                            <option value="" disabled>Select</option>
                            <option value="friendly">Friendly</option>
                            <option value="professional">Professional</option>
                            <option value="casual">Casual</option>
                            <option value="formal">Formal</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Response Style</label>
                    <div className="relative">
                        <select 
                            className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white pr-10"
                            value={responseStyle}
                            onChange={(e) => setResponseStyle(e.target.value)}
                        >
                            <option value="" disabled>Select</option>
                            <option value="concise">Concise</option>
                            <option value="detailed">Detailed</option>
                            <option value="technical">Technical</option>
                            <option value="simplified">Simplified</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-gray-700">Auto-offer help</h3>
                        <p className="text-sm text-gray-500">AI pops up suggestions automatically when user lands on a page.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={autoOfferHelp}
                            onChange={() => setAutoOfferHelp(!autoOfferHelp)} 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-gray-700">User-initiated only</h3>
                        <p className="text-sm text-gray-500">AI only responds when clicked or messaged.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={userInitiatedOnly}
                            onChange={() => setUserInitiatedOnly(!userInitiatedOnly)} 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                </div>

                <div className="pt-4">
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
}