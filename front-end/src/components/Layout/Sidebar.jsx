// src/components/Layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    AiOutlineHome,
    AiOutlineCreditCard,
    AiOutlineUser,
    AiOutlineSetting,
    AiOutlineLogout,
    AiOutlineRobot
} from "react-icons/ai";

export default function Sidebar({ sidebarOpen, setSidebarOpen, onLogout }) {
    const menuItems = [
        { path: '/', name: 'Accueil', icon: <AiOutlineHome size={20} /> },
        { path: '/carte', name: 'Carte', icon: <AiOutlineCreditCard size={20} /> },
        { path: '/ia', name: 'Assistant IA', icon: <AiOutlineRobot size={20} /> },
        { path: '/profile', name: 'Profil', icon: <AiOutlineUser size={20} /> },
        { path: '/settings', name: 'Paramètres', icon: <AiOutlineSetting size={20} /> },
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

            {/* Sidebar - fixe et qui ne défile pas */}
            <aside
                className={`fixed md:relative z-30 bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 h-full flex flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0`}
            >
                {/* Logo / Titre - section fixe en haut */}
                <div className="flex-shrink-0 p-5 border-b border-gray-700">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">M</span>
                        </div>
                        <span className="text-lg font-semibold">Mon App</span>
                    </div>
                </div>

                {/* Menu de navigation - défilable si nécessaire */}
                <nav className="flex-1 overflow-y-auto py-4">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-5 py-3 mx-2 rounded-lg transition duration-200 ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            {item.icon}
                            <span className="text-sm">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Section déconnexion - fixe en bas */}
                <div className="flex-shrink-0 p-4 border-t border-gray-700">
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