import React, { useState } from 'react';

const DoctorAvailability = () => {
    const [startTime, setStartTime] = useState('12:00');
    const [endTime, setEndTime] = useState('12:30');
    const [availableAppointments, setAvailableAppointments] = useState([]);

    const handleAddTimeSlot = () => {
        const newAppointment = {
            startTime: startTime,
            endTime: endTime
        };
        setAvailableAppointments([...availableAppointments, newAppointment]);
        localStorage.setItem('availableAppointments', JSON.stringify([...availableAppointments, newAppointment]));
    };

    return (
        <div>
            <h2>Doctor Availability</h2>
            <label>Start Time:</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <label>End Time:</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            <button onClick={handleAddTimeSlot}>Add Time Slot</button>

            <h3>Available Appointments:</h3>
            <ul>
                {availableAppointments.map((appointment, index) => (
                    <li key={index}>
                        {appointment.startTime} - {appointment.endTime}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorAvailability;