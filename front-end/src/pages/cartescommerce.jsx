// src/pages/Carte.jsx
import React from 'react';

export default function Carte() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Carte 💳</h1>
        <p className="text-gray-500 mt-1">Gérez vos cartes et paiements</p>
      </div>
      
      {/* Aperçu de la carte */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carte bancaire */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-xs opacity-80">CARTE BANCAIRE</p>
              <p className="text-sm font-semibold mt-1">VISA</p>
            </div>
            <div className="w-10 h-8 bg-yellow-400 rounded opacity-80"></div>
          </div>
          
          <div className="mb-6">
            <p className="text-lg tracking-wider">**** **** **** 4532</p>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs opacity-80">TITULAIRE</p>
              <p className="text-sm font-semibold">JEAN DUPONT</p>
            </div>
            <div>
              <p className="text-xs opacity-80">EXPIRATION</p>
              <p className="text-sm font-semibold">12/28</p>
            </div>
          </div>
        </div>
        
        {/* Solde */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-gray-500 text-sm mb-2">Solde disponible</h3>
          <p className="text-3xl font-bold text-gray-800">1 234,56 €</p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Transactions ce mois</span>
              <span className="font-semibold text-gray-800">+ 12%</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dernières transactions */}
      <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Dernières transactions</h2>
        <div className="space-y-3">
          {[
            { name: 'Netflix', amount: '-15,99€', date: 'Aujourd\'hui', color: 'red' },
            { name: 'Spotify', amount: '-9,99€', date: 'Hier', color: 'green' },
            { name: 'Amazon', amount: '-45,90€', date: 'Il y a 3 jours', color: 'blue' },
          ].map((transaction, i) => (
            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 bg-${transaction.color}-100 rounded-full flex items-center justify-center`}>
                  <span className="text-sm">💰</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{transaction.name}</p>
                  <p className="text-xs text-gray-400">{transaction.date}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-800">{transaction.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}