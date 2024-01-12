import React, { useState } from 'react';
import './AddCoordinatorPopup.css';

const AddCoordinatorPopup = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [eventAssigned, setEventAssigned] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleAddNewRow = () => {
    onAdd(name, team, eventAssigned, contactNumber);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="Cpopup">
      <div className="Cpopup-content">
        <div className='HCPopup'>
        <div className="Cpopup-header">
          <h2>Reports</h2>
        </div>
        {/* <hr className="Cpopup-divider" /> */}
        </div>
        <div className="Cpopup-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="Cpopup-field">
          <label htmlFor="team">Team:</label>
          <input
            type="text"
            id="team"
            placeholder="Team"
            value={team}
            onChange={(event) => setTeam(event.target.value)}
          />
        </div>
        <div className="Cpopup-field">
          <label htmlFor="eventAssigned">Task Assigned:</label>
          <input
            type="text"
            id="eventAssigned"
            placeholder="Event Assigned"
            value={eventAssigned}
            onChange={(event) => setEventAssigned(event.target.value)}
          />
        </div>
        <div className="Cpopup-field">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="text"
            id="contactNumber"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(event) => setContactNumber(event.target.value)}
          />
        </div>
        <div className="CPButtons">
          <button className="CPBtn" onClick={handleAddNewRow}>
            Add
          </button>
          <button className="CPBtn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCoordinatorPopup;
