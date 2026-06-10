// src/animations/sharedAnimations.js - Version complète
import { motion } from 'framer-motion';

// Animations d'entrée
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: 0.5 }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, delay: 0.2 }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, delay: 0.3 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4 }
};

// Animations de chargement
export const spinAnimation = {
  animate: { rotate: 360 },
  transition: { duration: 1, repeat: Infinity, ease: "linear" }
};

// Animations de hover
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 }
};

export const hoverGlow = {
  whileHover: { scale: 1.02, boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)" },
  whileTap: { scale: 0.98 }
};

// Animation de succès
export const successAnimation = {
  initial: { scale: 0, rotate: -180, opacity: 0 },
  animate: { scale: 1, rotate: 0, opacity: 1 },
  transition: { type: "spring", damping: 12, duration: 0.5 }
};

export const checkmarkAnimation = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { duration: 0.5, delay: 0.2 }
};

// Animation de pulse pour les cercles de fond
export const pulseBackground = {
  animate: { 
    scale: [1, 1.1, 1],
    opacity: [0.3, 0.5, 0.3]
  },
  transition: { duration: 3, repeat: Infinity }
};

// Loader spinner component
export const LoadingSpinner = ({ size = "w-5 h-5", color = "border-blue-500" }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    className={`${size} border-2 ${color} border-t-transparent rounded-full`}
  />
);

// AnimatedInput component
export const AnimatedInput = ({ label, className = "", ...props }) => (
  <motion.div 
    className="mb-2"
    whileHover={{ scale: 1.01 }}
    transition={{ duration: 0.2 }}
  >
    {label && <label className="block text-xs font-medium text-gray-600 mb-0.5">{label}</label>}
    <motion.input
      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)" }}
      transition={{ duration: 0.2 }}
      className={`w-full px-2 py-1.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm transition-all duration-300 ${className}`}
      {...props}
    />
  </motion.div>
);

// AnimatedButton component
export const AnimatedButton = ({ children, onClick, isLoading, disabled, variant = "primary", className = "", ...props }) => {
  const getVariantStyles = () => {
    if (variant === "primary") {
      return isLoading 
        ? 'bg-gray-400 cursor-not-allowed' 
        : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:shadow-lg';
    }
    if (variant === "google") {
      return 'border border-gray-200 hover:bg-gray-50 text-gray-700';
    }
    return '';
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full py-1.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${getVariantStyles()} ${className}`}
      whileHover={!isLoading && !disabled ? { scale: 1.02 } : {}}
      whileTap={!isLoading && !disabled ? { scale: 0.98 } : {}}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="w-4 h-4" color="border-white" />
          <span>Chargement...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};

// Composant de fond animé
export const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.div
      className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"
      animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 3, repeat: Infinity, delay: 2 }}
    />
  </div>
);

// SuccessOverlay component
export const SuccessOverlay = ({ show, onComplete }) => {
  if (!show) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
      onClick={onComplete}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 12, duration: 0.5 }}
        className="bg-white rounded-full p-8 shadow-2xl"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ duration: 0.8, repeat: 2 }}
          className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center"
        >
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};