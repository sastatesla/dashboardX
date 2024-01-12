import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { auth } from './firebase'; // Firebase configuration
import Logo from "../Images/Fiddle.png";
import "./Login.css"; // CSS for the login form

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  };

  return (
    <div className="signup-page">
      <div className="left-section">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="info">
          <h2>Log in to access the dashboard</h2>
          <p>Manage your events in a single platform</p>
        </div>
      </div>
      <div className="right-section">
        <form onSubmit={handleLogin}>
          <h2>Log In</h2>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className='LoginBtn' type="submit">Log In</button>
        </form>
        <p>Don't have an account? <Link to="/">Sign up</Link></p> {/* Link to the signup form */}
      </div>
    </div>
  );
}

export default Login;
