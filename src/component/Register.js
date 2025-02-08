// import React, { useState } from "react";
// // import Title from './components/Title';
// // import Input from '../components/Input';
// // import './App.css'; 
 
// const PasswordErrorMessage = () => { 
//  return ( 
//    <p className="FieldError">Password should have at least 8 characters</p> 
//  ); 
// }; 
 
// function Register() { 
//  const [firstName, setFirstName] = useState(""); 
//  const [lastName, setLastName] = useState(""); 
//  const [email, setEmail] = useState(""); 
//  const [password, setPassword] = useState({ 
//    value: "", 
//    isTouched: false, 
//  }); 
//  const [role, setRole] = useState("role"); 

//  const getIsFormValid = () => { 
//    return ( 
//      firstName  
//     //  validateEmail(email) && 
//     //  password.value.length >= 8 && 
//     //  role !== "role" 
//    ); 
//  }; 
 
//  const clearForm = () => { 
//    setFirstName(""); 
//    setLastName(""); 
//    setEmail(""); 
//    setPassword({ 
//      value: "", 
//      isTouched: false, 
//    }); 
//    setRole("role"); 
//  }; 
 
//  const handleSubmit = (e) => { 
//    e.preventDefault(); 
//    alert("Account created!"); 
//    clearForm(); 
//  }; 
 
//  return ( 
//    <div className="App"> 
//      <form onSubmit={handleSubmit}> 
//        <fieldset> 
//          <h2>Sign Up</h2> 
//          <div className="Field"> 
//            <label> 
//              First name <sup>*</sup> 
//            </label> 
//            <input 
//              value={firstName} 
//              onChange={(e) => { 
//                setFirstName(e.target.value); 
//              }} 
//              placeholder="First name" 
//            /> 
//          </div> 
//          <div className="Field"> 
//            <label>Last name</label> 
//            <input 
//              value={lastName} 
//              onChange={(e) => { 
//                setLastName(e.target.value); 
//              }} 
//              placeholder="Last name" 
//            /> 
//          </div> 
//          <div className="Field"> 
//            <label> 
//              Email address <sup>*</sup> 
//            </label> 
//            <input 
//              value={email} 
//              onChange={(e) => { 
//                setEmail(e.target.value); 
//              }} 
//              placeholder="Email address" 
//            /> 
//          </div> 
//          <div className="Field"> 
//            <label> 
//              Password <sup>*</sup> 
//            </label> 
//            <input 
//              value={password.value} 
//              type="password" 
//              onChange={(e) => { 
//                setPassword({ ...password, value: e.target.value }); 
//              }} 
//              onBlur={() => { 
//                setPassword({ ...password, isTouched: true }); 
//              }} 
//              placeholder="Password" 
//            /> 
//            {password.isTouched && password.value.length < 8 ? ( 
//              <PasswordErrorMessage /> 
//            ) : null} 
//          </div> 
//          <div className="Field"> 
//            <label> 
//              Role <sup>*</sup> 
//            </label> 
//            <select value={role} onChange={(e) => setRole(e.target.value)}> 
//              <option value="role">Role</option> 
//              <option value="individual">Individual</option> 
//              <option value="business">Business</option> 
//            </select> 
//          </div> 
//          <button type="submit" disabled={!getIsFormValid()}> 
//            Create account 
//          </button> 
//        </fieldset> 
//      </form> 
//    </div> 
//  ); 
// } 







// export default Register;




import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        nationalId: '',
        role: 'patient', // Default role
        gender: '',
        birthdate: '',
        address: '',
        phoneNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Store data in local storage
        localStorage.setItem('userData', JSON.stringify(formData));
        alert('Registration successful! Data stored in local storage.'); // Replace with a more user-friendly notification or redirect
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Password */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* National ID */}
                <div className="mb-3">
                    <label htmlFor="nationalId" className="form-label">National ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nationalId"
                        name="nationalId"
                        value={formData.nationalId}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Role (Doctor or Patient) */}
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
                        className="form-select"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                    </select>
                </div>

                {/* Patient Specific Fields (Conditionally Rendered) */}
                {formData.role === 'patient' && (
                    <>
                        {/* Gender */}
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select
                                className="form-select"
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required // Make gender required if patient is selected
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Birthdate */}
                        <div className="mb-3">
                            <label htmlFor="birthdate" className="form-label">Birthdate</label>
                            <input
                                type="date"
                                className="form-control"
                                id="birthdate"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleChange}
                                required // Make birthdate required if patient is selected
                            />
                        </div>

                        {/* Address */}
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required // Make address required if patient is selected
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <input
                                type="tel" // Use type="tel" for phone numbers
                                className="form-control"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required // Make phone number required if patient is selected
                            />
                        </div>
                    </>
                )}

                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;