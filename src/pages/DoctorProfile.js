
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
//     axios.get(`https://retoolapi.dev/Lv7u78/user/${user.id}`)
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

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({
//           ...formData,
//           img: reader.result
//         });
//       };
//       reader.readAsDataURL(file); 
//     }
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

// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const DoctorProfile = () => {
//     const [doctor, setDoctor] = useState(null);
//     const [editMode, setEditMode] = useState(false);
//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         phoneNumber: "",
//         profileImage: "",
//         specialization: "",
//         jobTitle: "",
//         clinicAddress: ""
//     });

//     useEffect(() => {
//         // استرجاع بيانات المستخدم من localStorage
//         const storedData = localStorage.getItem("clinic_data");
//         if (storedData) {
//             const users = JSON.parse(storedData);
//             // ابحث عن الدكتور في قائمة المستخدمين
//             const doctorData = users.find(user => user.role === 'doctor');
//             if (doctorData) {
//                 setDoctor(doctorData);
//                 setFormData({
//                     username: doctorData.username || "",
//                     email: doctorData.email || "",
//                     phoneNumber: doctorData.phoneNumber || "",
//                     profileImage: doctorData.profileImage || "",
//                     specialization: doctorData.specialization || "",
//                     jobTitle: doctorData.jobTitle || "",
//                     clinicAddress: doctorData.clinicAddress || ""
//                 });
//             } else {
//                 console.log("No doctor data found in localStorage");
//             }
//         }
//     }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSave = () => {
//         // تحديث بيانات المستخدم في localStorage
//         let storedData = localStorage.getItem("clinic_data");
//         if (storedData) {
//             let users = JSON.parse(storedData);
//             // تحديث بيانات الدكتور
//             const doctorIndex = users.findIndex(user => user.role === 'doctor');
//             if (doctorIndex !== -1) {
//                 users[doctorIndex] = { ...users[doctorIndex], ...formData };
//                 localStorage.setItem("clinic_data", JSON.stringify(users));
//                 setDoctor({ ...users[doctorIndex] });
//             }
//         }
//         setEditMode(false);
//     };

//     if (!doctor) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="container mt-5">
//             <div className="card shadow-lg">
//                 <div className="card-body">
//                     <div className="d-flex align-items-center mb-4">
//                         <img
//                             src={doctor.profileImage}
//                             alt="Doctor"
//                             className="rounded-circle img-thumbnail me-3"
//                             style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//                         />
//                         <div>
//                             <h2 className="card-title fw-bold">{doctor.username}</h2>
//                             <p className="text-muted">{doctor.jobTitle} - {doctor.specialization}</p>
//                         </div>
//                     </div>

//                     <div className="mb-3">
//                         <h5 className="fw-bold">Contact Information</h5>
//                         <p><i className="fas fa-envelope me-2"></i>Email: {doctor.email}</p>
//                         <p><i className="fas fa-phone me-2"></i>Phone: {doctor.phoneNumber}</p>
//                         <p><i className="fas fa-map-marker-alt me-2"></i>Clinic Address: {doctor.clinicAddress}</p>
//                     </div>

//                     <div>
//                         {editMode ? (
//                             <div>
//                                 <label>Username:</label>
//                                 <input
//                                     type="text"
//                                     name="username"
//                                     value={formData.username}
//                                     onChange={handleChange}
//                                     className="form-control mb-2"
//                                 />

//                                 <label>Email:</label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     className="form-control mb-2"
//                                 />

//                                 <label>Phone:</label>
//                                 <input
//                                     type="text"
//                                     name="phoneNumber"
//                                     value={formData.phoneNumber}
//                                     onChange={handleChange}
//                                     className="form-control mb-2"
//                                 />

//                                 <label>Specialization:</label>
//                                 <input
//                                     type="text"
//                                     name="specialization"
//                                     value={formData.specialization}
//                                     onChange={handleChange}
//                                     className="form-control mb-2"
//                                 />

//                                 <label>Job Title:</label>
//                                 <input
//                                     type="text"
//                                     name="jobTitle"
//                                     value={formData.jobTitle}
//                                     onChange={handleChange}
//                                     className="form-control mb-2"
//                                 />

//                                 <label>Clinic Address:</label>
//                                 <input
//                                     type="text"
//                                     name="clinicAddress"
//                                     value={formData.clinicAddress}
//                                     onChange={handleChange}
//                                     className="form-control mb-2"
//                                 />

//                                 <label>Profile Image URL:</label>
//                                 <input
//                                     type="text"
//                                     name="profileImage"
//                                     value={formData.profileImage}
//                                     onChange={handleChange}
//                                     className="form-control mb-2"
//                                 />

//                                 <button className="btn btn-success" onClick={handleSave}>Confirm</button>
//                                 <button className="btn btn-secondary ms-2" onClick={() => setEditMode(false)}>Cancel</button>
//                             </div>
//                         ) : (
//                             <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit Profile</button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DoctorProfile;


// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const DoctorProfile = () => {
//     const [doctor, setDoctor] = useState(null);
//     const [editMode, setEditMode] = useState(false);
//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         phoneNumber: "",
//         profileImage: "",
//         specialization: "",
//         jobTitle: "",
//         clinicAddress: ""
//     });

//     useEffect(() => {
//         // استرجاع بيانات المستخدم من localStorage
//         const storedData = localStorage.getItem("clinic_data");
//         if (storedData) {
//             const users = JSON.parse(storedData);
//             // ابحث عن الدكتور في قائمة المستخدمين
//             const doctorData = users.find(user => user.role === 'doctor');
//             if (doctorData) {
//                 setDoctor(doctorData);
//                 setFormData({
//                     username: doctorData.username || "",
//                     email: doctorData.email || "",
//                     phoneNumber: doctorData.phoneNumber || "",
//                     profileImage: doctorData.profileImage || "",
//                     specialization: doctorData.specialization || "",
//                     jobTitle: doctorData.jobTitle || "",
//                     clinicAddress: doctorData.clinicAddress || ""
//                 });
//             } else {
//                 console.log("No doctor data found in localStorage");
//             }
//         }
//     }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSave = () => {
//         // تحديث بيانات المستخدم في localStorage
//         let storedData = localStorage.getItem("clinic_data");
//         if (storedData) {
//             let users = JSON.parse(storedData);
//             // تحديث بيانات الدكتور
//             const doctorIndex = users.findIndex(user => user.role === 'doctor');
//             if (doctorIndex !== -1) {
//                 users[doctorIndex] = { ...users[doctorIndex], ...formData };
//                 localStorage.setItem("clinic_data", JSON.stringify(users));
//                 setDoctor({ ...users[doctorIndex] });
//             }
//         }
//         setEditMode(false);
//     };

//     if (!doctor) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="container mt-5">
//             <div className="card shadow-lg">
//                 <div className="card-body">
//                     <div className="d-flex align-items-center mb-4">
//                         <img
//                             src={doctor.profileImage}
//                             alt="Doctor"
//                             className="rounded-circle img-thumbnail me-3"
//                             style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//                         />
//                         <div>
//                             <h2 className="card-title fw-bold">{doctor.username}</h2>
//                             <p className="text-muted">{doctor.jobTitle} - {doctor.specialization}</p>
//                         </div>
//                     </div>

//                     <div className="mb-3">
//                         <h5 className="fw-bold">Contact Information</h5>
//                         <p><i className="fas fa-envelope me-2"></i>Email: {doctor.email}</p>
//                         <p><i className="fas fa-phone me-2"></i>Phone: {doctor.phoneNumber}</p>
//                         <p><i className="fas fa-map-marker-alt me-2"></i>Clinic Address: {doctor.clinicAddress}</p>
//                     </div>

//                     <div>
//                         {editMode ? (
//                             <div>
//                                 <label>Username:</label>
//                                 <input
//                                     type="text"
//                                     name="username"
//                                     value={formData.username}
//                                     onChange={handleChange}
//                                     className="form-control mb-2"
//                                 />

//                                 <label>Email:</label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     className="form-control mb-2"
//                                 />

//                                 <label>Phone:</label>
//                                 <input
//                                     type="text"
//                                     name="phoneNumber"
//                                     value={formData.phoneNumber}
//                                     onChange={handleChange}
//                                     className="form-control mb-2"
//                                 />

//                                 <label>Specialization:</label>
//                                 <input
//                                     type="text"
//                                     name="specialization"
//                                     value={formData.specialization}
//                                     onChange={handleChange}
//                                     className="form-control mb-2"
//                                 />

//                                 <label>Job Title:</label>
//                                 <input
//                                     type="text"
//                                     name="jobTitle"
//                                     value={formData.jobTitle}
//                                     onChange={handleChange}
//                                     className="form-control mb-2"
//                                 />

//                                 <label>Clinic Address:</label>
//                                 <input
//                                     type="text"
//                                     name="clinicAddress"
//                                     value={formData.clinicAddress}
//                                     onChange={handleChange}
//                                     className="form-control mb-2"
//                                 />

//                                 <label>Profile Image URL:</label>
//                                 <input
//                                     type="text"
//                                     name="profileImage"
//                                     value={formData.profileImage}
//                                     onChange={handleChange}
//                                     className="form-control mb-2"
//                                 />

//                                 <button className="btn btn-success" onClick={handleSave}>Confirm</button>
//                                 <button className="btn btn-secondary ms-2" onClick={() => setEditMode(false)}>Cancel</button>
//                             </div>
//                         ) : (
//                             <div>
//                                 <h5 className="fw-bold">More Information</h5>
//                                 <p><i className="fas fa-briefcase me-2"></i>Specialization: {doctor.specialization}</p>
//                                 <p><i className="fas fa-graduation-cap me-2"></i>Job Title: {doctor.jobTitle}</p>
//                                 <p><i className="fas fa-clinic-medical me-2"></i>Clinic Address: {doctor.clinicAddress}</p>
//                                 <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit Profile</button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DoctorProfile;
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorProfile = () => {
    const [doctor, setDoctor] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        profileImage: "",
        specialization: "",
        jobTitle: "",
        clinicAddress: ""
    });

    useEffect(() => {
        // استرجاع بيانات المستخدم من localStorage
        const storedData = localStorage.getItem("clinic_data");
        if (storedData) {
            const users = JSON.parse(storedData);
            // ابحث عن الدكتور في قائمة المستخدمين
            const doctorData = users.find(user => user.role === 'doctor');
            if (doctorData) {
                setDoctor(doctorData);
                setFormData({
                    username: doctorData.username || "",
                    email: doctorData.email || "",
                    phoneNumber: doctorData.phoneNumber || "",
                    profileImage: doctorData.profileImage || "",
                    specialization: doctorData.specialization || "",
                    jobTitle: doctorData.jobTitle || "",
                    clinicAddress: doctorData.clinicAddress || ""
                });
            } else {
                console.log("No doctor data found in localStorage");
            }
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({...formData, profileImage: reader.result }); // تخزين الصورة كـ Base64
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // تحديث بيانات المستخدم في localStorage
        let storedData = localStorage.getItem("clinic_data");
        if (storedData) {
            let users = JSON.parse(storedData);
            // تحديث بيانات الدكتور
            const doctorIndex = users.findIndex(user => user.role === 'doctor');
            if (doctorIndex !== -1) {
                users[doctorIndex] = { ...users[doctorIndex], ...formData };
                localStorage.setItem("clinic_data", JSON.stringify(users));
                setDoctor({ ...users[doctorIndex] });
            }
        }
        setEditMode(false);
    };

    if (!doctor) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-body">
                    <div className="d-flex align-items-center mb-4">
                        {doctor.profileImage && (
                            <img
                                src={`/images/${doctor.profileImage}`}
                                alt="Doctor"
                                className="rounded-circle img-thumbnail me-3"
                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                            />
                        )}
                        <div>
                            <h2 className="card-title fw-bold">{doctor.username}</h2>
                            <p className="text-muted">{doctor.jobTitle} - {doctor.specialization}</p>
                        </div>
                    </div>

                    <div className="mb-3">
                        <h5 className="fw-bold">Contact Information</h5>
                        <p><i className="fas fa-envelope me-2"></i>Email: {doctor.email}</p>
                        <p><i className="fas fa-phone me-2"></i>Phone: {doctor.phoneNumber}</p>
                        <p><i className="fas fa-map-marker-alt me-2"></i>Clinic Address: {doctor.clinicAddress}</p>
                    </div>

                    <div>
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

                                <label>Phone:</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="form-control mb-2"
                                />

                                <label>Specialization:</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    className="form-control mb-2"
                                />

                                <label>Job Title:</label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    className="form-control mb-2"
                                />

                                <label>Clinic Address:</label>
                                <input
                                    type="text"
                                    name="clinicAddress"
                                    value={formData.clinicAddress}
                                    onChange={handleChange}
                                    className="form-control mb-2"
                                />

                                <label>Profile Image:</label>
                                 <input
                                    type="file"
                                    name="profileImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="form-control mb-2"
                                />

                                <button className="btn btn-success" onClick={handleSave}>Confirm</button>
                                <button className="btn btn-secondary ms-2" onClick={() => setEditMode(false)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <h5 className="fw-bold">More Information</h5>
                                <p><i className="fas fa-briefcase me-2"></i>Specialization: {doctor.specialization}</p>
                                <p><i className="fas fa-graduation-cap me-2"></i>Job Title: {doctor.jobTitle}</p>
                                <p><i className="fas fa-clinic-medical me-2"></i>Clinic Address: {doctor.clinicAddress}</p>
                                <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit Profile</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;