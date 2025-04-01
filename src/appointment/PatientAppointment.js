
import React, { useState, useEffect } from "react";
import axios from "axios";

function Appointments() {
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/clinic/appointments/")
      .then((response) => {
        setBookedAppointments(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCancel = () => {
    if (!selectedAppointment) return;

    const updatedAppointments = bookedAppointments.filter(
      (appointment) => appointment.id !== selectedAppointment
    );
    setBookedAppointments(updatedAppointments);
    setSelectedAppointment(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center fw-bold fs-4 text-primary">
        <i className="fas fa-calendar-check"></i> Booked Appointments
      </h2>

      {/* Show loading state */}
      {loading && <p className="text-center">Loading appointments...</p>}

      {/* Show error message if fetching fails */}
      {error && <p className="text-center text-danger">{error}</p>}

      {/* Show appointments only if loading is done and there's no error */}
      {!loading && !error && (
        <>
          {bookedAppointments.length === 0 ? (
            <p className="text-center">No appointments booked.</p>
          ) : (
            <div className="row g-3">
              {bookedAppointments.map((appointment) => (
                <div key={appointment.id} className="col-md-6">
                  <div className="card shadow-sm border-primary rounded">
                    <div className="card-body">
                      <h4 className="card-title text-primary"><i class="bi bi-person-circle text-primary"></i> {appointment.patient_name}</h4>
                      <p className="card-text fs-5">
                        <strong><i class="bi bi-telephone-plus-fill text-primary" ></i> Phone:</strong> {appointment.phone_number} <br />
                        <strong> <i className="fas fa-user-md  fw-bold fs-4 text-primary"></i>  Doctor:</strong> {appointment.doctor_name} <br />
                        <strong><i class="bi bi-calendar2-month-fill text-primary" ></i> Date:</strong> {appointment.date} <br />

                        <strong><i class="bi bi-alarm text-primary" ></i> Time:</strong>{" "}
                        {appointment.time_range || "N/A"} {" "}
                        <br />
                        <h5 className="card-text fs-5">
                        <i className="bi bi-check-circle-fill text-primary" ></i> Status: <span className="text-info fs-3">{appointment.status}</span>
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
          )}

          {/* Cancel Modal */}
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
                <div className="modal-body">Are you sure you want to cancel this appointment?</div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
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
