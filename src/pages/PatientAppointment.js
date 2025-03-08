import React, { useState, useEffect } from 'react';

const PatientAppointment = () => {
    const [availableAppointments, setAvailableAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        const appointments = JSON.parse(localStorage.getItem('availableAppointments')) || [];
        setAvailableAppointments(appointments);
    }, []);

    const handleAppointmentSelect = (appointment) => {
        setSelectedAppointment(appointment);
        localStorage.setItem('selectedAppointment', JSON.stringify(appointment));
    };

    return (
        <div>
            <h2>Patient Appointment</h2>
            <h3>Available Appointments:</h3>
            <ul>
                {availableAppointments.map((appointment, index) => (
                    <li key={index}>
                        {appointment.startTime} - {appointment.endTime}
                        <button onClick={() => handleAppointmentSelect(appointment)}>Select</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientAppointment;