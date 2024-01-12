import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EventParticipantsPopup.css'; // Add your CSS for styling the popup
import { collection, getDocs, where, query } from 'firebase/firestore';
import {db} from './firebase';

const EventParticipantsPopup = ({ onClose }) => {
  const { eventId } = useParams();

  const [participantsData, setParticipantsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const participantsRef = collection(db, 'participants');
        const eventParticipantsQuery = query(participantsRef, where('eventId', '==', eventId));
        const querySnapshot = await getDocs(eventParticipantsQuery);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setParticipantsData(data);
      } catch (error) {
        console.error('Error fetching participants data: ', error);
      }
    };

    fetchData();
  }, [eventId]);

  return (
    <div className='PPpopup'>
    <div className="event-participants-popup">
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      <h2>Reporter {eventId}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {participantsData.map((participant, index) => (
            <tr key={index}>
              <td>{participant.name}</td>
              <td>{participant.email}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    );
};

export default EventParticipantsPopup;
