// src/components/Login.jsx
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login({ onSwitchToSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in:', { email, password });
  };

  return (
    <div className="min-h-screen bg-[#05070d] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl w-full flex flex-col md:flex-row">
        
        {/* Formulaire */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-5">
          <div className="w-full max-w-xs">
            <h1 className="text-xl font-bold text-gray-800 mb-1">
              Welcome Back 🎉
            </h1>

            <p className="text-gray-500 text-xs mb-4">
              Sign in to start managing your projects.
            </p>

            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full px-2 py-1.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm transition duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full px-2 py-1.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-7 text-sm transition duration-200"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? <AiOutlineEyeInvisible size={14} /> : <AiOutlineEye size={14} />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  className="text-xs text-blue-500 hover:text-blue-600 hover:underline transition"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-1.5 rounded-lg font-medium hover:bg-gray-900 transition duration-200 transform hover:scale-[1.02] mt-1"
              >
                Sign In
              </button>
            </form>

            <div className="flex items-center gap-2 my-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-gray-400 text-xs">Or</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="space-y-1.5">
              <button className="w-full border border-gray-200 rounded-lg py-1.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200 text-xs">
                <FcGoogle size={14} />
                <span>Sign in with Google</span>
              </button>

              <button className="w-full border border-gray-200 rounded-lg py-1.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200 text-xs">
                <FaFacebookF className="text-blue-600" size={12} />
                <span>Sign in with Facebook</span>
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-3">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToSignUp}
                className="text-blue-600 font-medium hover:underline transition"
              >
                Sign Up
              </button>
            </p>

            <p className="text-center text-[10px] text-gray-400 mt-3">
              © 2025 ALL RIGHTS RESERVED
            </p>
          </div>
        </div>

        {/* Image avec animation au survol */}
        <div className="hidden md:block md:w-1/2 overflow-hidden">
          <div className="h-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=500&fit=crop"
              alt="flowers"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out hover:scale-110 hover:rotate-1"
            />
          </div>
        </div>

      </div>
    </div>
  );
}