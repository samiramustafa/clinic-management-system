import axios from "axios";
import React, { useEffect, useState } from "react";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [confirmBox, setConfirmBox] = useState({ show: false, appointmentId: null });
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAuthData = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        setIsAuthenticated(true);
        const userResponse = await axios.get(
          "http://127.0.0.1:8000/api/users/me/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const userId = userResponse.data.id;

        const doctorResponse = await axios.get(
          "http://127.0.0.1:8000/api/doctors/",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const doctorData = doctorResponse.data.find(
          (doctor) => doctor.user === userId
        );

        if (doctorData) {
          setUserData(doctorData);
          setCurrentUser(doctorData.id);
        } else {
          console.log("No doctor found for this user.");
        }
      } catch (error) {
        console.error("Error fetching auth data:", error);
      }
    };

    fetchAuthData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`http://127.0.0.1:8000/api/available-times/?doctor_id=${currentUser}`)
        .then((response) => {
          // Ensure each appointment has a day field
          const formattedAppointments = response.data.map(appt => ({
            ...appt,
            day: appt.day || new Date(appt.date).toLocaleDateString('en-US', { weekday: 'long' })
          }));
          setAppointments(formattedAppointments);
          console.log("Appointments:", formattedAppointments);
        })
        .catch((error) => console.error("Error fetching appointments:", error));
    }
  }, [currentUser]);

  const handleAddAppointment = async () => {
    if (!date || !startTime || !endTime) {
      setAlert({ message: "Please fill in all fields", type: "warning" });
      setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 3000);
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setAlert({ message: "Cannot select a past date", type: "danger" });
      setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 3000);
      return;
    }

    if (endTime <= startTime) {
      setAlert({ message: "End time must be after start time", type: "danger" });
      setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 3000);
      return;
    }

    const newAppointment = {
      date,
      start_time: startTime,
      end_time: endTime,
      day: selectedDate.toLocaleDateString('en-US', { weekday: 'long' }), // Include day
      doctor: currentUser
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/available-times/",
        newAppointment,
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      );

      // Ensure the new appointment has all fields
      const newApptWithDay = {
        ...response.data,
        day: response.data.day || new Date(response.data.date).toLocaleDateString('en-US', { weekday: 'long' })
      };

      setAppointments([...appointments, newApptWithDay]);
      setAlert({ message: "Appointment added successfully", type: "success" });
      setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 3000);
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      setAlert({ message: "Error adding appointment", type: "danger" });
      console.error("Error:", error.response?.data || error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/available-times/${id}/`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      );
      setAppointments(appointments.filter((appt) => appt.id !== id));
      setAlert({ message: "Appointment deleted successfully", type: "" });
      setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 3000);
      setConfirmBox({ show: false, appointmentId: null });
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-primary">
        <i className="bi bi-building-add"></i> Add New Appointment
      </h2>

      {alert.message && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlert({ message: "", type: "" })}
          ></button>
        </div>
      )}

      <div className="card p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Start Time</label>
            <input
              type="time"
              className="form-control"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">End Time</label>
            <input
              type="time"
              className="form-control"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button
              className="btn btn-primary w-100"
              onClick={handleAddAppointment}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <h2 className="mb-3 text-primary">
          <i className="bi bi-table"></i> Appointments
        </h2>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
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
                <td>{appt.day || new Date(appt.date).toLocaleDateString('en-US', { weekday: 'long' })}</td>
                <td>{appt.start_time}</td>
                <td>{appt.end_time}</td>
                <td>{appt.date}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => setConfirmBox({ show: true, appointmentId: appt.id })}
                  >
                    Delete
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
          <p className="fw-bold">Are you sure you want to delete this appointment?</p>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-secondary me-2"
              onClick={() => setConfirmBox({ show: false, appointmentId: null })}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteAppointment(confirmBox.appointmentId)}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorAppointments;