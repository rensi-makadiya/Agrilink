import React, { useState } from 'react';
import { API } from '../api';
import './ClientRegister.css'; // ⬅️ Import this CSS

function ClientRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async () => {
    try {
      const res = await API.post('/register', {
        name,
        email,
        password,
        role: 'client'
      });

      if (res.data.status === 'ok') {
        alert('Registered! Please login.');
        window.location.href = '/';
      } else {
        alert(res.data.error);
      }
    } catch {
      alert('Server error');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Client Register</h2>
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={registerUser}>Register</button>
        <p className="login-link">Already have an account? <a href="/">Login</a></p>
      </div>
    </div>
  );
}

export default ClientRegister;
