// src/components/SignUp.jsx
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
  AnimatedBackground,
  LoadingSpinner,
  AnimatedInput,
  AnimatedButton
} from '../animations/sharedAnimations';

export default function SignUp({ onSignUpSuccess }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!fullName.trim()) {
      setError("Le nom complet est requis");
      return;
    }

    if (!email.trim()) {
      setError("L'email est requis");
      return;
    }

    if (!email.includes('@')) {
      setError("Veuillez entrer un email valide");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);

    // Simulation d'inscription (à remplacer par ton API)
    setTimeout(() => {
      // Sauvegarde simulée
      const newUser = {
        id: Date.now(),
        name: fullName,
        email: email,
        createdAt: new Date().toISOString()
      };
      
      // Sauvegarder dans localStorage (simulation)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Afficher le message de succès
      setSuccessMessage(`Compte créé avec succès ! Bienvenue ${fullName} !`);
      setShowSuccess(true);
      
      // Rediriger vers login après 2 secondes
      setTimeout(() => {
        setShowSuccess(false);
        // Rediriger vers la page de connexion
        navigate('/login');
      }, 2000);
      
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    // À implémenter avec ton backend
    setError('Connexion Google bientôt disponible');
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
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent mb-1 text-center md:text-left">
              Create Account ✨
            </h1>
            <p className="text-gray-500 text-xs mb-4 text-center md:text-left">Join us and start managing your projects.</p>

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
              <AnimatedInput
                type="text"
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                required
                disabled={isLoading}
              />

              <AnimatedInput
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                required
                disabled={isLoading}
              />

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">Password</label>
                <div className="relative">
                  <AnimatedInput
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    required
                    disabled={isLoading}
                    className="pr-7"
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

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">Confirm Password</label>
                <div className="relative">
                  <AnimatedInput
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    disabled={isLoading}
                    className="pr-7"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <AiOutlineEyeInvisible size={14} /> : <AiOutlineEye size={14} />}
                  </button>
                </div>
              </div>

              <AnimatedButton
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Sign Up
              </AnimatedButton>
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
                className="w-full border border-gray-200 rounded-lg py-1.5 flex items-center justify-center gap-2 hover:bg-gray-50 text-xs disabled:opacity-50 transition-all duration-300"
              >
                <FcGoogle size={14} /> Sign up with Google
              </button>
              
              <button
                disabled={isLoading}
                className="w-full border border-gray-200 rounded-lg py-1.5 flex items-center justify-center gap-2 hover:bg-gray-50 text-xs disabled:opacity-50 transition-all duration-300"
              >
                <FaFacebookF className="text-blue-600" size={12} /> Sign up with Facebook
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-3">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-blue-600 font-medium hover:underline transition"
                disabled={isLoading}
              >
                Sign In
              </button>
            </p>

            <p className="text-center text-[10px] text-gray-400 mt-3">© 2025 ALL RIGHTS RESERVED</p>
          </motion.div>
        </div>

        <motion.div {...fadeInRight} className="hidden md:block md:w-1/2 overflow-hidden">
          <div className="h-full overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=500&fit=crop"
              alt="coffee shop"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </motion.div>

      </motion.div>

      {/* Modal de succès personnalisé */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 15, duration: 0.5 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl text-center"
            >
              {/* Animation de succès */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 10 }}
                className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center"
              >
                <motion.svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                </motion.svg>
              </motion.div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Inscription réussie ! </h2>
              <p className="text-gray-600 mb-4">{successMessage}</p>
              <p className="text-sm text-gray-500">Redirection vers la page de connexion...</p>
              
              {/* Barre de progression */}
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loader pendant l'inscription */}
      {isLoading && !showSuccess && (
        <div className="fixed bottom-4 right-4 z-50 bg-white rounded-full shadow-lg p-3 flex items-center gap-3">
          <LoadingSpinner size="w-5 h-5" color="border-purple-500" />
          <span className="text-xs text-gray-600">Création du compte...</span>
        </div>
      )}
    </div>
  );
}