

import axios from "axios";
import React, { useEffect, useState } from "react";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [confirmBox, setConfirmBox] = useState({ show: false, appointmentId: null });

  useEffect(() => {
    axios
      .get("https://retoolapi.dev/UKuH6Q/doctorappointment")
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handleAddAppointment =  () => {
    if (!date || !startTime || !endTime) {
      setAlert({ message: "Please fill in all fields", type: "warning" });
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setAlert({ message: "Cannot select a past date", type: "danger" });
      return;
    }

    if (endTime <= startTime) {
      setAlert({ message: "End time must be after start time", type: "danger" });
      return;
    }

    const newAppointment = { date, startTime, endTime, day: selectedDate.toLocaleDateString('en-US', { weekday: 'long' }), available: true };

    try {
      const response =  axios.post("https://retoolapi.dev/UKuH6Q/doctorappointment", newAppointment);
      setAppointments([...appointments, response.data]);
      setAlert({ message: "Appointment added successfully", type: "success" });
      setDate("");
      setStartTime("");
      setEndTime("");
      setTimeout(() => setAlert({ message: "", type: "" }), 3000);
    } catch (error) {
      setAlert({ message: "Error adding appointment", type: "danger" });
      console.error("Error:", error);
    }
  };

  const handleDeleteAppointment =  (id) => {
    try {
       axios.delete(`https://retoolapi.dev/UKuH6Q/doctorappointment/${id}`);
      setAppointments(appointments.filter((appt) => appt.id !== id));
      setConfirmBox({ show: false, appointmentId: null });
      setAlert({ message: "Appointment deleted successfully", type: "success" });
      setTimeout(() => setAlert({ message: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-primary">Clinic Appointments</h2>

      {alert.message && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert({ message: "", type: "" })}></button>
        </div>
      )}

      <div className="card p-3 mb-4">
        <h5>Add New Appointment</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Start Time</label>
            <input type="time" className="form-control" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label">End Time</label>
            <input type="time" className="form-control" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button className="btn btn-primary w-100" onClick={handleAddAppointment}>Add</button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Day</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.id}</td>
                <td>{appt.day}</td>
                <td>{appt.startTime}</td>
                <td>{appt.endTime}</td>
                <td>{appt.date}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => setConfirmBox({ show: true, appointmentId: appt.id })}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirmBox.show && (
        <div className="position-fixed top-50 start-50 translate-middle p-4 bg-white border rounded shadow" style={{ zIndex: 1050, minWidth: "300px" }}>
          <p className="fw-bold">Are you sure you want to delete this appointment?</p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-secondary me-2" onClick={() => setConfirmBox({ show: false, appointmentId: null })}>Cancel</button>
            <button className="btn btn-danger" onClick={() => handleDeleteAppointment(confirmBox.appointmentId)}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorAppointments;
