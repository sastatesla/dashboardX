import React, { useState, useEffect } from 'react';
import { FaBars, FaCalendar, FaUserFriends, FaGavel, FaPoll, FaUsers, FaPager } from 'react-icons/fa';
import SteveJobs from '../Images/SteveJobs.png'
import Fiddle from '../Images/Fiddle.png'
import './AdminMenu.css';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile'; 
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';


const AdminMenu = ({ navigateTo }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null); // Clear user state upon logout
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

 

  return (
    <div className={`admin-menu ${sidebarOpen ? 'open' : ''}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <div className='LogoF'>
      <img className='Logo' src={Fiddle} alt="Fiddle" />

      </div>
      <div className="profile-card">
        {/* Show UserProfile component */}
        {user ? (
          <UserProfile user={user} handleLogout={handleLogout} />
        ) : (
          <div>
            <div className="profile-image">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User" />
              ) : (
                <img src={SteveJobs} alt="SteveJobs" />
              )}
            </div>
            <h3>{user?.displayName || 'Guest'}</h3>
            <p>{user?.email || ''}</p>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="nav-links">
      <Link to="/Dashboard" className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
      onClick={() => handleTabClick('dashboard')}
      >
      
          <FaPager />

          <span>Dashboard</span>
        </Link>
        <Link to="/EventsPage" className={`nav-link ${activeTab === 'events' ? 'active' : ''}`}
         onClick={() => handleTabClick('events')}
        >
          <FaCalendar />
          <span>Reports</span>
        </Link>

        <Link to="/ParticipantsPage"
          className={`nav-link ${activeTab === 'participants' ? 'active' : ''}`}
          onClick={() => handleTabClick('participants')}
        >
          <FaUsers />
          <span>Participants</span>
        </Link>

        <Link to="/CoordinatorsPage" className={`nav-link ${activeTab === 'coordinators' ? 'active' : ''}`}
         onClick={() => handleTabClick('coordinators')}
        >
          <FaUserFriends />
          <span>Coordinators</span>
        </Link>
        <Link to="/JudgesPage"
          className={`nav-link ${activeTab === 'judges' ? 'active' : ''}`}
          onClick={() => handleTabClick('judges')}
        >
          <FaGavel />
          <span>Officials</span>
        </Link>
        <Link to="/ResultsPage"
          className={`nav-link ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => handleTabClick('results')}
        >
          <FaPoll />
          <span>Results</span>
        </Link>
        
      </div>
    </div>
  );
};

export default AdminMenu;
