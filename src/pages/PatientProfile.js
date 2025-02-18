import React, { useState, useEffect } from "react";
import axios from "axios";

const PatientProfile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    nationalId: "",
    phoneNumber: "",
    address: "",
    img: "",  // Added img field to store profile image URL
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nationalId: "",
    phoneNumber: "",
    address: "",
    img: "", // Added img field for profile picture
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        username: storedUser.username,
        email: storedUser.email,
        password: "", // Keeping password empty for editing
        nationalId: storedUser.nationalId,
        phoneNumber: storedUser.phoneNumber,
        address: storedUser.address,
        img: storedUser.img,  // Set the image URL
      });
    } else {
      // Fetch the user from the API if it's not in localStorage
      const fetchUserData = async () => {
        try {
          const response = await axios.get("https://retoolapi.dev/Lv7u78/user/1"); // Example API endpoint
          const apiUser = response.data;
          setUser({
            username: apiUser.user_name,
            email: apiUser.email,
            password: "", // Keeping password empty for editing
            nationalId: apiUser.N_ID,
            phoneNumber: apiUser.phone,
            address: apiUser.address,
            img: apiUser.img, // Setting image URL
          });
          setFormData({
            username: apiUser.user_name,
            email: apiUser.email,
            password: "", // Keeping password empty for editing
            nationalId: apiUser.N_ID,
            phoneNumber: apiUser.phone,
            address: apiUser.address,
            img: apiUser.img, // Setting image URL
          });
          localStorage.setItem("user", JSON.stringify(apiUser)); // Store the fetched data in localStorage
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        username: formData.username,
        email: formData.email,
        password: formData.password || user.password,
        nationalId: user.nationalId,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        img: formData.img || user.img, // Updating image if provided
      };

      const response = await axios.put(
        `https://retoolapi.dev/Lv7u78/user/${user.id}`,
        updatedData
      );

      if (response.status === 200) {
        setUser(updatedData);
        localStorage.setItem("user", JSON.stringify(updatedData));
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Patient Profile</h2>
      {editMode ? (
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Enter new password"
          />

          <label>National ID:</label>
          <input
            type="text"
            name="nationalId"
            value={formData.nationalId}
            className="form-control mb-2"
            disabled
          />

          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control mb-2"
          ></textarea>

          <label>Profile Image (URL):</label>
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Profile image URL"
          />

          <button className="btn btn-success" onClick={handleSave}>
            Confirm
          </button>
          <button
            className="btn btn-secondary ms-2"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>National ID:</strong> {user.nationalId}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Profile Image:</strong></p>
          {user.img && <img src={user.img} alt="Profile" className="img-fluid" />}
          <button className="btn btn-primary" onClick={() => setEditMode(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
