import React from 'react';
import { useLocation } from 'react-router-dom';

const PatientProfile = () => {
    const location = useLocation();
    const user = location.state?.user || JSON.parse(localStorage.getItem("loginSession")); // تم التحقق من وجود location.state

    return (
        <div>
            <h1>Patient Profile</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>National ID: {user.nationalId}</p>
            <p>Gender: {user.gender}</p>
            <p>Birthdate: {user.birthdate}</p>
            <p>Address: {user.address}</p>
            <p>Phone Number: {user.phoneNumber}</p>
            
            {/* عرض معلومات إضافية خاصة بالمرضى */}
        </div>
    );
};

export default PatientProfile;