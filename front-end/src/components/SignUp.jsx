// src/components/SignUp.jsx
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function SignUp({ onSwitchToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Sign up:', { fullName, email, password });
  };

  return (
    <div className="min-h-screen bg-[#05070d] flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
        
        {/* Formulaire d'inscription */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-10">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account ✨
            </h1>

            <p className="text-gray-500 text-sm mb-6 md:mb-8">
              Join us today and start managing your projects like a pro.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 pr-12"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
              >
                Sign Up
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-gray-400 text-sm">Or</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="space-y-3">
              <button className="w-full border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200">
                <FcGoogle size={20} />
                <span className="text-gray-700">Sign up with Google</span>
              </button>

              <button className="w-full border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200">
                <FaFacebookF className="text-blue-600" size={18} />
                <span className="text-gray-700">Sign up with Facebook</span>
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              {/* ✅ Changement clé : <a> remplacé par <button> */}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-blue-600 font-medium hover:underline focus:outline-none"
              >
                Sign In
              </button>
            </p>

            <p className="text-center text-xs text-gray-400 mt-8 md:mt-10">
              © 2025 ALL RIGHTS RESERVED
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block md:w-1/2 p-4">
          <div className="h-full rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=1000&fit=crop"
              alt="Decorative flowers"
              className="w-full h-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
        </div>

      </div>
    </div>
  );
}