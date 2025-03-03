import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ClinicSchedule = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, time: "10:00 AM", available: true },
    { id: 2, time: "11:00 AM", available: false, patient: "Ahmed" },
    { id: 3, time: "12:00 PM", available: true },
  ]);

  const [newTime, setNewTime] = useState("");
  const [showModal, setShowModal] = useState(false);

  const addAppointment = () => {
    if (newTime) {
      setAppointments([
        ...appointments,
        { id: appointments.length + 1, time: newTime, available: true },
      ]);
      setNewTime("");
      setShowModal(false);
    }
  };

  const toggleAvailability = (id) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, available: !app.available } : app
      )
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Clinic Schedule</h2>

      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Add New Appointment
      </button>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.time}</td>
              <td className={app.available ? "text-success" : "text-danger"}>
                {app.available ? "Available" : `Booked by ${app.patient || "Unknown"}`}
              </td>
              <td>
                {app.available ? (
                  <button className="btn btn-success btn-sm" onClick={() => toggleAvailability(app.id)}>
                    Book
                  </button>
                ) : (
                  <button className="btn btn-danger btn-sm" onClick={() => toggleAvailability(app.id)}>
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Appointment</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter time (e.g., 1:00 PM)"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button className="btn btn-primary" onClick={addAppointment}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default ClinicSchedule;
