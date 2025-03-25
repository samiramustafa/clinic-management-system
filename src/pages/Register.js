// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import InputField from "../component/Input";
// import { useHistory, Link } from "react-router-dom";
// import Title from "../component/Title";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     full_name: "",  // ✅ تأكد من إضافة full_name
//     email: "",
//     phone_number: "",
//     national_id: "",
//     role: "",
//     city: "",
//     area: "",
//     birth_date: "",
//     gender: "",
//     speciality: "",
//     image: null,
// });

//     const [cities, setCities] = useState([]);
//     const [areas, setAreas] = useState([]);
//     const history = useHistory();

//     useEffect(() => {
//         axios.get("http://127.0.0.1:8000/api/cities/")
//             .then(response => setCities(response.data))
//             .catch(error => console.error("Error fetching cities:", error));
//     }, []);

//     useEffect(() => {
//         if (formData.city) {
//             axios.get(`http://127.0.0.1:8000/api/areas/?city=${formData.city}`)
//                 .then(response => setAreas(response.data))
//                 .catch(error => console.error("Error fetching areas:", error));
//         } else {
//             setAreas([]);
//         }
//     }, [formData.city]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, image: e.target.files[0] });
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();
      
//       const formDataToSend = new FormData();
//       Object.keys(formData).forEach(key => {
//           if (formData[key]) {
//               formDataToSend.append(key, formData[key]);
//           }
//       });
  
//       try {
//           const response = await axios.post("http://127.0.0.1:8000/api/users/", formDataToSend, {
//               headers: {
//                   "Content-Type": "multipart/form-data"
//               }
//           });
  
//           console.log("User registered successfully:", response.data);
//           alert("User registered successfully!");
//           history.push("/login");
//       } catch (error) {
//           console.error("Error registering user:", error.response?.data || error.message);
//           alert("Failed to register user. Please check your inputs.");
//       }
//   };
  

//     return (
//         <div>
//             <Title text="Register" />
//             <form onSubmit={handleSubmit}>
//                 <InputField label="Username" name="username" value={formData.username} onChange={handleChange} required />
//                 <InputField label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} required />
//                 <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
//                 <InputField label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
//                 <InputField label="National ID" name="national_id" value={formData.national_id} onChange={handleChange} required />
                
//                 <label>Role</label>
//                 <select name="role" value={formData.role} onChange={handleChange} required>
//                     <option value="">Select Role</option>
//                     <option value="doctor">Doctor</option>
//                     <option value="patient">Patient</option>
//                 </select>
                
//                 {formData.role === "doctor" && (
//                     <>
//                         <InputField label="Specialization" name="speciality" value={formData.speciality} onChange={handleChange} required />
//                         <label>Image</label>
//                         <input type="file" name="image" onChange={handleFileChange} required />
//                     </>
//                 )}
                
//                 {formData.role === "patient" && (
//                     <>
//                         <InputField label="Birth Date" name="birth_date" type="date" value={formData.birth_date} onChange={handleChange} required />
//                         <label>Gender</label>
//                         <select name="gender" value={formData.gender} onChange={handleChange} required>
//                             <option value="">Select Gender</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                         </select>
//                     </>
//                 )}
                
//                 <label>City</label>
//                 <select name="city" value={formData.city} onChange={handleChange} required>
//                     <option value="">Select City</option>
//                     {cities.map(city => (
//                         <option key={city.id} value={city.id}>{city.name}</option>
//                     ))}
//                 </select>
                
//                 <label>Area</label>
//                 <select name="area" value={formData.area} onChange={handleChange} required>
//                     <option value="">Select Area</option>
//                     {areas.map(area => (
//                         <option key={area.id} value={area.id}>{area.name}</option>
//                     ))}
//                 </select>
                
//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// };

// export default Register;
import React, { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../component/Input";
import { useHistory, Link } from "react-router-dom";
import Title from "../component/Title";
import "../css/Register.css";


const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone_number: "",
        national_id: "",
        role: "",
        city: "",
        area: "",
        birth_date: "",
        gender: "",
        speciality: "",
        image: null,
        password: "", 
    });
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/cities/")
            .then(response => setCities(response.data))
            .catch(error => console.error("Error fetching cities:", error));
    }, []);

    useEffect(() => {
        if (formData.city) {
            axios.get(`http://127.0.0.1:8000/api/areas/?city=${formData.city}`)
                .then(response => setAreas(response.data))
                .catch(error => console.error("Error fetching areas:", error));
        } else {
            setAreas([]);
        }
    }, [formData.city]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
          if (formData[key]) {
              formDataToSend.append(key, formData[key]);
          }
      });
  
      console.log("📤 Sending Data:", Object.fromEntries(formDataToSend)); // ✅ تأكيد إرسال البيانات الصحيحة
  
      try {
          const response = await axios.post("http://127.0.0.1:8000/api/users/", formDataToSend, {
              headers: {
                  "Content-Type": "multipart/form-data"
              }
          });
  
          console.log("✅ User registered successfully:", response.data);
          alert("User registered successfully!");
      } catch (error) {
          console.error("❌ Error registering user:", error.response?.data || error.message);
          alert("Failed to register user. Please check your inputs.");
      }
  };
  
 
  

    return (
        <div className="register-container">
            <Title text="Register" />
            <form className="register-form" onSubmit={handleSubmit}>
                
                <InputField label="Username" name="username" value={formData.username} onChange={handleChange} required />
                <InputField label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} required />
                <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                <InputField label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
                <InputField label="National ID" name="national_id" value={formData.national_id} onChange={handleChange} required />
                
                <label>Role</label>
                <select className="dropdown" name="role" value={formData.role} onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                </select>
                
                {formData.role === "doctor" && (
                    <>
                        <InputField label="Specialization" name="speciality" value={formData.speciality} onChange={handleChange} required />
                        <label>Image</label>
                        <input className="file-input" type="file" name="image" onChange={handleFileChange} required />
                    </>
                )}
                
                {formData.role === "patient" && (
                    <>
                        <InputField label="Birth Date" name="birth_date" type="date" value={formData.birth_date} onChange={handleChange} required />
                        <label>Gender</label>
                        <select className="dropdown" name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </>
                )}
                
                <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                
                
                <label>City</label>
                <select className="dropdown" name="city" value={formData.city} onChange={handleChange} required>
                    <option value="">Select City</option>
                    {cities.map(city => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                    ))}
                </select>
                
                <label>Area</label>
                <select className="dropdown" name="area" value={formData.area} onChange={handleChange} required>
                    <option value="">Select Area</option>
                    {areas.map(area => (
                        <option key={area.id} value={area.id}>{area.name}</option>
                    ))}
                </select>
                
                <button className="submit-btn" type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;