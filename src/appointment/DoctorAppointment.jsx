//nasser 9april
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
  const [currentUserDoctorId, setCurrentUserDoctorId] = useState(null);

  useEffect(() => {
    const fetchDoctorId = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.log("No token found, user not logged in.");
        return;
      }
      try {
        const userResponse = await axios.get(
          "http://127.0.0.1:8000/api/users/me/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const userId = userResponse.data.id;

        const doctorsResponse = await axios.get(
          "http://127.0.0.1:8000/api/doctors/",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const linkedDoctor = doctorsResponse.data.find(
          (doctor) => doctor.user === userId
        );

        if (linkedDoctor) {
          setCurrentUserDoctorId(linkedDoctor.id);
          setUserData(linkedDoctor);
          console.log("Doctor ID found:", linkedDoctor.id);
        } else {
          console.log("No doctor profile found linked to this user account.");
          setAlert({ message: "No doctor profile associated with this account.", type: "warning" });
        }
      } catch (error) {
        console.error("Error fetching doctor ID:", error);
        setAlert({ message: "Error fetching user or doctor data.", type: "danger" });
      }
    };
    fetchDoctorId();
  }, []);

  useEffect(() => {
    if (currentUserDoctorId) {
      axios
        .get(`http://127.0.0.1:8000/api/available-times/?doctor_id=${currentUserDoctorId}`)
        .then((response) => {
          const now = new Date();
          const futureAppointments = response.data.filter(appt => {
            try {
                const timeString = appt.end_time.includes(':') ? appt.end_time : `${appt.end_time}:00`;
                const appointmentEndDateTime = new Date(`${appt.date}T${timeString}`);

                if (isNaN(appointmentEndDateTime.getTime())) {
                   console.warn("Invalid date/time format for appointment:", appt);
                   return false;
                }
                return appointmentEndDateTime > now;
            } catch (e) {
               console.error("Error parsing date/time for filtering:", appt, e);
               return false;
            }
          });

          const formattedAndFilteredAppointments = futureAppointments.map(appt => ({
            ...appt,
            day: appt.day || new Date(appt.date).toLocaleDateString('en-US', { weekday: 'long' })
          }));

          setAppointments(formattedAndFilteredAppointments);
          console.log("Fetched and filtered future available times:", formattedAndFilteredAppointments);
        })
        .catch((error) => console.error("Error fetching available times:", error));
    } else {
       setAppointments([]);
    }
  }, [currentUserDoctorId]);

  const handleAddAppointment = async () => {
    if (!date || !startTime || !endTime) {
      setAlert({ message: "Please fill in date, start time, and end time", type: "warning" });
      setTimeout(() => setAlert({ message: "", type: "" }), 3000);
      return;
    }

    const now = new Date();
    const selectedDateObj = new Date(date);
    const appointmentStartDateTime = new Date(`${date}T${startTime}`);

    now.setHours(0, 0, 0, 0);
    selectedDateObj.setHours(0, 0, 0, 0);

    if (selectedDateObj < now) {
      setAlert({ message: "Cannot select a past date", type: "danger" });
      setTimeout(() => setAlert({ message: "", type: "" }), 3000);
      return;
    }

    if (selectedDateObj.getTime() === now.getTime()) {
        const rightNow = new Date();
        if (appointmentStartDateTime < rightNow) {
            setAlert({ message: "Cannot select a start time that has already passed today", type: "danger" });
            setTimeout(() => setAlert({ message: "", type: "" }), 3000);
            return;
        }
    }

    if (endTime <= startTime) {
      setAlert({ message: "End time must be after start time", type: "danger" });
      setTimeout(() => setAlert({ message: "", type: "" }), 3000);
      return;
    }

    const newAppointment = {
      date,
      start_time: startTime,
      end_time: endTime,
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'long' }),
      doctor: currentUserDoctorId
    };

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/available-times/",
        newAppointment,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Check if the newly added appointment is in the future before adding to state
      const newApptEndDateTime = new Date(`${response.data.date}T${response.data.end_time}`);
      if (newApptEndDateTime > new Date()) {
          const newApptWithDay = {
            ...response.data,
            day: response.data.day || new Date(response.data.date).toLocaleDateString('en-US', { weekday: 'long' })
          };
          // Add to the existing list (which should already be filtered)
          setAppointments(prevAppointments => [...prevAppointments, newApptWithDay]);
      }

      setAlert({ message: "Available time added successfully", type: "success" });
      setTimeout(() => setAlert({ message: "", type: "" }), 3000);
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Error adding available time. Please check for conflicts or try again.";
      setAlert({ message: errorMsg, type: "danger" });
      console.error("Error adding available time:", error.response?.data || error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(
        `http://127.0.0.1:8000/api/available-times/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments(appointments.filter((appt) => appt.id !== id));
      setAlert({ message: "Available time deleted successfully", type: "info" });
      setTimeout(() => setAlert({ message: "", type: "" }), 3000);
      setConfirmBox({ show: false, appointmentId: null });
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Error deleting available time.";
      setAlert({ message: errorMsg, type: "danger" });
      console.error("Error deleting available time:", error.response?.data || error);
      setConfirmBox({ show: false, appointmentId: null });
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">
             <h3 className="mb-0"> <i className="far fa-calendar-plus me-2"></i> Add Available Time Slot</h3>
          </div>
          <div className="card-body">
            {alert.message && (
                <div className={`alert alert-${alert.type || 'info'} alert-dismissible fade show`} role="alert">
                {alert.message}
                <button
                    type="button"
                    className="btn-close"
                    onClick={() => setAlert({ message: "", type: "" })}
                    aria-label="Close"
                ></button>
                </div>
            )}

            <div className="row g-3 align-items-end">
                <div className="col-md-4 col-lg-3">
                <label htmlFor="appt-date" className="form-label fw-bold">Date</label>
                <input
                    type="date"
                    id="appt-date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                />
                </div>
                <div className="col-md-3 col-lg-3">
                <label htmlFor="appt-start-time" className="form-label fw-bold">Start Time</label>
                <input
                    type="time"
                    id="appt-start-time"
                    className="form-control"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    step="1800"
                />
                </div>
                <div className="col-md-3 col-lg-3">
                <label htmlFor="appt-end-time" className="form-label fw-bold">End Time</label>
                <input
                    type="time"
                    id="appt-end-time"
                    className="form-control"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    step="1800"
                />
                </div>
                <div className="col-md-2 col-lg-3">
                <button
                    className="btn btn-primary w-100"
                    onClick={handleAddAppointment}
                    disabled={!currentUserDoctorId}
                >
                     <i className="fas fa-plus me-1"></i> Add Slot
                </button>
                </div>
            </div>
           </div>
      </div>


      <div className="card shadow-sm">
        <div className="card-header bg-light">
             <h3 className="mb-0 text-dark"><i className="far fa-calendar-alt me-2"></i> Current Available Times</h3>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
              <table className="table table-hover mb-0">
              <thead className="table-light">
                  <tr>
                  <th className="text-secondary">Day</th>
                  <th className="text-secondary">Start Time</th>
                  <th className="text-secondary">End Time</th>
                  <th className="text-secondary">Date</th>
                  <th className="text-secondary text-center">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {appointments.length === 0 && !currentUserDoctorId && (
                      <tr><td colSpan="5" className="text-center text-muted p-4">Loading doctor data...</td></tr>
                  )}
                   {appointments.length === 0 && currentUserDoctorId && (
                      <tr><td colSpan="5" className="text-center text-muted p-4">No future available times found.</td></tr>
                  )}
                  {appointments.map((appt) => (
                  <tr key={appt.id}>
                      <td>{appt.day || new Date(appt.date).toLocaleDateString('en-US', { weekday: 'long' })}</td>
                      <td>{new Date(`1970-01-01T${appt.start_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                      <td>{new Date(`1970-01-01T${appt.end_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                      <td>{new Date(appt.date).toLocaleDateString()}</td>
                      <td className="text-center">
                      <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setConfirmBox({ show: true, appointmentId: appt.id })}
                          aria-label={`Delete slot on ${appt.date} from ${appt.start_time} to ${appt.end_time}`}
                      >
                         <i className="fas fa-trash-alt"></i>
                      </button>
                      </td>
                  </tr>
                  ))}
              </tbody>
              </table>
          </div>
         </div>
      </div>

      {confirmBox.show && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ zIndex: 1050 }}
            aria-modal="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Deletion</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setConfirmBox({ show: false, appointmentId: null })}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this available time slot?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setConfirmBox({ show: false, appointmentId: null })}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteAppointment(confirmBox.appointmentId)}
                  >
                    Delete Slot
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DoctorAppointments;