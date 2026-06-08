// src/App.js
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
    </div>
  );
}

export default App;