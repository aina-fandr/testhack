// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion, AnimatePresence } from 'framer-motion';
import {
  fadeInLeft,
  fadeInRight,
  scaleIn,
  hoverScale,
  AnimatedBackground,
  SuccessOverlay,
  LoadingSpinner
} from '../animations/sharedAnimations';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (!email || !password) {
        setError('Veuillez remplir tous les champs');
        setIsLoading(false);
        return;
      }

      if (password.length < 8) {
        setError('Le mot de passe doit contenir au moins 8 caractères');
        setIsLoading(false);
        return;
      }

      if (!email.includes('@')) {
        setError('Veuillez entrer un email valide');
        setIsLoading(false);
        return;
      }

      setShowSuccess(true);
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify({ email, name: 'Utilisateur' }));
        onLoginSuccess();
        setIsLoading(false);
      }, 1000);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify({ email: 'user@gmail.com', name: 'Google User' }));
        onLoginSuccess();
        setIsLoading(false);
      }, 1000);
    }, 1000);
  };

  const handleFacebookLogin = () => {
    setError('Connexion Facebook bientôt disponible');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05070d] to-[#1a1a2e] flex items-center justify-center p-4 overflow-hidden relative">
      
      <AnimatedBackground />

      <motion.div
        {...scaleIn}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full flex flex-col md:flex-row relative z-10"
      >
        
        <div className="w-full md:w-1/2 flex items-center justify-center p-5">
          <motion.div {...fadeInLeft} className="w-full max-w-xs">
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-1 text-center md:text-left">
              Welcome Back 🎉
            </h1>
            <p className="text-gray-500 text-xs mb-4 text-center md:text-left">Sign in to start managing your projects.</p>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-red-600 text-xs">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full px-2 py-1.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm transition-all duration-300"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full px-2 py-1.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-7 text-sm transition-all duration-300"
                    required
                    minLength={8}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    disabled={isLoading}
                  >
                    {showPassword ? <AiOutlineEyeInvisible size={14} /> : <AiOutlineEye size={14} />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  className="text-xs text-blue-500 hover:text-blue-600"
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-1.5 rounded-lg font-medium transition-all duration-300 mt-1 flex items-center justify-center gap-2 ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:shadow-lg'
                } text-white`}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="w-4 h-4" color="border-white" />
                    <span>Connexion...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            <div className="flex items-center gap-2 my-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-gray-400 text-xs">Or</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="space-y-1.5">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full border border-gray-200 rounded-lg py-1.5 flex items-center justify-center gap-2 hover:bg-gray-50 text-xs disabled:opacity-50"
              >
                <FcGoogle size={14} /> Sign in with Google
              </button>
              
              <button
                onClick={handleFacebookLogin}
                disabled={isLoading}
                className="w-full border border-gray-200 rounded-lg py-1.5 flex items-center justify-center gap-2 hover:bg-gray-50 text-xs disabled:opacity-50"
              >
                <FaFacebookF className="text-blue-600" size={12} /> Sign in with Facebook
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-3">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-blue-600 font-medium hover:underline transition"
                disabled={isLoading}
              >
                Sign Up
              </button>
            </p>

            <p className="text-center text-[10px] text-gray-400 mt-3">© 2025 ALL RIGHTS RESERVED</p>
          </motion.div>
        </div>

        <motion.div {...fadeInRight} className="hidden md:block md:w-1/2 overflow-hidden">
          <div className="h-full overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=500&fit=crop"
              alt="flowers"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </motion.div>

      </motion.div>

      <SuccessOverlay show={showSuccess} onComplete={() => setShowSuccess(false)} />

      {isLoading && !showSuccess && (
        <div className="fixed bottom-4 right-4 z-50 bg-white rounded-full shadow-lg p-3 flex items-center gap-3">
          <LoadingSpinner size="w-5 h-5" color="border-blue-500" />
          <span className="text-xs text-gray-600">Connexion en cours...</span>
        </div>
      )}
    </div>
  );
}