'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { IoMdSend } from 'react-icons/io';
import axios from 'axios';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('client'); // Default role
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        { text: "Hi there! How can I help you today?", isBot: true }
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        
        try {
            // Call the register API
            const response = await axios.post('http://34.10.166.233/auth/register', {
                email,
                password,
                role: role === 'business' ? 'BusinessOwner' : 'Client', // Convert to API expected format
                full_name: fullName,
                phone: phone || undefined // Make phone optional
            });
            // If registration is successful, log the user in
            if (response.status === 201) {
                const loginResponse = await axios.post('http://34.10.166.233/auth/login', {
                    email,
                    password
                });
                
                // Store tokens in localStorage
                localStorage.setItem('accessToken', loginResponse.data.access);
                localStorage.setItem('refreshToken', loginResponse.data.refresh);
                
                // Redirect to dashboard
                router.push('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            console.error(err);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        
        // Add user message
        setChatMessages([...chatMessages, { text: newMessage, isBot: false }]);
        
        // Simulate bot response (in real app, this would be an API call)
        setTimeout(() => {
            setChatMessages(prev => [...prev, { 
                text: "Thanks for your message! Our support team will get back to you soon.", 
                isBot: true 
            }]);
        }, 1000);
        
        setNewMessage('');
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 overflow-hidden">
            {/* Background Vectors */}
            <img src="/vector15.png" alt="vector15" className="absolute top-0 left-0 w-full h-auto" />
            <img src="/vector16.png" alt="vector16" className="absolute bottom-0 right-0 w-full h-auto" />

            {/* Chatbot button */}
            <button 
                className="fixed bottom-10 right-5 z-50 w-12 h-12 rounded-full shadow-lg bg-white flex items-center justify-center hover:shadow-xl transition-all"
                onClick={toggleChat}
            >
                <img src="/arcticons_poe-ai-chat.png" alt="Chat" className="w-8 h-8" />
            </button>

            {/* Chat Interface */}
            {isChatOpen && (
                <div className="fixed bottom-5 right-5 w-80 sm:w-96 bg-white rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col">
                    <div className="bg-gradient-to-r from-blue-600/80 to-blue-200 text-white p-3 flex justify-between items-center">
                        <h3 className="font-medium">Support Chat</h3>
                        <button onClick={toggleChat} className="text-white hover:text-gray-200">✕</button>
                    </div>
                    <div className="p-4 h-80 overflow-y-auto flex flex-col gap-3">
                        {chatMessages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`p-2 rounded-lg max-w-[80%] ${msg.isBot 
                                    ? 'bg-gray-100 self-start' 
                                    : 'bg-blue-500 text-white self-end'}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={sendMessage} className="border-t p-3 flex gap-2">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 px-3 py-2 border rounded-md"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button 
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        >
                            <IoMdSend />
                        </button>
                    </form>
                </div>
            )}

            {/* Title outside the box */}
            <h2 className="relative z-10 text-2xl font-semibold mb-6">Register for ReferralHub</h2>

            {/* Register Box */}
            <div className="relative z-10 bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    
                    <input
                        type="tel"
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Phone (optional)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    
                    <select
                        className="w-full px-4 py-2 border rounded-md"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="client">Client</option>
                        <option value="business">Business</option>
                    </select>
                    
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button 
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2" 
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <IoEyeOff /> : <FaEye />}
                        </button>
                    </div>
                    
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button 
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2" 
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? <IoEyeOff /> : <FaEye />}
                        </button>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-blue-600/80 to-blue-200 text-white py-2 rounded-md hover:bg-blue-700">
                        Register
                    </button>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                </form>

                <div className="flex justify-center gap-4 mt-6">
                    <img src="https://www.google.com/favicon.ico" className="w-6 h-6 cursor-pointer" />
                    <img src="https://www.facebook.com/favicon.ico" className="w-6 h-6 cursor-pointer" />
                    <img src="https://www.apple.com/favicon.ico" className="w-6 h-6 cursor-pointer" />
                    <img src="https://www.linkedin.com/favicon.ico" className="w-6 h-6 cursor-pointer" />
                </div>

                <p className="text-sm text-center mt-4 text-gray-500">
                    Already have an account?{' '}
                    <a href="/" className="text-blue-600 hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
}
