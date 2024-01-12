import React, { useEffect, useState} from 'react';
import { getFirestore, getDocs, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {storage} from './firebase';
import { getStorage, ref, uploadBytes, getDownloadURL, } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import './EventListingFom.css'; // Make sure to create a corresponding CSS file

const EventListingForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [registrationFee, setRegistrationFee] = useState('');
  const [previewImage, setPreviewImage] = useState('null');
  const [coverImage, setCoverImage] = useState('null');
  const [eventData, setEventData] = useState('');

  const db = getFirestore();
  const auth = getAuth();
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const userEventListCollection = collection(db, 'users', userId, 'Events');
          const querySnapshot = await getDocs(userEventListCollection);
          const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setEventData(data);
        }
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const userEventListCollection = collection(db, 'users', userId, 'Events');

        // Upload preview image
        const previewImageRef = ref(storage, `images/${userId}/${previewImage.name}`);
      await uploadBytes(previewImageRef, previewImage);

      // Get download URL for preview image
      const previewImageUrl = await getDownloadURL(previewImageRef);

      // Upload cover image
      const coverImageRef = ref(storage, `images/${userId}/${coverImage.name}`);
      await uploadBytes(coverImageRef, coverImage);

      // Get download URL for cover image
      const coverImageUrl = await getDownloadURL(coverImageRef);

        // Add event data to Firestore
        await addDoc(userEventListCollection, {
          eventName,
          eventCategory,
          eventDate,
          eventTime,
          eventLocation,
          registrationFee,
          previewImageUrl,
          coverImageUrl,
          timestamp: serverTimestamp(),
        });

        console.log('Form submitted successfully!');
        navigate('/EventsPage');

      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="event-listing-form">
      <div className="form-header">
        <h2>List Event</h2>
        <div className="category-dropdown">
          <label htmlFor="eventCategory">Event Category</label>
          <select
            id="eventCategory"
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
            <option value="Conference">Conference</option>
            {/* Add more categories as needed */}
          </select>
        </div>
      </div>
      <div className="evnet-form-container">
        <form onSubmit={handleFormSubmit}>
          <div className="form-section">
            <h3>Media Files</h3>
            <div className="media-files-container">
              <label htmlFor="previewImage">Preview Image</label>
              <input
                type="file"
                id="previewImage"
                onChange={(e) => setPreviewImage(e.target.files[0])} 
              />

              <label htmlFor="coverImage">Cover Image</label>
              <input
                type="file"
                id="coverImage"
                onChange={(e) => setCoverImage(e.target.files[0])}
              />
            </div>
          </div>
          <div className="form-section">
            <h3>Event Details</h3>
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />

            <label htmlFor="eventDate">Event Date</label>
            <input
              type="date"
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />

            <label htmlFor="eventTime">Event Time</label>
            <input
              type="time"
              id="eventTime"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />

            <label htmlFor="eventLocation">Event Location</label>
            <input
              type="text"
              id="eventLocation"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
            />

            <label htmlFor="registrationFee">Registration Fee</label>
            <input
              type="text"
              id="registrationFee"
              value={registrationFee}
              onChange={(e) => setRegistrationFee(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EventListingForm;