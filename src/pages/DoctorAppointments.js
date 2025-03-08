import React, { useState, useEffect } from 'react';

const DoctorAppointments = () => {
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        const appointment = JSON.parse(localStorage.getItem('selectedAppointment')) || null;
        setSelectedAppointment(appointment);
    }, []);

    return (
        <div>
            <h2>Doctor Appointments</h2>
            {selectedAppointment ? (
                <div>
                    <h3>Appointment Request:</h3>
                    <p>Time: {selectedAppointment.startTime} - {selectedAppointment.endTime}</p>
                    <button>Accept</button>
                    <button>Reject</button>
                </div>
            ) : (
                <p>No appointments requested.</p>
            )}
        </div>
    );
};

export default DoctorAppointments;