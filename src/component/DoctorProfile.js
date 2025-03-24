import React from 'react';
import { useLocation } from 'react-router-dom';

const DoctorProfile = () => {
    const location = useLocation();
    const user = location.state?.user || JSON.parse(localStorage.getItem("loginSession")); // تم التحقق من وجود location.state

    return (
        <div>
            <h1>Doctor Profile</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>National ID: {user.nationalId}</p>
           ,<a href="/doctor-availability">Doctor Availability</a>
            <a href="/doctor-appointments">Doctor Appointments</a>
        </div>
    );
};

export default DoctorProfile;