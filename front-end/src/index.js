<<<<<<< HEAD
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // IMPORTANT : ce fichier doit contenir les directives Tailwind
import App from './App';
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
>>>>>>> c0f3bdd00fb20766f3c01b480a0aa87e5eac0190

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
<<<<<<< HEAD
);
=======
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
>>>>>>> c0f3bdd00fb20766f3c01b480a0aa87e5eac0190
