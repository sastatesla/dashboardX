import React, { useState, useEffect } from 'react';
import './ParticipantsPage.css';
import { onSnapshot, collection, doc, addDoc, writeBatch, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { db, auth } from './firebase';
import AddParticipantPopup from './AddParticipantsPopup'; 

const ParticipantsPage = () => {
  const [participantsData, setParticipantsData] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [isParticipantPopupOpen, setIsParticipantPopupOpen] = useState(false);

  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [event, setEvent] = useState('');
  const [contactNumber, setContactNumber] = useState('');


  const tables = [
    { name: 'SIH 2023', collectionName: 'sih2023' },
    { name: 'Hackathon', collectionName: 'hackathon' },
    // Add more tables as needed
  ];

  const [selectedTable, setSelectedTable] = useState(tables[0]);

  useEffect(() => {
    const participantsdb = getFirestore();

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(participantsdb, selectedTable.collectionName));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setParticipantsData(data);
      } catch (error) {
        console.error('Error fetching initial data from Firestore:', error);
      }
    };
    

    fetchData();
    const unsubscribe = onSnapshot(collection(participantsdb, selectedTable.collectionName), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setParticipantsData(data);
    });

    return () => {
      unsubscribe();
    };
  }, [selectedTable.collectionName]);

  const handleAddParticipant = async (name, college, event, contactNumber) => {
    const newParticipant = {
      name: name,
      college: college,
      event: event,
      contactNumber: contactNumber,
    };

    try {
      await addDoc(collection(db, selectedTable.collectionName), newParticipant);
    } catch (error) {
      console.error('Error adding participant: ', error);
    }
  };

  const handleCheckboxChange = (event, participantId) => {
    const selectedIds = [...selectedParticipants];

    if (event.target.checked) {
      selectedIds.push(participantId);
    } else {
      const index = selectedIds.indexOf(participantId);
      if (index !== -1) {
        selectedIds.splice(index, 1);
      }
    }

    setSelectedParticipants(selectedIds);
  };

  const handleDeleteSelected = async () => {
    const batch = writeBatch(db);

    selectedParticipants.forEach((participantId) => {
      const participantRef = doc(db, selectedTable.collectionName, participantId);
      batch.delete(participantRef);
    });

    try {
      await batch.commit();
      setSelectedParticipants([]);
    } catch (error) {
      console.error('Error deleting participants: ', error);
    }
  };

  const totalParticipants = participantsData.length;

  return (
    <div className="participants-page">
      <div className="page-header">
        <h2>Participants</h2>
        <div className="total-participants-card">
          <h3>Total Participants</h3>
          <p>{totalParticipants}</p>
        </div>
      </div>
      <div className="Parti-Table">
        <div className="P-Header">
          <div className="PHeading">
            <h3>Participants List</h3>
          </div>
          <select
            className="Ptable-selector"
            value={selectedTable.name}
            onChange={(e) => {
              const selectedTableName = e.target.value;
              const selectedTableData = tables.find((table) => table.name === selectedTableName);
              setSelectedTable(selectedTableData);
            }}
          >
            {tables.map((table) => (
              <option key={table.name} value={table.name}>
                {table.name}
              </option>
            ))}
          </select>
          <div className="page-content-buttons">
            <div className="participant-button">
              <button className="PbButton" onClick={handleDeleteSelected} disabled={selectedParticipants.length === 0}>
                Delete
              </button>
            </div>
            <div className="CButton">
              <button className="PbButton" onClick={() => setIsParticipantPopupOpen(true)}>
                Add
              </button>
            </div>
          </div>
          {/* Render the popup component */}
          <AddParticipantPopup
            isOpen={isParticipantPopupOpen}
            onClose={() => setIsParticipantPopupOpen(false)}
            onAdd={handleAddParticipant}
          />
        </div>
        <div className="participants-table">
          {/* Table header */}
          <div className="participants-table-header">
            <div className="participants-table-cell">Select</div>
            <div className="participants-table-cell">Name</div>
            <div className="participants-table-cell">College</div>
            <div className="participants-table-cell">Event</div>
            <div className="participants-table-cell">Contact Number</div>
          </div>
          {/* Table body */}
          {participantsData.map((participant) => (
            <div key={participant.id} className="participants-table-row">
              <div className="participants-table-cell">
                <input
                  type="checkbox"
                  checked={selectedParticipants.includes(participant.id)}
                  onChange={(event) => handleCheckboxChange(event, participant.id)}
                />
              </div>
              <div className="participants-table-cell">{participant.name}</div>
              <div className="participants-table-cell">{participant.college}</div>
              <div className="participants-table-cell">{participant.event}</div>
              <div className="participants-table-cell">{participant.contactNumber}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParticipantsPage;
