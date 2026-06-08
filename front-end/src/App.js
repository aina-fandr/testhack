<<<<<<< HEAD
// App.js
import React, { useState } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? (
        <Login onSwitchToSignUp={() => setIsLogin(false)} />
      ) : (
        <SignUp onSwitchToLogin={() => setIsLogin(true)} />
      )}
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
>>>>>>> c0f3bdd00fb20766f3c01b480a0aa87e5eac0190
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> c0f3bdd00fb20766f3c01b480a0aa87e5eac0190
