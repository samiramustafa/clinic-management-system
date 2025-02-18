import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Fetch user data from API
    axios
      .get("https://retoolapi.dev/Lv7u78/user/1") // Assuming you want user with id=1
      .then((response) => {
        setUser(response.data);
        setFormData(response.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`https://retoolapi.dev/Lv7u78/user/${user.id}`, formData);

      if (response.status === 200) {
        setUser(formData);
        setEditMode(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>Doctor Profile</h2>
      {editMode ? (
        <div>
          <label>Username:</label>
          <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} className="form-control mb-2" />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control mb-2" />

          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control mb-2" />

          <label>National ID:</label>
          <input type="text" name="N_ID" value={formData.N_ID} className="form-control mb-2" disabled />

          <button className="btn btn-success" onClick={handleSave}>Confirm</button>
          <button className="btn btn-secondary ms-2" onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Username:</strong> {user.user_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>National ID:</strong> {user.N_ID}</p>
          <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
