import React, { useState } from 'react';
import './AddJudgePopup.css';

const AddJudgePopup = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [eventAssigned, setEventAssigned] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleAddJudgeClick= () => {
    onAdd(name, eventAssigned, email, contactNumber);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="Jpopup">
      <div className="Jpopup-content">
      <div className='HJpopup'>
        <div className="Jpopup-header">
          <h2>Add New Officials</h2>
        </div>
       </div> 
        <div className="Jpopup-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="Jpopup-field">
          <label htmlFor="eventAssigned">Task Assigned:</label>
          <input
            type="text"
            id="eventAssigned"
            placeholder="Event Assigned"
            value={eventAssigned}
            onChange={(event) => setEventAssigned(event.target.value)}
          />
        </div>
        <div className="Jpopup-field">
          <label htmlFor="email">Email ID:</label>
          <input
            type="text"
            id="email"
            placeholder="Email ID"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="Jpopup-field">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="text"
            id="contactNumber"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(event) => setContactNumber(event.target.value)}
          />
        </div>
        <div className="JPButtons">
          <button className="JPBtn" onClick={handleAddJudgeClick}>
            Add
          </button>
          <button className="JPBtn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddJudgePopup;
