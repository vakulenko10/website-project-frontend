import React, { useState, useEffect } from 'react';
import './Profile.css';
import Container from '../../Container'; // Assuming you have this reusable Container component
import Loader from '../../Loader';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    role: '',
  });

  const [isEditing, setIsEditing] = useState(false); // Edit mode toggle
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch profile data from the API when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:5000/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Include JWT token if necessary
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false); // Ensure loading is stopped even if there's an error
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://your-api-route/profile', {
        method: 'PUT', // Assuming you're using PUT for updating profile data
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include JWT token if necessary
        },
        body: JSON.stringify(profileData),
      });
      if (response.ok) {
        console.log('Profile updated successfully');
        setIsEditing(false); // Exit edit mode after saving
      } else {
        console.error('Error updating profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  if (loading) {
    return <Loader />; // Show a loading state while fetching profile data
  }

  return (
    <main>
      <Container>
        {isEditing ? (
          <form onSubmit={handleSaveClick}>
            <div>
              <label>Username:</label>
              <input 
                type="text" 
                name="username" 
                value={profileData.username} 
                onChange={handleInputChange} 
              />
            </div>
            <div>
              <label>Email:</label>
              <input 
                type="email" 
                name="email" 
                value={profileData.email} 
                onChange={handleInputChange} 
              />
            </div>
            <div>
              <label>Role:</label>
              <input 
                type="text" 
                name="role" 
                value={profileData.role} 
                onChange={handleInputChange} 
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={handleEditClick}>Cancel</button>
          </form>
        ) : (
          <div>
            <h1>Profile</h1>
            <p>Username: {profileData.username}</p>
            <p>Email: {profileData.email}</p>
            <p>Role: {profileData.role}</p>
            <button onClick={handleEditClick}>Edit Profile</button>
          </div>
        )}
      </Container>
    </main>
  );
};

export default Profile;
