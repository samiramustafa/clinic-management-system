import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/appointments/');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const existingAppointment = appointments.find(app => app.id === id);
  
      await axios.put(`http://127.0.0.1:8000/api/appointments/${id}/`, {
        patient: existingAppointment.patient,
        doctor: existingAppointment.doctor,
        available_time: existingAppointment.available_time,
        phone_number: existingAppointment.phone_number,
        status: newStatus
      });
  
      // ✅ بدل ما تعملي fetch، عدلي الحالة (state) مباشرة
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: newStatus }
          : appointment
      );
  
      setAppointments(updatedAppointments);
  
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="container p-4">
      <h2 className="mb-4 ">Patient Appointments</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading data...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Patient Name</th>
                <th scope="col">Doctor</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.patient_name}</td>
                  <td>{appointment.doctor_name}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time_range}</td>
                  <td>{appointment.phone_number}</td>
                  <td className="text-capitalize">{appointment.status}</td>
                 
                  <td>
  <div className="d-flex gap-2 justify-content-center">
    {appointment.status === 'pending' ? (
      <>
        <button
          className="btn btn-success"
          onClick={(e) => {
            e.preventDefault();
            updateStatus(appointment.id, 'accepted')}

          }
          
        >
          Accept
        </button>
        <button
          className="btn btn-danger"
          onClick={(e) => 
            {            e.preventDefault();
              updateStatus(appointment.id, 'rejected')}}
        >
          Reject
        </button>
      </>
    ) : (
      <button
        className={`btn ${appointment.status === 'accepted' ? 'btn-danger' : 'btn-success'}`}
        onClick={() => {
          const newStatus = appointment.status === 'accepted' ? 'rejected' : 'accepted';
          updateStatus(appointment.id, newStatus);
        }}
      >
        {appointment.status === 'accepted' ? 'Reject' : 'Accept'}
      </button>
    )}
  </div>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentsTable;
