// src/components/Layout/Layout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Accueil from '../../pages/Accueil';
import Carte from '../../pages/Carte';

export default function Layout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('accueil');

  const renderPage = () => {
    switch(currentPage) {
      case 'accueil':
        return <Accueil />;
      case 'carte':
        return <Carte />;
      case 'profile':
        return <div className="bg-white rounded-xl shadow-sm p-6">Page Profil en construction...</div>;
      case 'settings':
        return <div className="bg-white rounded-xl shadow-sm p-6">Page Paramètres en construction...</div>;
      default:
        return <Accueil />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        onLogout={onLogout}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
      
      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header mobile */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            {currentPage === 'accueil' ? 'Tableau de bord' : 
             currentPage === 'carte' ? 'Mes cartes' :
             currentPage === 'profile' ? 'Profil' : 'Paramètres'}
          </h1>
          <div className="w-8"></div>
        </header>
        
        {/* Contenu principal */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}