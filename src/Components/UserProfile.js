import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = ({ user, handleLogout }) => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="user-profile">
      {/* <h2>User Profile</h2> */}
      <img src={user?.photoURL || 'default-image-url'} alt="User" />
      {editMode ? (
        <div>
          <h3>Edit Profile</h3>
          {/* Add form fields for editing user information */}
          <button onClick={toggleEditMode}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{user.displayName}</h3>
          <p>{user.email}</p>
          <button onClick={toggleEditMode}>Edit Profile</button>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
