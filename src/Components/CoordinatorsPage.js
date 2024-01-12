import React, { useState, useEffect } from 'react';
import './CoordinatorsPage.css';
import { onSnapshot, collection, doc, writeBatch, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import AddCoordinatorPopup from './AddCoordinatorPopup';
import { db } from './firebase'; 
import { FaPlus } from 'react-icons/fa';

const CoordinatorsPage = () => {
  const [coordinatorsData, setCoordinatorsData] = useState([]);
  const [selectedCoordinators, setSelectedCoordinators] = useState([]);
  const [isCoordiPopupOpen, setIsCoordiPopupOpen] = useState(false);

  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [eventAssigned, setEventAssigned] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;
          const coordinatorsCollection = collection(db, 'users', userId, 'coordinators');
          const unsubscribe = onSnapshot(coordinatorsCollection, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setCoordinatorsData(data);
          });

          return () => unsubscribe();
        }
      } catch (error) {
        console.error('Error fetching coordinators data: ', error);
      }
    };

    fetchData();
  }, [auth]);

  const handleCheckboxChange = (event, coordinatorId) => {
    const selectedIds = [...selectedCoordinators];

    if (event.target.checked) {
      selectedIds.push(coordinatorId);
    } else {
      const index = selectedIds.indexOf(coordinatorId);
      if (index !== -1) {
        selectedIds.splice(index, 1);
      }
    }

    setSelectedCoordinators(selectedIds);
  };

  const handleDeleteSelected = async () => {
    const batch = writeBatch(db);

    selectedCoordinators.forEach((coordinatorId) => {
      const coordinatorRef = doc(db, 'users', auth.currentUser.uid, 'coordinators', coordinatorId);
      batch.delete(coordinatorRef);
    });

    try {
      await batch.commit();
      setSelectedCoordinators([]);
    } catch (error) {
      console.error('Error deleting coordinators: ', error);
    }
  };

  const handleAddCoordinator = async (name, team, eventAssigned, contactNumber) => {
    try {
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const coordinatorsCollection = collection(db, 'users', userId, 'coordinators');
        const newCoordinator = {
          name: name,
          team: team,
          eventAssigned: eventAssigned,
          contactNumber: contactNumber,
        };
        const coordinatorRef = await addDoc(coordinatorsCollection, newCoordinator);
        console.log('Document added with ID: ', coordinatorRef.id);
      }
    } catch (error) {
      console.error('Error adding coordinator: ', error);
    }
  };

  const totalCoordinators = coordinatorsData.length;

  return (
    <div className="coordinators-page">
      <div className="page-header">
        <h2>Coordinators</h2>
        <div className="total-coordinators-card">
          <h3>Total Coordinators</h3>
          <p>{totalCoordinators}</p>
        </div>
      </div>

      <table className="Coordi-table">
        <div className="Coordi-Header">
          <div className="CHeading">
            <h3>Coordinators List</h3>
          </div>
          <div className="Coordi-button">
            <div className="CButton">
              <button className="CbButton" onClick={handleDeleteSelected} disabled={selectedCoordinators.length === 0}>
                Delete
              </button>
            </div>
            <div className="CButton">
              <button className="CbButton" onClick={() => setIsCoordiPopupOpen(true)}>
                Add
              </button>
            </div>
          </div>
          {/* Render the popup component */}
          <AddCoordinatorPopup isOpen={isCoordiPopupOpen} onClose={() => setIsCoordiPopupOpen(false)} onAdd={handleAddCoordinator} />
        </div>
        <div className="coordinators-table">
          <div className="table-header">
            <div className="table-cell select">Select</div>
            <div className="table-cell">Name</div>
            <div className="table-cell">Team</div>
            <div className="table-cell">Task Assigned</div>
            <div className="table-cell">Contact Number</div>
          </div>
          <div className="table-body">
            {coordinatorsData.map((coordinator) => (
              <div key={coordinator.id} className="table-row">
                <div className="table-cell select">
                  <input
                    type="checkbox"
                    checked={selectedCoordinators.includes(coordinator.id)}
                    onChange={(event) => handleCheckboxChange(event, coordinator.id)}
                  />
                </div>
                <div className="table-cell">{coordinator.name}</div>
                <div className="table-cell">{coordinator.team}</div>
                <div className="table-cell">{coordinator.eventAssigned}</div>
                <div className="table-cell">{coordinator.contactNumber}</div>
              </div>
            ))}
          </div>
        </div>
      </table>
    </div>
  );
};

export default CoordinatorsPage;
