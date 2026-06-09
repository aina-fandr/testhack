// src/pages/Carte.jsx - Version définitive sans warnings
import React from 'react';

export default function Carte() {
  const cities = [
    { name: 'Antananarivo', pop: '1 275 000', region: 'Analamanga' },
    { name: 'Toamasina', pop: '225 000', region: 'Atsinanana' },
    { name: 'Mahajanga', pop: '220 000', region: 'Boeny' },
    { name: 'Antsirabe', pop: '250 000', region: 'Vakinankaratra' },
    { name: 'Fianarantsoa', pop: '190 000', region: 'Haute Matsiatra' },
    { name: 'Toliara', pop: '170 000', region: 'Atsimo-Andrefana' },
    { name: 'Antsiranana', pop: '130 000', region: 'Diana' },
    { name: 'Nosy Be', pop: '80 000', region: 'Diana' },
  ];

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Carte de Madagascar 🗺️</h1>
        <p className="text-gray-500 text-sm">Carte interactive - Glissez et zoomez</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <iframe
          title="Carte Madagascar"
          width="100%"
          height="550"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://www.openstreetmap.org/export/embed.html?bbox=42.5,-25.5,52.5,-11.5&amp;layer=mapnik&amp;marker=-18.766947,46.869107"
          style={{ border: 0 }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cities.map((city, i) => (
          <div key={i} className="bg-white rounded-lg p-3 text-center border border-gray-100 shadow-sm">
            <p className="font-semibold text-gray-800 text-sm">{city.name}</p>
            <p className="text-gray-500 text-xs">👥 {city.pop}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <h3 className="font-bold mb-2">🌍 Informations générales</h3>
          <div className="space-y-1 text-sm">
            <p>📌 Capitale: Antananarivo</p>
            <p>🗣️ Langues: Malgache, Français</p>
            <p>👥 Population: ~28 millions</p>
            <p>📏 Superficie: 587 041 km²</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <h3 className="font-bold mb-2">🌟 À découvrir</h3>
          <div className="space-y-1 text-sm">
            <p>🏝️ Nosy Be - Île paradisiaque</p>
            <p>🌿 Tsingy de Bemaraha</p>
            <p>🐒 Lémuriens à Andasibe</p>
          </div>
        </div>
      </div>
    </div>
  );
}