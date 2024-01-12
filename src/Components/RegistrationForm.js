import React, { useState } from 'react';
import { FiUser, FiUsers, FiMail, FiPhone, FiPlus } from 'react-icons/fi';
import './RegistrationForm.css';
import firebase from './firebase';

const RegistrationForm = () => {
  const [registrationData, setRegistrationData] = useState({
    name: '',
    teamName: '',
    email: '',
    college: '',
    mobileNumber: '',
    teamMembers: [''],
  });

  const addTeamMember = () => {
    setRegistrationData({
      ...registrationData,
      teamMembers: [...registrationData.teamMembers, ''],
    });
  };

  const handleTeamMemberChange = (index, value) => {
    const updatedMembers = [...registrationData.teamMembers];
    updatedMembers[index] = value;
    setRegistrationData({
      ...registrationData,
      teamMembers: updatedMembers,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Additional validation
    // if (
    //   !registrationData.name ||
    //   !registrationData.teamName ||
    //   !registrationData.email ||
    //   !registrationData.college ||
    //   !registrationData.mobileNumber
    // ) {
    //   alert('Please fill all the details');
    //   return;
    // }

    try {
      const response = await fetch(
        'https://fiddle-dashboard-default-rtdb.firebaseio.com//registrationData.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        }
      );

      if (response.ok) {
        // Clear the registration fields after successful submission
        setRegistrationData({
          name: '',
          teamName: '',
          email: '',
          college: '',
          mobileNumber: '',
          teamMembers: [''],
        });

        alert('Registration submitted successfully');
      } else {
        alert('Failed to submit registration');
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('An error occurred while submitting the registration');
    }
  };

  return (
    <div className="registration-registration">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <div className="input-group">
          <FiUser className="icon" />
          <input
            type="text"
            placeholder="Name"
            value={registrationData.name}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="input-group">
          <FiUsers className="icon" />
          <input
            type="text"
            placeholder="Team Name"
            value={registrationData.teamName}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                teamName: e.target.value,
              })
            }
          />
        </div>
        <div className="input-group">
          <FiMail className="icon" />
          <input
            type="email"
            placeholder="Email"
            value={registrationData.email}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="input-group">
          <FiPhone className="icon" />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={registrationData.mobileNumber}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                mobileNumber: e.target.value,
              })
            }
          />
        </div>
        {/* Team members */}
        {registrationData.teamMembers.map((member, index) => (
          <div className="input-group" key={index}>
            <FiPlus className="icon" />
            <input
              type="text"
              placeholder={`Team Member ${index + 1}`}
              value={member}
              onChange={(e) => handleTeamMemberChange(index, e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          className="add-member-btn"
          onClick={addTeamMember}
        >
          Add Team Member
        </button>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
