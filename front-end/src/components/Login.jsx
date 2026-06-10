import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useGoogleLogin } from '@react-oauth/google';
import { login, loginWithGoogle } from '../services/login_api';

export default function Login({ onSwitchToSignUp, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 1. Soumission du Formulaire Classique (Email + Mot de passe)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation rapide côté client avant envoi
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      setIsLoading(false);
      return;
    }

    try {
      const data = await login({ email, password });

      localStorage.setItem('user', JSON.stringify(data.user));
      onLoginSuccess();

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Connexion avec Google via l'API @react-oauth/google
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setError('');
      try {
          const data = await loginWithGoogle(tokenResponse.access_token);

        localStorage.setItem('user', JSON.stringify(data.user));
        onLoginSuccess();
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setError('La connexion avec Google a échoué.');
      setIsLoading(false);
    }
  });

  // Connexion avec Facebook (Laissé en stand-by pour le moment)
  const handleFacebookLogin = () => {
    setError("La connexion via Facebook n'est pas encore configurée.");
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

            {/* Message d'erreur dynamique */}
            {error && (
              <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-xs">{error}</p>
              </div>
            )}

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
                  disabled={isLoading}
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
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    disabled={isLoading}
                  >
                    {showPassword ? <AiOutlineEyeInvisible size={14} /> : <AiOutlineEye size={14} />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  className="text-xs text-blue-500 hover:text-blue-600 hover:underline transition"
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-1.5 rounded-lg font-medium transition duration-200 mt-1 ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gray-800 hover:bg-gray-900 transform hover:scale-[1.02]'
                } text-white`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion...
                  </span>
                ) : (
                  'Sign In'
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
                type="button"
                onClick={() => handleGoogleLogin()}
                disabled={isLoading}
                className="w-full border border-gray-200 rounded-lg py-1.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200 text-xs disabled:opacity-50"
              >
                <FcGoogle size={14} />
                <span>Sign in with Google</span>
              </button>

              <button
                type="button"
                onClick={handleFacebookLogin}
                disabled={isLoading}
                className="w-full border border-gray-200 rounded-lg py-1.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200 text-xs disabled:opacity-50"
              >
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
                disabled={isLoading}
              >
                Sign Up
              </button>
            </p>

            <p className="text-center text-[10px] text-gray-400 mt-3">
              © 2026 ALL RIGHTS RESERVED
            </p>
          </div>
        </div>

        {/* Image de droite */}
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