// src/components/Layout/Layout.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import ChatFloating from './ChatFloating'; // Ajoutez cet import

export default function Layout({ children, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    switch(location.pathname) {
      case '/':
        return 'Accueil';
      case '/carte':
        return 'Carte de Madagascar';
      case '/ia':
        return 'Assistant IA';
      case '/profile':
        return 'Profil';
      case '/settings':
        return 'Paramètres';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-100 flex">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-800">{getPageTitle()}</h1>
          <div className="w-8"></div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>

      {/* Chat flottant - disponible sur toutes les pages */}
      <ChatFloating />
    </div>
  );
}