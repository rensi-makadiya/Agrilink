import React, { useState } from 'react';
import { API } from '../api';
import './ClientLogin.css';

function ClientLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      const res = await API.post('/login', {
        email,
        password,
        role: 'client'
      });

      if (res.data.status === 'ok') {
        localStorage.setItem('clientEmail', email);
        alert('✅ Login successful');
        window.location.href = '/client';
      } else {
        alert(res.data.error || '❌ Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Server error');
    }
  };

  return (
    <div className="client-login-container">
      <div className="client-login-card">
        <h2>Client Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={loginUser}>Login</button>
        <p className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default ClientLogin;
