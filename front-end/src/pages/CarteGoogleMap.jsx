// src/pages/CarteGoogleMap.jsx - Version corrigée
import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function CarteGoogleMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const cities = [
    { name: 'Antananarivo', lng: 47.5079, lat: -18.8792, population: '1 275 000', region: 'Analamanga' },
    { name: 'Toamasina', lng: 49.3958, lat: -18.1445, population: '225 000', region: 'Atsinanana' },
    { name: 'Mahajanga', lng: 46.3167, lat: -15.6922, population: '220 000', region: 'Boeny' },
    { name: 'Antsirabe', lng: 47.0333, lat: -19.8500, population: '250 000', region: 'Vakinankaratra' },
    { name: 'Fianarantsoa', lng: 47.0833, lat: -21.4333, population: '190 000', region: 'Haute Matsiatra' },
    { name: 'Toliara', lng: 43.6667, lat: -23.3500, population: '170 000', region: 'Atsimo-Andrefana' },
    { name: 'Antsiranana', lng: 49.2833, lat: -12.2833, population: '130 000', region: 'Diana' },
    { name: 'Nosy Be', lng: 48.2747, lat: -13.3122, population: '80 000', region: 'Diana' },
  ];

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [46.869107, -18.766947],
      zoom: 5.5,
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      cities.forEach((city) => {
        const markerEl = document.createElement('div');
        markerEl.className = 'custom-marker';
        markerEl.innerHTML = `
          <div class="relative">
            <div class="w-4 h-4 bg-red-500 rounded-full shadow-lg cursor-pointer"></div>
          </div>
        `;

        new maplibregl.Marker(markerEl)
          .setLngLat([city.lng, city.lat])
          .addTo(map.current);

        const popup = new maplibregl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2 min-w-[150px]">
              <h3 class="font-bold text-gray-800 text-sm">${city.name}</h3>
              <p class="text-xs text-gray-600 mt-1">👥 Population: ${city.population}</p>
              <p class="text-xs text-gray-600">📍 Région: ${city.region}</p>
            </div>
          `);

        markerEl.addEventListener('click', () => {
          popup.setLngLat([city.lng, city.lat]).addTo(map.current);
        });
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [cities]); // Ajout de cities dans les dépendances

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Carte de Madagascar 🗺️</h1>
        <p className="text-gray-500 text-sm">Cliquez sur les marqueurs pour voir les détails</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div ref={mapContainer} style={{ height: '550px', width: '100%' }} />
      </div>
    </div>
  );
}