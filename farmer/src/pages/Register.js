import React, { useState } from 'react';
import { API } from '../api';
import './Login.css'; // ✅ Reuse same CSS for consistency
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const res = await API.post('/register', {
        name,
        email,
        password,
        role: 'farmer'
      });

      if (res.data.status === 'ok') {
        alert('Registered successfully! Please log in.');
        navigate('/');
      } else {
        alert(res.data.error);
      }
    } catch {
      alert('Server error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="left-panel">
          <img
            src="https://i.pinimg.com/736x/ca/59/84/ca59846685c58c8bb05d1d899a017276.jpg"
            alt="AgriLink Logo"
          />
          <h2>Empowering Agriculture</h2>
          <p>
            Join AgriLink today to access smart tools and support that modern farmers need to succeed.
          </p>
        </div>

        <div className="right-panel">
          <h2>Farmer Register</h2>

          <input
            className="login-input"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-button" onClick={registerUser}>
            Register
          </button>

          <p className="register-link">
            Already have an account?{' '}
            <span onClick={() => navigate('/')}>Login here</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
