'use client';

import { useEffect , useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../public/components/Navbar';



export default function DashboardLayout({ children }) {
    const router = useRouter();

    useEffect(() => {
        // Check for authentication
        const token = localStorage.getItem('token');
        if (!token) router.push('/');
    }, [router]);

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", isBot: true }
    ]);
    const [newMessage, setNewMessage] = useState('');

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, { text: newMessage, isBot: false }]);
            setNewMessage('');
            
            // Simulate bot response
            setTimeout(() => {
                setMessages(prev => [...prev, { 
                    text: "Thanks for your message. Our team will get back to you soon.",
                    isBot: true 
                }]);
            }, 1000);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-56 bg-white border-r border-gray-200">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-medium text-blue-600">Platform Setup</h2>
                </div>
                <Navbar />
            </div>

            {/* Main content */}
            <div className="flex-1">
                {children}
            </div>

            {/* Chatbot Button */}
            <button 
                onClick={toggleChat}
                className="fixed bottom-4 right-4 z-50 bg-blue-100 rounded-full p-3 shadow-lg hover:bg-blue-300 transition-all"
            >
                <img 
                    src="/arcticons_poe-ai-chat.png" 
                    alt="Chat" 
                    className="w-6 h-6"
                />
            </button>

            {/* Chat Interface */}
            {isChatOpen && (
                <div className="fixed bottom-20 right-4 z-50 bg-white rounded-xl shadow-xl w-72 sm:w-80 max-h-96 flex flex-col">
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-blue-600/80 to-blue-200 text-white p-3 rounded-t-xl flex justify-between items-center">
                        <h3 className="font-medium text-sm">Chat Assistant</h3>
                        <button onClick={toggleChat} className="text-white hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-64">
                        {messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`${msg.isBot ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white ml-auto'} rounded-lg p-2 max-w-[80%] text-xs`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    
                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} className="border-t p-2 flex">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 border rounded-l-md px-3 py-2 text-xs focus:outline-none"
                        />
                        <button 
                            type="submit" 
                            className="bg-blue-600 text-white px-3 rounded-r-md hover:bg-blue-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}