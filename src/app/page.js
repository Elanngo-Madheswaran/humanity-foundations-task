'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fakeLogin } from '../../lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Hi there! How can I help you today?', isBot: true }]);
  const [newMessage, setNewMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fakeLogin(email, password);
      localStorage.setItem('token', res.token);
      router.push('/dashboard/setup');
    } catch (err) {
      setError(err);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Add user message
    setMessages([...messages, { text: newMessage, isBot: false }]);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for your message! This is a demo response.", 
        isBot: true 
      }]);
    }, 1000);
    
    setNewMessage('');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      {/* Background Vectors */}
      <img src="/vector15.png" alt="vector15" className="absolute top-0 left-0 w-full h-auto" />
      <img src="/vector16.png" alt="vector16" className="absolute bottom-0 right-0 w-full h-auto" />

      {/* Title moved outside of login box */}
      <h2 className="relative z-10 text-center text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">
        Login to ReferralHub
      </h2>

      {/* Login Box - Reduced size to approximately 3/4 of screen */}
      <div className="relative z-10 bg-white p-3 sm:p-5 rounded-2xl shadow-xl max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        <button className="w-full border border-blue-500 text-blue-600 font-medium py-1.5 rounded-md hover:bg-blue-50 mb-3 text-xs sm:text-sm">
          Continue with Google/Microsoft
        </button>

        {/* Magic Link Section */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">Magic Link Login</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-2 sm:px-3 py-1.5 border rounded-md text-xs"
          />
          <button className="w-full mt-1.5 bg-gradient-to-r from-blue-600/80 to-blue-200  text-white py-1.5 rounded-md hover:bg-blue-600 text-xs">
            Send Magic Link
          </button>
        </div>

        <div className="flex items-center my-2 sm:my-3">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-xs">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Email + Password */}
        <form onSubmit={handleLogin} className="space-y-2 sm:space-y-3">
          <input
            type="email"
            className="w-full px-2 sm:px-3 py-1.5 border rounded-md text-xs"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-2 sm:px-3 py-1.5 border rounded-md text-xs"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="h-3 w-3" />
              Remember Me
            </label>
            <a href="#" className="text-blue-600 hover:underline text-xs">Forgot password?</a>
          </div>
          <button className="w-full bg-gradient-to-r from-blue-600/80 to-blue-200  text-white py-1.5 rounded-md hover:bg-blue-700 text-xs">
            Login
          </button>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
        </form>

        <div className="flex justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
          />
          <img
            src="https://www.facebook.com/favicon.ico"
            alt="Facebook"
            className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
          />
          <img
            src="https://www.apple.com/favicon.ico"
            alt="Apple"
            className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
          />
          <img
            src="https://www.linkedin.com/favicon.ico"
            alt="LinkedIn"
            className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
          />
        </div>

        <p className="text-sm text-center mt-4 text-gray-500">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">Register now</a>
        </p>
      </div>

      {/* Chatbot Button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-4 right-4 z-50  rounded-full p-3 shadow-lg hover:bg-blue-200 transition-all"
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
