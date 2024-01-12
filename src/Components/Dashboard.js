import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FaWhatsapp, FaEnvelope, FaRegCheckCircle, FaRegCalendarCheck, FaUserFriends, FaUserTie } from 'react-icons/fa';
import Landing from '../Images/Landing.png';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [overviewData, setOverviewData] = useState({
    registrations: 0,
    eventsListed: 0,
    coordinators: 0,
    judges: 0,
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  // Use the user object to fetch additional user information or perform other actions
  useEffect(() => {
    if (user) {
      // Example: Fetch additional user information from your database
      // Replace this with your own logic to fetch user data
      const fetchData = async () => {
        try {
          // Fetch user information from your database based on user.uid
          // For example, if you have a 'users' collection in Firestore:
          // const userDoc = await getDoc(doc(db, 'users', user.uid));
          // const userData = userDoc.data();
          // Update the state with fetched user data
          // setOverviewData(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchData();
    }
  }, [user]);

  return (
    <div className="dashboard-page">
      <div className="admin-greeting">
        <div className='Title'>
          <h2>Welcome, {user ? user.displayName || user.email : 'Guest'}!</h2>
        </div>
        <nav className="navbar">
          <div className="navbar-links">
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
              <div className='icons'>
                <FaWhatsapp className="icon" />
              </div>
            </a>
            <a href={`mailto:${user ? user.email : ''}`}>
              <div className='icons'>
                <FaEnvelope className="icon" /> 
              </div>
            </a>
            <div className='Landing-Img'>
              <img className='LImg' src={Landing} alt="Landing"/>
            </div>
          </div>
        </nav>
      </div>
      
      <div className="overview-cards">
        <div className="overview-card">
        <div className='DashDiv'>
          <div className='DashIcon'><FaRegCheckCircle/></div>
          <div className='Dash-Heading'>
          <h3>Registrations</h3>
          </div>
        </div>
        <div className='Dash-RegData'><p>{overviewData.registrations}</p></div> 
        </div>
        <div className="overview-card">
        <div className='DashDiv'>
          <div className='DashIcon'><FaRegCalendarCheck/></div>
          <div className='Dash-Heading'>
          <h3>Reports</h3>
          </div>
        </div>
        <div className='Dash-RegData'> <p>{overviewData.eventsListed}</p></div>
        </div>
        <div className="overview-card">
        <div className='DashDiv'>
          <div className='DashIcon'><FaUserFriends/></div>
          <div className='Dash-Heading'>
          <h3>Volunteers</h3>
          </div>
        </div>
        <div className='Dash-RegData'><p>{overviewData.coordinators}</p></div>
        </div>
        <div className="overview-card">
        <div className='DashDiv'>
          <div className='DashIcon'><FaUserTie/></div>
          <div className='Dash-Heading'>
          <h3>Officials</h3>
          </div>
        </div>
        <div className='Dash-RegData'><p>{overviewData.judges}</p></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
