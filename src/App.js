import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminMenu from './Components/AdminMenu';
import EventsPage from './Components/EventsPage';
import CoordinatorsPage from './Components/CoordinatorsPage';
import Dashboard from './Components/Dashboard';
import JudgesPage from './Components/JudgesPage';
import ResultsPage from './Components/ResultsPage';
import ParticipantsPage from './Components/ParticipantsPage';
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import UserProfile from './Components/UserProfile';
import Logout from './Components/Logout';
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth';
import EventsListingForm from './Components/EventListingForm';
import EventDetailsPage from './Components/EventDetailsPage';

const App = ({auth}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
  
    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              user ? (
                <>
                  <AdminMenu />

                  <div className="main-container">
                    <main className="main-content">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/EventsPage" element={<EventsPage />} />
                        <Route path="/event-details/:eventId" element={<EventDetailsPage />} />

                        <Route path="/EventsListingForm" element={<EventsListingForm />} />

                        <Route path="/CoordinatorsPage" element={<CoordinatorsPage />} />
                        <Route path="/JudgesPage" element={<JudgesPage />} />
                        <Route path="/ResultsPage" element={<ResultsPage />} />
                        <Route path="/ParticipantsPage" element={<ParticipantsPage />} />
                        <Route path="/UserProfile" element={<UserProfile />} />
                        <Route path="/Logout" element={<Logout />} />
                      </Routes>
                    </main>
                  </div>
                </>
              ) : (
                <Signup />
              )
            }
          />
          <Route exact path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
