// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const DoctorProfile = () => {
//   const [user, setUser] = useState(null);  
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     user_name: "",
//     email: "",
//     phone: "",
//     N_ID: "",
//     img: "",
//     age: "",
//     address: "",
//     job_title: "",
//   });

//   useEffect(() => {
//     axios.get(`https://retoolapi.dev/Lv7u78/user/1`)
//     .then(response => {
//         const apiUserData = response.data;
//         setUser(apiUserData);
//         setFormData({
//           user_name: apiUserData.user_name,
//           email: apiUserData.email,
//           phone: apiUserData.phone,
//           N_ID: apiUserData.N_ID,
//           img: apiUserData.img,
//           age: apiUserData.age,
//           address: apiUserData.address,
//           job_title: apiUserData.job_title
//         });
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     setUser(formData);  
//     setEditMode(false);
//   };

//   if (!user) {
//     return <div>Loading...</div>;  
//   }

//   return (
//     <div className="container mt-5">
//       <h2>Doctor Profile</h2>
//       {editMode ? (
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             name="user_name"
//             value={formData.user_name}
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

//           <label>Phone:</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="form-control mb-2"
//           />

//           <label>National ID:</label>
//           <input
//             type="text"
//             name="N_ID"
//             value={formData.N_ID}
//             className="form-control mb-2"
//             disabled
//           />

//           <label>Age:</label>
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             className="form-control mb-2"
//           />

//           <label>Address:</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="form-control mb-2"
//           />

//           <label>Job Title:</label>
//           <input
//             type="text"
//             name="job_title"
//             value={formData.job_title}
//             onChange={handleChange}
//             className="form-control mb-2"
//           />

//           <button className="btn btn-success" onClick={handleSave}>Confirm</button>
//           <button className="btn btn-secondary ms-2" onClick={() => setEditMode(false)}>Cancel</button>
//         </div>
//       ) : (
//         <div>
//           <img src={user.img} alt="Doctor" className="img-thumbnail mb-2" />
//           <p><strong>Username:</strong> {user.user_name}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Phone:</strong> {user.phone}</p>
//           <p><strong>National ID:</strong> {user.N_ID}</p>
//           <p><strong>speciality:</strong>ortho</p>
//           <p><strong>Address:</strong> {user.address}</p>
//           <p><strong>Job Title:</strong> {user.job_title}</p>
//           <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorProfile;
import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorProfile = () => {
  const [user, setUser] = useState(null);  
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
    axios.get(`https://retoolapi.dev/Lv7u78/user/1`)
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          img: reader.result // هنا يتم تحديث الصورة
        });
      };
      reader.readAsDataURL(file); // تحويل الصورة إلى Base64
    }
  };

  const handleSave = () => {
    setUser(formData);  
    setEditMode(false);
  };

  if (!user) {
    return <div>Loading...</div>;  
  }

  return (
    <div className="container mt-5">
      <h2>Doctor Profile</h2>
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

          <label>Profile Picture:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="form-control mb-2"
          />
          {formData.img && <img src={formData.img} alt="Profile" className="img-thumbnail mt-2" width="100" />}

          <button className="btn btn-success" onClick={handleSave}>Confirm</button>
          <button className="btn btn-secondary ms-2" onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <img src={user.img} alt="Doctor" className="img-thumbnail mb-2" />
          <p><strong>Username:</strong> {user.user_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>National ID:</strong> {user.N_ID}</p>
          <p><strong>speciality:</strong> ortho</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Job Title:</strong> {user.job_title}</p>
          <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
