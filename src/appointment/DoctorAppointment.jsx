
import axios from "axios";
import React, { useEffect, useState } from "react";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [confirmBox, setConfirmBox] = useState({ show: false, appointment: null });

  useEffect(() => {
    axios
      .get("https://retoolapi.dev/UKuH6Q/doctorappointment")
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handleToggleAvailability =  (appointment) => {
    if (appointment.available) {
      setConfirmBox({ show: true, appointment });
    } else {
      updateAvailability(appointment);
    }
  };

  const updateAvailability = (appointment) => {
    const { id, available } = appointment;
    const updatedStatus = !available;

    try {
      // Update API
       axios.patch(`https://retoolapi.dev/UKuH6Q/doctorappointment/${id}`, {
        available: updatedStatus,
      });

      // Update UI
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === id ? { ...appt, available: updatedStatus } : appt
        )
      );

      // Show success alert
      setAlert({
        message: updatedStatus ? "Appointment activated " : "Appointment deactivated ",
        type: updatedStatus ? "success" : "danger",
      });

      // Hide alert after 3 seconds
      setTimeout(() => setAlert({ message: "", type: "" }), 3000);
    } catch (error) {
      setAlert({ message: "An error occurred while updating ", type: "danger" });
      console.error("Error updating appointment:", error);
    }

    // Close confirmation box
    setConfirmBox({ show: false, appointment: null });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">
  <i className="bi bi-calendar-check me-2 text-primary"></i> Clinic Appointments
</h2>

      {alert.message && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert({ message: "", type: "" })}></button>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>No.</th>
              <th>Date </th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.id}</td>
                <td>{appt.date}</td>
                <td>{appt.time} PM</td>
                <td>
                <span className={`badge ${appt.available ? "bg-success" : "bg-danger"} w-100 text-center p-2`}>
                    {appt.available ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                <button
                    className="btn btn-sm btn-warning w-100"
                    style={{ minWidth: "120px" }}
                    onClick={() => handleToggleAvailability(appt)}
                  >
                    {appt.available ? "Mark Inactive" : "Mark Active"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirmBox.show && (
        <div
          className="position-fixed top-50 start-50 translate-middle p-4 bg-white border rounded shadow"
          style={{ zIndex: 1050, minWidth: "300px" }}
        >
          <p className="fw-bold">Are you sure you want to deactivate this appointment?</p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-secondary me-2" onClick={() => setConfirmBox({ show: false, appointment: null })}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={() => updateAvailability(confirmBox.appointment)}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorAppointments;

