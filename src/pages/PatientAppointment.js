<<<<<<< HEAD
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
=======



// import React, { useContext } from "react";
// import AppointmentContext from "../pages/AppointmentContext"; 

// function Appointments() {
//   const { bookedAppointments = [], setBookedAppointments } = useContext(AppointmentContext);

//   const handleCancel = (id) => {
//     const updatedAppointments = bookedAppointments.filter((appointment) => appointment.id !== id);
//     setBookedAppointments(updatedAppointments);
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-3">Booked Appointments</h2>

//       {bookedAppointments.length === 0 ? (
//         <p>No appointments booked.</p>
//       ) : (
//         <div className="row">
//           {bookedAppointments.map((appointment) => (
//             <div key={appointment.id} className="col-md-4 mb-3">
//               <div className="card shadow-sm">
//                 <div className="card-body">
//                   <h5 className="card-title">{appointment.patientName}</h5>
//                   <p className="card-text">
//                     <strong>Phone:</strong> {appointment.patientPhone} <br />
//                     <strong>Date:</strong> {appointment.day.name}, {appointment.day.date} <br />
//                     <strong>Time:</strong> {appointment.time} <br />
//                     <small className="text-muted">Booked at: {appointment.bookedAt}</small>
//                   </p>
//                   <button className="btn btn-danger" onClick={() => handleCancel(appointment.id)}>
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Appointments;

import React, { useContext, useState } from "react";
import AppointmentContext from "../pages/AppointmentContext"; 

function Appointments() {
  const { bookedAppointments = [], setBookedAppointments } = useContext(AppointmentContext);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleCancel = () => {
    const updatedAppointments = bookedAppointments.filter((appointment) => appointment.id !== selectedAppointment);
    setBookedAppointments(updatedAppointments);
    setSelectedAppointment(null); 
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center fw-bold fs-4 text-primary">
        <i className="fas fa-calendar-check"></i> Booked Appointments
      </h2>

      {bookedAppointments.length === 0 ? (
        <p className="text-center">No appointments booked.</p>
      ) : (
        <div className="row g-3"> 
          {bookedAppointments.map((appointment) => (
            <div key={appointment.id} className="col-md-6">
              <div className="card shadow-sm border-primary rounded">
                <div className="card-body">
                  <h5 className="card-title text-primary">{appointment.patientName}</h5>
                  <p className="card-text fs-5">
                    <strong>📞 Phone:</strong> {appointment.patientPhone} <br />
                    <strong>📅 Date:</strong> {appointment.day.name}, {appointment.day.date} <br />
                    <strong>⏰ Time:</strong> {appointment.time} <br />
                    <small className="text-muted">📌 Booked at: {appointment.bookedAt}</small>
                  </p>
                  <button 
                    className="btn btn-danger w-100 fs-5" 
                    onClick={() => setSelectedAppointment(appointment.id)}
                    data-bs-toggle="modal"
                    data-bs-target="#cancelModal"
                  >
                    Cancel 
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

     
      <div className="modal fade" id="cancelModal"  tabIndex="-1" aria-labelledby="cancelModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="cancelModalLabel">Confirm Cancellation</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to cancel this appointment?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleCancel}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments;

>>>>>>> 5f3acfbe1fd83e640c9371175f558740e14c5a7e
