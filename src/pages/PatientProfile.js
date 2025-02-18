// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PatientProfile = () => {
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//     nationalId: "",
//     phoneNumber: "",
//     address: "",
//     img: "",  // Added img field to store profile image URL
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     nationalId: "",
//     phoneNumber: "",
//     address: "",
//     img: "", // Added img field for profile picture
//   });

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//       setFormData({
//         username: storedUser.username,
//         email: storedUser.email,
//         password: "", // Keeping password empty for editing
//         nationalId: storedUser.nationalId,
//         phoneNumber: storedUser.phoneNumber,
//         address: storedUser.address,
//         img: storedUser.img,  // Set the image URL
//       });
//     } else {
//       // Fetch the user from the API if it's not in localStorage
//       const fetchUserData = async () => {
//         try {
//           const response = await axios.get("https://retoolapi.dev/Lv7u78/user/1"); // Example API endpoint
//           const apiUser = response.data;
//           setUser({
//             username: apiUser.user_name,
//             email: apiUser.email,
//             password: "", // Keeping password empty for editing
//             nationalId: apiUser.N_ID,
//             phoneNumber: apiUser.phone,
//             address: apiUser.address,
//             img: apiUser.img, // Setting image URL
//           });
//           setFormData({
//             username: apiUser.user_name,
//             email: apiUser.email,
//             password: "", // Keeping password empty for editing
//             nationalId: apiUser.N_ID,
//             phoneNumber: apiUser.phone,
//             address: apiUser.address,
//             img: apiUser.img, // Setting image URL
//           });
//           localStorage.setItem("user", JSON.stringify(apiUser)); // Store the fetched data in localStorage
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       };
//       fetchUserData();
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       const updatedData = {
//         username: formData.username,
//         email: formData.email,
//         password: formData.password || user.password,
//         nationalId: user.nationalId,
//         phoneNumber: formData.phoneNumber,
//         address: formData.address,
//         img: formData.img || user.img, // Updating image if provided
//       };

//       const response = await axios.put(
//         `https://retoolapi.dev/Lv7u78/user/${user.id}`,
//         updatedData
//       );

//       if (response.status === 200) {
//         setUser(updatedData);
//         localStorage.setItem("user", JSON.stringify(updatedData));
//         setEditMode(false);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Patient Profile</h2>
//       {editMode ? (
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             className="form-control mb-2"
//           />

//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="form-control mb-2"
//           />

//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="form-control mb-2"
//             placeholder="Enter new password"
//           />

//           <label>National ID:</label>
//           <input
//             type="text"
//             name="nationalId"
//             value={formData.nationalId}
//             className="form-control mb-2"
//             disabled
//           />

//           <label>Phone Number:</label>
//           <input
//             type="text"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             className="form-control mb-2"
//           />

//           <label>Address:</label>
//           <textarea
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="form-control mb-2"
//           ></textarea>

//           <label>Profile Image (URL):</label>
//           <input
//             type="text"
//             name="img"
//             value={formData.img}
//             onChange={handleChange}
//             className="form-control mb-2"
//             placeholder="Profile image URL"
//           />

//           <button className="btn btn-success" onClick={handleSave}>
//             Confirm
//           </button>
//           <button
//             className="btn btn-secondary ms-2"
//             onClick={() => setEditMode(false)}
//           >
//             Cancel
//           </button>
//         </div>
//       ) : (
//         <div>
//           <p><strong>Username:</strong> {user.username}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>National ID:</strong> {user.nationalId}</p>
//           <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//           <p><strong>Address:</strong> {user.address}</p>
//           <p><strong>Profile Image:</strong></p>
//           {user.img && <img src={user.img} alt="Profile" className="img-fluid" />}
//           <button className="btn btn-primary" onClick={() => setEditMode(true)}>
//             Edit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PatientProfile;

import React, { useState, useEffect } from "react";
import axios from "axios";

const PatientProfile = () => {
  const [user, setUser] = useState(null);  // ضبط الحالة لتكون null أولاً
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    phone: "",
    N_ID: "",
    img: "",
    age: "",
    address: "",
    job_title: "",
  });

  useEffect(() => {
    // جلب بيانات الـ API
    axios.get(`https://retoolapi.dev/Lv7u78/user/2`)  // تأكد من اختيار ID المريض الصحيح
    .then(response => {
        const apiUserData = response.data;
        setUser(apiUserData);
        setFormData({
          user_name: apiUserData.user_name,
          email: apiUserData.email,
          phone: apiUserData.phone,
          N_ID: apiUserData.N_ID,
          img: apiUserData.img,
          age: apiUserData.age,
          address: apiUserData.address,
          job_title: apiUserData.job_title
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        user_name: formData.user_name,
        email: formData.email,
        phone: formData.phone,
        N_ID: formData.N_ID,
        img: formData.img || user.img,
        age: formData.age,
        address: formData.address,
        job_title: formData.job_title
      };

      const response = await axios.put(
        `https://retoolapi.dev/Lv7u78/user/${user.id}`,
        updatedData
      );

      if (response.status === 200) {
        setUser(updatedData);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;  // إذا كانت البيانات غير محملة بعد
  }

  return (
    <div className="container mt-5">
      <h2>Patient Profile</h2>
      {editMode ? (
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
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

          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <label>National ID:</label>
          <input
            type="text"
            name="N_ID"
            value={formData.N_ID}
            className="form-control mb-2"
            disabled
          />

          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <label>Job Title:</label>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <button className="btn btn-success" onClick={handleSave}>Confirm</button>
          <button className="btn btn-secondary ms-2" onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <img src={user.img} alt="Patient" className="img-thumbnail mb-2" />
          <p><strong>Username:</strong> {user.user_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>National ID:</strong> {user.N_ID}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Job Title:</strong> {user.job_title}</p>
          <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
