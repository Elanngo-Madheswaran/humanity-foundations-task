'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { IoMdSend } from 'react-icons/io';

export default function AIAgent() {
    const [messages, setMessages] = useState([
        {
            role: 'ai',
            content: 'Welcome Back, Karim! How can I help you today?'
        }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Reset chat function
    const handleReset = () => {
        setMessages([
            {
                role: 'ai',
                content: 'Welcome Back, Karim! How can I help you today?'
            }
        ]);
    };

    // Simulate AI responses based on user messages
    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: input }]);
        const userMessage = input;
        setInput('');

        // Simulate AI thinking
        setTimeout(() => {
            let response;

            if (userMessage.toLowerCase().includes('referral campaign')) {
                response = "Absolutely! I'll help you create a high-converting referral campaign step by step. Let's start by defining your main objective. What's the primary goal of this campaign?";
            } else if (userMessage.toLowerCase().includes('goal')) {
                response = "That's a great goal! Referral campaigns work best when there's a strong incentive. What kind of reward would you like to offer referrers?";
            } else if (userMessage.toLowerCase().includes('discount')) {
                response = "Smart choice! Discounts are a great way to encourage both referrals and repeat purchases. How much discount would you like to offer per successful referral?";
            } else if (userMessage.toLowerCase().includes('15%')) {
                response = "15% sounds like a strong incentive! Now, let's define when a referral is considered valid. When should the referrer receive their reward?";
            } else if (userMessage.toLowerCase().includes('signs up')) {
                response = "That's a great way to ensure that your campaign drives real revenue! Now, how long do you want this referral campaign to run?";
            } else if (userMessage.toLowerCase().includes('month')) {
                response = "Got it! Here's a quick summary of your campaign:\n\n• Goal: Increase sales\n• Reward: 15% discount on the next purchase\n• Condition: Reward is given when the referred person makes a purchase\n• Duration: 3 months";
            } else if (userMessage.toLowerCase().includes('start campaign')) {
                response = "Great! Let's get started with setting up your campaign. What would you like to name your new referral campaign?";
            } else if (userMessage.toLowerCase().includes('view analytics')) {
                response = "Here's a summary of your current campaigns' performance:\n\n• Total Referrals: 42\n• Conversion Rate: 18.5%\n• Revenue Generated: $2,450\n\nWhich campaign would you like to analyze in more detail?";
            } else if (userMessage.toLowerCase().includes('ask for help')) {
                response = "I'm here to help! What specific aspect of your marketing campaigns do you need assistance with? I can help with referral programs, email campaigns, social media, or general marketing strategy.";
            } else {
                response = "I understand. Could you provide more details about what you're looking for in your referral campaign?";
            }

            setMessages(prev => [...prev, { role: 'ai', content: response }]);
        }, 1000);
    };

    // Handle quick link clicks
    const handleQuickLink = (message) => {
        setInput(message);
        setTimeout(() => {
            handleSendMessage();
        }, 100);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <div className="flex items-center justify-between p-4 bg-white border-b">
                <div className="flex items-center">
                    <h1 className="text-xl font-semibold text-gray-800">AI Agent</h1>
                </div>
                <button 
                    onClick={handleReset} 
                    className="px-3 py-1 text-sm text-gray-600 border rounded hover:bg-gray-100"
                >
                    Reset
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message, index) => (
                    <div key={index} className="mb-4">
                        {message.role === 'ai' ? (
                            <div className="flex items-start">
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-500 mr-2">
                                    <span>AI</span>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg max-w-[80%]">
                                    <p className="text-sm">{message.content}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start justify-end">
                                <div className="bg-white border p-3 rounded-lg max-w-[80%]">
                                    <p className="text-sm">{message.content}</p>
                                </div>
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 ml-2">
                                    <span>U</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-white">
                <form onSubmit={handleSendMessage} className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message here..."
                        className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
                    >
                        <IoMdSend />
                    </button>
                </form>
                
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500">Quick Links</p>
                    <div className="flex mt-2">
                        <button 
                            onClick={() => handleQuickLink("Start Campaign")} 
                            className="mr-2 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
                        >
                            Start Campaign
                        </button>
                        <button 
                            onClick={() => handleQuickLink("View Analytics")} 
                            className="mr-2 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
                        >
                            View Analytics
                        </button>
                        <button 
                            onClick={() => handleQuickLink("Ask for Help")} 
                            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
                        >
                            Ask for Help
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}