import React, { useState } from 'react';
import './AddResultPopup.css'; // Ensure you have a corresponding CSS file for styling

const AddResultPopup = ({ isOpen, onClose, onAdd }) => {
  const [event, setEvent] = useState('');
  const [firstPlace, setFirstPlace] = useState('');
  const [secondPlace, setSecondPlace] = useState('');
  const [thirdPlace, setThirdPlace] = useState('');

  const handleAddResult = () => {
    onAdd(event, [firstPlace, secondPlace, thirdPlace]);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`Rpopup ${isOpen ? 'open' : ''}`}>
      <div className="Rpopup-content">
        <div className='HRpopup'>
          <div className="Rpopup-header">
            <h2>Add Event Result</h2>
          </div>
        </div>
        <div className="Rpopup-field">
          <label htmlFor="event">Event:</label>
          <input
            type="text"
            id="event"
            placeholder="Event"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          />
        </div>
        <div className="Rpopup-field">
          <label htmlFor="firstPlace">First Place:</label>
          <input
            type="text"
            id="firstPlace"
            placeholder="First Place"
            value={firstPlace}
            onChange={(e) => setFirstPlace(e.target.value)}
          />
        </div>
        <div className="Rpopup-field">
          <label htmlFor="secondPlace">Second Place:</label>
          <input
            type="text"
            id="secondPlace"
            placeholder="Second Place"
            value={secondPlace}
            onChange={(e) => setSecondPlace(e.target.value)}
          />
        </div>
        <div className="Rpopup-field">
          <label htmlFor="thirdPlace">Third Place:</label>
          <input
            type="text"
            id="thirdPlace"
            placeholder="Third Place"
            value={thirdPlace}
            onChange={(e) => setThirdPlace(e.target.value)}
          />
        </div>
        <div className="RPButtons">
          <button className="RPBtn" onClick={handleAddResult}>
            Add Result
          </button>
          <button className="RPBtn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddResultPopup;
