import React, { useState } from 'react';
import { API } from '../api';
import './Login.css';
import { useNavigate } from 'react-router-dom'; // ✅ Required for navigation

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ Hook for navigation

  const loginUser = async () => {
    try {
      const res = await API.post('/login', { email, password, role: 'farmer' });
      if (res.data.status === 'ok') {
        localStorage.setItem("farmerEmail", email);
       
        window.location.href = '/farmer';
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
            src="https://i.pinimg.com/736x/6b/b7/d0/6bb7d0e235f64186e6153b98bcf62855.jpg"
            alt="AgriLink Logo"
          />
          <h2>We are here to help farmers</h2>
          <p>
            AgriLink empowers farmers with the tools and support they need
            to thrive in modern agriculture.
          </p>
        </div>

        <div className="right-panel">
          <h2>Farmer Login</h2>

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

          <button className="login-button" onClick={loginUser}>
            Sign In
          </button>

        

          <p className="register-link">
            Don’t have an account?{' '}
            <span onClick={() => navigate('/register')}>Register here</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
