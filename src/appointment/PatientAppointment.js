
import React, { useState, useEffect } from "react";
import axios from "axios";

function Appointments() {
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 4;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);


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

        const patientResponse = await axios.get(
          "http://127.0.0.1:8000/api/patients/",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const patientData = patientResponse.data.find(
          (patient) => patient.user === userId
        );

        if (patientData) {
          // setUserData(patientData);
          setCurrentUser(patientData.id); // Set currentUser here
          console.log("Patient ID:", patientData.id);
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
      .get(`http://127.0.0.1:8000/api/appointments/?patient_id=${currentUser}`)
      .then((response) => {
        const appointments = response.data
        setBookedAppointments(appointments);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, [currentUser]);


  const handleCancel = async () => {
    if (!selectedAppointment) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/appointments/${selectedAppointment}/`);
      const updatedAppointments = bookedAppointments.filter(
        (appointment) => appointment.id !== selectedAppointment
      );
      setBookedAppointments(updatedAppointments);
      setSelectedAppointment(null);
      
      // Adjust current page if necessary
      const totalPages = Math.ceil(updatedAppointments.length / appointmentsPerPage);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages || 1);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      setError("Failed to cancel appointment. Please try again.");
    }
  };

  // Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = bookedAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );
  const totalPages = Math.ceil(bookedAppointments.length / appointmentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center fw-bold fs-4 text-primary">
        <i className="fas fa-calendar-check"></i> Booked Appointments
      </h2>

      {loading && <p className="text-center">Loading appointments...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && !error && (
        <>
          {bookedAppointments.length === 0 ? (
            <p className="text-center">No appointments booked.</p>
          ) : (
            <>
              <div className="row g-3">
                {currentAppointments.map((appointment) => (
                  <div key={appointment.id} className="col-md-6">
                    <div className="card shadow-sm border-primary rounded">
                      <div className="card-body">
                        <h4 className="card-title text-primary">
                          <i className="bi bi-person-circle text-primary"></i> {appointment.patient_name}
                        </h4>
                        <p className="card-text fs-5">
                          <strong><i className="bi bi-telephone-plus-fill text-primary"></i> Phone:</strong> {appointment.phone_number} <br />
                          <strong><i className="fas fa-user-md fw-bold fs-4 text-primary"></i> Doctor:</strong> {appointment.doctor_name} <br />
                          <strong><i className="bi bi-calendar2-month-fill text-primary"></i> Date:</strong> {appointment.date} <br />
                          <strong><i className="bi bi-alarm text-primary"></i> Time:</strong>{" "}
                          {appointment.time_range || "N/A"} <br />
                          <h5 className="card-text fs-5">
                            <i className="bi bi-check-circle-fill text-primary"></i> Status:
                            <span className="text-info fs-3">{appointment.status}</span>
                          </h5>
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

              {/* Pagination Controls */}
              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => paginate(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li 
                      key={index + 1} 
                      className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                      <button 
                        className="page-link" 
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => paginate(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}

          <div
            className="modal fade"
            id="cancelModal"
            tabIndex="-1"
            aria-labelledby="cancelModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="cancelModalLabel">
                    Confirm Cancellation
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to cancel this appointment?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    No
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={handleCancel}
                  >
                    Yes, Cancel
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

export default Appointments;