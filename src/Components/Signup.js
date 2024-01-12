import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, addDoc,doc, setDoc } from 'firebase/firestore';
import { db } from './firebase'; // Assuming you have the Firestore instance in a file called 'firebase.js'
import Logo from '../Images/Fiddle.png';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const history = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const auth = getAuth();
  
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Add user data to Firestore with UID as document ID
      const userDocRef = await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: email,
      });
  
      setSuccessMessage('Registration successful! You can now log in.');
      setName('');
      setEmail('');
      setPassword('');
  
      console.log('Successfully registered:', user);
  
      // Redirect or perform other actions
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };
  
  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Add user data to Firestore with UID as document ID
      const userDocRef = await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        // Add other user data as needed
      });
  
      console.log('Successfully signed in with Google:', user);
      // Redirect or perform other actions
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };
  

  return (
    <div className="signup-page">
      <div className="left-section">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="info">
          <h2>Sign up to access the dashboard</h2>
          <p>Manage your events in a single platform</p>
        </div>
      </div>
      <div className="right-section">
        <form onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Sign Up</button>
          <button type="button" onClick={handleGoogleSignIn}>Sign In with Google</button>
        </form>
        <p>Already have an account? <Link to="/Login">Log In</Link></p>
      </div>
    </div>
  );
};

export default Signup;
