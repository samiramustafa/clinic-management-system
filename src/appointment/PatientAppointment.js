

// import React, { useContext, useState } from "react";
// import AppointmentContext from "../appointment/Appoint"; 

// function Appointments() {
//   const { bookedAppointments = [], setBookedAppointments } = useContext(AppointmentContext);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   const handleCancel = () => {
//     const updatedAppointments = bookedAppointments.filter((appointment) => appointment.id !== selectedAppointment);
//     setBookedAppointments(updatedAppointments);
//     setSelectedAppointment(null); 
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-3 text-center fw-bold fs-4 text-primary">
//         <i className="fas fa-calendar-check"></i> Booked Appointments
//       </h2>

//       {bookedAppointments.length === 0 ? (
//         <p className="text-center">No appointments booked.</p>
//       ) : (
//         <div className="row g-3"> 
//           {bookedAppointments.map((appointment) => (
//             <div key={appointment.id} className="col-md-6">
//               <div className="card shadow-sm border-primary rounded">
//                 <div className="card-body">
//                   <h5 className="card-title text-primary">{appointment.patientName}</h5>
//                   <p className="card-text fs-5">
//                     <strong>📞 Phone:</strong> {appointment.patientPhone} <br />
//                     <strong>📅 Date:</strong> {appointment.day.name}, {appointment.day.date} <br />
//                     <strong>⏰ Time:</strong> {appointment.time} <br />
//                     <small className="text-muted">📌 Booked at: {appointment.bookedAt}</small>
//                   </p>
//                   <button 
//                     className="btn btn-danger w-100 fs-5" 
//                     onClick={() => setSelectedAppointment(appointment.id)}
//                     data-bs-toggle="modal"
//                     data-bs-target="#cancelModal"
//                   >
//                     Cancel 
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

     
//       <div className="modal fade" id="cancelModal"  tabIndex="-1" aria-labelledby="cancelModalLabel" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="cancelModalLabel">Confirm Cancellation</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               Are you sure you want to cancel this appointment?
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
//               <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleCancel}>Yes, Cancel</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Appointments;

import React from "react";

function PatientAppointment({ appointments }) { // استقبل الـ appointments كـ prop
  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center fw-bold fs-4 text-primary">
        <i className="fas fa-calendar-check"></i> Booked Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center">No appointments booked.</p>
      ) : (
        <div className="row g-3">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="col-md-6">
              <div className="card shadow-sm border-primary rounded">
                <div className="card-body">
                  <h5 className="card-title text-primary">Patient ID: {appointment.patient}</h5> {/* هنعرض الـ patient ID */}
                  <p className="card-text fs-5">
                    <strong>📅 Date:</strong> {appointment.date} <br /> {/* هنعرض الـ date */}
                    <strong>⏰ Time:</strong> {appointment.time_range} <br /> {/* هنعرض الـ time_range */}
                    <strong>Status:</strong> {appointment.status} {/* هنعرض الـ status */}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientAppointment;