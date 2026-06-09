// src/components/Layout/Sidebar.jsx - Version sans React Router
import React from 'react';
import { 
  AiOutlineHome, 
  AiOutlineCreditCard, 
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout 
} from "react-icons/ai";

export default function Sidebar({ sidebarOpen, setSidebarOpen, onLogout, onNavigate, currentPage }) {
  const menuItems = [
    { id: 'accueil', name: 'Accueil', icon: <AiOutlineHome size={20} /> },
    { id: 'carte', name: 'Carte', icon: <AiOutlineCreditCard size={20} /> },
    { id: 'profile', name: 'Profil', icon: <AiOutlineUser size={20} /> },
    { id: 'settings', name: 'Paramètres', icon: <AiOutlineSetting size={20} /> },
  ];

  const handleLogout = () => {
    onLogout();
  };

  return (
    <>
      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-30 bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 min-h-screen transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:translate-x-0`}
      >
        {/* Logo / Titre */}
        <div className="p-5 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-lg font-semibold">Mon App</span>
          </div>
        </div>
        
        {/* Menu de navigation */}
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 px-5 py-3 mx-2 w-full rounded-lg transition duration-200 ${
                currentPage === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </button>
          ))}
        </nav>
        
        {/* Section déconnexion en bas */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-5 py-3 w-full rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200"
          >
            <AiOutlineLogout size={20} />
            <span className="text-sm">Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
}