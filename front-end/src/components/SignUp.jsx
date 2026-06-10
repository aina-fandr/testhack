import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useGoogleLogin } from '@react-oauth/google';

export default function SignUp({ onSwitchToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 1. Inscription Classique (Nom, Email, Mot de passe)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation des mots de passe côté client
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue lors de l'inscription.");
      }

      alert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
      onSwitchToLogin(); // Bascule vers l'écran de Login automatique

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // Corrigé ici
    }
  };

  // 2. Inscription / Connexion rapide via Google
  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setError('');
      try {
const response = await fetch('http://localhost:5000/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Échec de la synchronisation Google.');
        }

        localStorage.setItem('user', JSON.stringify(data.user));
        alert(`Compte synchronisé avec Google ! Bienvenue ${data.user.name}`);
        
        window.location.reload(); 
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setError("L'authentification Google a échoué.");
      setIsLoading(false);
    }
  });

  return (
    <div className="min-h-screen bg-[#05070d] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl w-full flex flex-col md:flex-row">
        
        {/* Formulaire d'inscription */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-5">
          <div className="w-full max-w-xs">
            <h1 className="text-xl font-bold text-gray-800 mb-1">
              Create Account ✨
            </h1>

            <p className="text-gray-500 text-xs mb-4">
              Join us and start managing your projects.
            </p>

            {/* Affichage des erreurs renvoyées par le backend Express / Sequelize */}
            {error && (
              <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-xs">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-2 py-1.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm transition duration-200"
                  required
                  disabled={isLoading}
                />
              </div>

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

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full px-2 py-1.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-7 text-sm transition duration-200"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <AiOutlineEyeInvisible size={14} /> : <AiOutlineEye size={14} />}
                  </button>
                </div>
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
                    Création du compte...
                  </span>
                ) : (
                  'Sign Up'
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
                onClick={() => handleGoogleSignUp()}
                disabled={isLoading}
                className="w-full border border-gray-200 rounded-lg py-1.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200 text-xs disabled:opacity-50"
              >
                <FcGoogle size={14} />
                <span>Sign up with Google</span>
              </button>

              <button 
                type="button"
                disabled={isLoading}
                className="w-full border border-gray-200 rounded-lg py-1.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200 text-xs disabled:opacity-50"
              >
                <FaFacebookF className="text-blue-600" size={12} />
                <span>Sign up with Facebook</span>
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-3">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-blue-600 font-medium hover:underline transition"
                disabled={isLoading}
              >
                Sign In
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
              className="w-full h-full object-cover transition-all duration-400 hover:scale-110 hover:brightness-110"
            />
          </div>
        </div>

      </div>
    </div>
  );
}