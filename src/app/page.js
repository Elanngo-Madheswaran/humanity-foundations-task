'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fakeLogin } from '../../lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fakeLogin(email, password);
      localStorage.setItem('token', res.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err);
    }
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
    </div>
  );
}
