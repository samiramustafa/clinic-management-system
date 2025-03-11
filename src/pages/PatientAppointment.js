


import React, { useContext } from "react";
import AppointmentContext from "../pages/AppointmentContext"; 

function Appointments() {
  const { bookedAppointments = [], setBookedAppointments } = useContext(AppointmentContext);

  const handleCancel = (id) => {
    const updatedAppointments = bookedAppointments.filter((appointment) => appointment.id !== id);
    setBookedAppointments(updatedAppointments);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Booked Appointments</h2>

      {bookedAppointments.length === 0 ? (
        <p>No appointments booked.</p>
      ) : (
        <div className="row">
          {bookedAppointments.map((appointment) => (
            <div key={appointment.id} className="col-md-4 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{appointment.patientName}</h5>
                  <p className="card-text">
                    <strong>Phone:</strong> {appointment.patientPhone} <br />
                    <strong>Date:</strong> {appointment.day.name}, {appointment.day.date} <br />
                    <strong>Time:</strong> {appointment.time} <br />
                    <small className="text-muted">Booked at: {appointment.bookedAt}</small>
                  </p>
                  <button className="btn btn-danger" onClick={() => handleCancel(appointment.id)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Appointments;
