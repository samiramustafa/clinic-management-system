



// import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
// import { Modal } from "bootstrap";
// import AppointmentContext from "../pages/AppointmentContext";

// function Appoint() {
//   const history = useHistory();
//   const { bookedAppointments, setBookedAppointments } = useContext(AppointmentContext);

//   const days = [
//     { name: "MON", date: 10 },
//     { name: "TUE", date: 11 },
//     { name: "WED", date: 12 },
//     { name: "THU", date: 13 },
//     { name: "FRI", date: 14 },
//     { name: "SAT", date: 15 },
//     { name: "SUN", date: 16 },
//   ];

//   const timeSlots = [
//     "8:00 am", "8:30 am", "9:00 am", "9:30 am",
//     "10:00 am", "10:30 am", "11:00 am", "11:30 am",
//     "12:00 pm", "12:30 pm", "1:00 pm", "1:30 pm",
//     "2:00 pm", "2:30 pm", "3:00 pm", "3:30 pm"
//   ];

//   const [selectedDay, setSelectedDay] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [patientName, setPatientName] = useState("");
//   const [patientPhone, setPatientPhone] = useState("");
//   const [formErrors, setFormErrors] = useState({});
//   const [alertMessage, setAlertMessage] = useState(null);
//   const [alertType, setAlertType] = useState("");
//   const [modal, setModal] = useState(null);

//   const showAlert = (message, type) => {
//     setAlertMessage(message);
//     setAlertType(type);
//     setTimeout(() => setAlertMessage(null), 3000);
//   };

//   const validateForm = () => {
//     let errors = {};
//     if (!patientName.trim()) {
//       errors.patientName = "Patient name is required";
//     }
//     if (!patientPhone.trim()) {
//       errors.patientPhone = "Patient phone is required";
//     } else if (!/^\d{10,15}$/.test(patientPhone)) {
//       errors.patientPhone = "Phone number must be between 10-15 digits";
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleDaySelect = (day) => {
//     setSelectedDay(day);
//     setSelectedTime(null);
//   };

//   const handleTimeSelect = (time) => {
//     if (selectedDay) {
//       setSelectedTime(time);
//     }
//   };

//   const handleBookAppointment = () => {
//     if (!selectedDay || !selectedTime) {
//       showAlert("Please select a day and time before booking.", "warning");
//       return;
//     }

//     const modalElement = document.getElementById("bookingModal");
//     const newModal = new Modal(modalElement);
//     setModal(newModal);
//     newModal.show();
//   };

//   const handleConfirmBooking = () => {
//     if (!validateForm()) {
//       return;
//     }

//     const newAppointment = {
//       id: Date.now(),
//       day: selectedDay,
//       time: selectedTime,
//       patientName,
//       patientPhone,
//       bookedAt: new Date().toLocaleString(),
//     };

//     setBookedAppointments([...bookedAppointments, newAppointment]);
//     localStorage.setItem("bookedAppointments", JSON.stringify([...bookedAppointments, newAppointment]));

//     setSelectedDay(null);
//     setSelectedTime(null);
//     setPatientName("");
//     setPatientPhone("");

//     showAlert("Appointment booked successfully!", "success");

//     if (modal) modal.hide();
//     history.push("/patient-appointment");
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Booking Slots</h2>

//       {/* Alert Messages */}
//       {alertMessage && (
//         <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
//           {alertMessage}
//         </div>
//       )}

//       <div className="days d-flex">
//         {days.map((day, index) => (
//           <button
//             key={index}
//             className={`btn btn-outline-primary m-1 ${selectedDay?.date === day.date ? "active" : ""}`}
//             onClick={() => handleDaySelect(day)}
//           >
//             {day.name} {day.date}
//           </button>
//         ))}
//       </div>

//       <div className="time-slots mt-3 py-3 d-flex flex-nowrap overflow-auto justify-content-start ps-3" style={{ maxWidth: "100%" }}>
//         {timeSlots.map((slot, index) => (
//           <button
//             key={index}
//             className={`btn m-1 mx-2 btn-outline-secondary ${selectedTime === slot ? "active" : ""}`}
//             onClick={() => handleTimeSelect(slot)}
//           >
//             {slot}
//           </button>
//         ))}
//       </div>

//       <button className="btn btn-primary mt-3" onClick={handleBookAppointment}>
//         Book an appointment
//       </button>

//       {/* Modal لتأكيد الحجز مع إدخال البيانات */}
//       <div className="modal fade" id="bookingModal" tabIndex="-1">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Confirm Appointment</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
//             </div>
//             <div className="modal-body">
//               <p><strong>Selected Day:</strong> {selectedDay?.name} {selectedDay?.date}</p>
//               <p><strong>Selected Time:</strong> {selectedTime}</p>

//               <form>
//                 <div className="mb-3">
//                   <label className="form-label">Patient Name</label>
//                   <input
//                     type="text"
//                     className={`form-control ${formErrors.patientName ? "is-invalid" : ""}`}
//                     value={patientName}
//                     onChange={(e) => setPatientName(e.target.value)}
//                   />
//                   <div className="invalid-feedback">{formErrors.patientName}</div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Patient Phone</label>
//                   <input
//                     type="text"
//                     className={`form-control ${formErrors.patientPhone ? "is-invalid" : ""}`}
//                     value={patientPhone}
//                     onChange={(e) => setPatientPhone(e.target.value)}
//                   />
//                   <div className="invalid-feedback">{formErrors.patientPhone}</div>
//                 </div>
//               </form>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
//                 Cancel
//               </button>
//               <button type="button" className="btn btn-primary" onClick={handleConfirmBooking}>
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Appoint;




//=============================================================




// import React, { useState, useContext, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import DayCard from "./daycard"
// import AppointmentContext from "../appointment/AppointmentContext";



// function Appoint() {
//   const days = [
//     { name: "MON", date: 10 },
//     { name: "TUE", date: 11 },
//     { name: "WED", date: 12 },
//     { name: "THU", date: 13 },
//     { name: "FRI", date: 14 },
//     { name: "SAT", date: 15 },
//     { name: "SUN", date: 16 },
//   ];

//   const timeSlots = [
//     "8:00 am", "9:00 am", "10:00 am", "11:00 am",
//     "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm"
//   ];
//   const { bookedAppointments, setBookedAppointments } = useContext(AppointmentContext);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [patientName, setPatientName] = useState("");
//   const [patientPhone, setPatientPhone] = useState("");
//   // const [bookedAppointments, setBookedAppointments] = useState([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [formErrors, setFormErrors] = useState({});



//   const validateForm = () => {
//     let errors = {};
//     if (!patientName.trim()) {
//       errors.patientName = "Patient name is required";
//     }
//     if (!patientPhone.trim()) {
//       errors.patientPhone = "Patient phone is required";
//     } else if (!/^\d{10,15}$/.test(patientPhone)) {
//       errors.patientPhone = "Phone number must be between 10-15 digits";
//     }


//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };


//   const handleBookAppointment = () => {
//     if (!selectedDay || !selectedTime) {
//       alert("Please select a time slot."); 
//       return;
//     }

//     if (!validateForm()) {
//       return;
//     }

//     const newAppointment = {
//       id: Date.now(),
//       day: selectedDay,
//       time: selectedTime,
//       patientName,
//       patientPhone,
//       bookedAt: new Date().toLocaleString(),
//     };

//     setBookedAppointments([...bookedAppointments, newAppointment]);
//     setShowToast(true);
//     setShowConfirm(false);


//     setSelectedDay(null);
//     setSelectedTime(null);
//     setPatientName("");
//     setPatientPhone("");
//     setFormErrors({});
//   };



//   const handleCloseConfirm = () => {
//     setShowConfirm(false);
//     setFormErrors({}); 
//   }

//   const [activeIndex, setActiveIndex] = useState(0);
//   const totalSlides = Math.ceil(days.length / 3); 


//   useEffect(() => {
//     const carousel = document.getElementById("dayCarousel");

//     const handleSlide = (event) => {
//       setActiveIndex(event.to);
//     };

//     carousel.addEventListener("slide.bs.carousel", handleSlide);

//     return () => {
//       carousel.removeEventListener("slide.bs.carousel", handleSlide);
//     };
//   }, []);

//   useEffect(() => {
//     if (showToast) {
//       const timer = setTimeout(() => {
//         setShowToast(false);
//       }, 2000); 
  
//       return () => clearTimeout(timer); 
//     }
//   }, [showToast]);

//   return (
//     <div className="container mt-4">
//       <h2 className=" mb-4 fw-bold fs-3 text-info"><i class="fas fa-calendar-check"></i> Doctor Appointment Booking</h2>


//       <div id="dayCarousel" className="carousel slide mx-auto rounded shadow" style={{ maxWidth: "90%" }}>


//         <div className="carousel-inner">
//           {Array.from({ length: totalSlides }).map((_, i) => (
//             <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={i}>
//               <div className="row justify-content-center">
//                 {days.slice(i * 3, i * 3 + 3).map((day) => (
//                   <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
//                     <DayCard
//                       key={day.date}
//                       day={day}
//                       selectedDay={selectedDay}
//                       selectedTime={selectedTime}
//                       setSelectedDay={setSelectedDay}
//                       setSelectedTime={setSelectedTime}
//                       timeSlots={timeSlots}
//                       bookedAppointments={bookedAppointments}
//                       setShowConfirm={setShowConfirm}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#dayCarousel"
//           data-bs-slide="prev"
//           disabled={activeIndex === 0} 
//         >
//           <span className="carousel-control-prev-icon" aria-hidden="true" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></span>
//           <span className="visually-hidden">Previous</span>
//         </button>


//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#dayCarousel"
//           data-bs-slide="next"
//           disabled={activeIndex === totalSlides - 1} 
//         >
//           <span className="carousel-control-next-icon" aria-hidden="true" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>

//       {showConfirm && selectedDay && selectedTime && (
//         <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Confirm Appointment</h5>
//                 <button type="button" className="btn-close" onClick={handleCloseConfirm} aria-label="Close"></button>
//               </div>
//               <div className="modal-body">
//                 <p>
//                   You are booking for <strong>{selectedDay.name} ({selectedDay.date})</strong> at <strong>{selectedTime}</strong>
//                 </p>

//                 <div className="mb-3">
//                   <label htmlFor="patientName" className="form-label">Patient Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="patientName"
//                     value={patientName}
//                     onChange={(e) => setPatientName(e.target.value)}
//                     placeholder="Enter patient name"
//                   />
//                   {formErrors.patientName && <div className="text-danger">{formErrors.patientName}</div>}
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="patientPhone" className="form-label">Patient Phone</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="patientPhone"
//                     value={patientPhone}
//                     onChange={(e) => setPatientPhone(e.target.value)}
//                     placeholder="Enter patient phone"
//                   />
//                   {formErrors.patientPhone && <div className="text-danger">{formErrors.patientPhone}</div>}
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={handleCloseConfirm}>
//                   Cancel
//                 </button>
//                 <button type="button" className="btn btn-success" onClick={handleBookAppointment}>
//                   Confirm Booking
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}


// {showToast && (
//   <div
//     className="alert alert-success alert-dismissible fade show position-fixed shadow"
//     role="alert"
//     style={{
//       zIndex: 1050,
//       top: "20%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       width: "50%",
//       textAlign: "center"
//     }}
//   >
//     Appointment Booked Successfully!
//     <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
//   </div>
// )}

//     </div>
//   );
// }






// export default Appoint;






// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";

// function AppointCarousel() {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/clinic/appointments/");
//         setAppointments(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//         setError("Failed to fetch appointments. Please try again.");
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   if (loading) {
//     return <p className="text-center text-info mt-5">Loading appointments...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-danger mt-5">{error}</p>;
//   }

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4 fw-bold text-center text-primary">
//         <i className="fas fa-calendar-check"></i> Doctor Appointments
//       </h2>

//       <div id="appointmentCarousel" className="carousel slide shadow-lg rounded" data-bs-ride="carousel">
//         <div className="carousel-inner">
//           {appointments.map((appointment, index) => (
//             <div key={appointment.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
//               <div className="d-flex flex-column align-items-center justify-content-center bg-light p-5 rounded shadow-sm text-center">
//                 <h3 className="text-primary fw-bold">{appointment.date}</h3>
//                 <p className="mb-2 fs-5">
//                   <strong>Time:</strong> {appointment.time_range}
//                 </p>
//                 <p className={`mb-0 fs-5 fw-semibold ${appointment.status === "Available" ? "text-success" : "text-danger"}`}>
//                   <strong>Status:</strong> {appointment.status}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* أزرار التنقل */}
//         <button className="carousel-control-prev" type="button" data-bs-target="#appointmentCarousel" data-bs-slide="prev">
//           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button className="carousel-control-next" type="button" data-bs-target="#appointmentCarousel" data-bs-slide="next">
//           <span className="carousel-control-next-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AppointCarousel;



// import React, { useState, useContext, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import DayCard from "./daycard"
// import AppointmentContext from "../appointment/AppointmentContext";



// function Appoint() {
// 
//   const { bookedAppointments, setBookedAppointments } = useContext(AppointmentContext);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [patientName, setPatientName] = useState("");
//   const [patientPhone, setPatientPhone] = useState("");
//   const [Appointments, setAppointments] = useState([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [formErrors, setFormErrors] = useState({});


// useEffect(() => {
//   const fetchAppointments = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/clinic/appointments/");
//       setAppointments(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//       setError("Failed to fetch appointments. Please try again.");
//       setLoading(false);
//     }
//   };

//   fetchAppointments();
// }, []);

//   const validateForm = () => {
//     let errors = {};
//     if (!patientName.trim()) {
//       errors.patientName = "Patient name is required";
//     }
//     if (!patientPhone.trim()) {
//       errors.patientPhone = "Patient phone is required";
//     } else if (!/^\d{10,15}$/.test(patientPhone)) {
//       errors.patientPhone = "Phone number must be between 10-15 digits";
//     }


//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };


//   const handleBookAppointment = () => {
//     if (!selectedDay || !selectedTime) {
//       alert("Please select a time slot."); 
//       return;
//     }

//     if (!validateForm()) {
//       return;
//     }

//     const newAppointment = {
//       id: Date.now(),
//       date: Appointments.date,
//       time_range: Appointments.time_range,
//       
//       patientName,
//       patientPhone,
//       bookedAt: new Date().toLocaleString(),
//     };

//     setBookedAppointments([...bookedAppointments, newAppointment]);
//     setShowToast(true);
//     setShowConfirm(false);


//     setSelectedDay(null);
//     setSelectedTime(null);
//     setPatientName("");
//     setPatientPhone("");
//     setFormErrors({});
//   };



//   const handleCloseConfirm = () => {
//     setShowConfirm(false);
//     setFormErrors({}); 
//   }

//   const [activeIndex, setActiveIndex] = useState(0);
//   const totalSlides = Math.ceil(days.length / 3); 


//   useEffect(() => {
//     const carousel = document.getElementById("dayCarousel");

//     const handleSlide = (event) => {
//       setActiveIndex(event.to);
//     };

//     carousel.addEventListener("slide.bs.carousel", handleSlide);

//     return () => {
//       carousel.removeEventListener("slide.bs.carousel", handleSlide);
//     };
//   }, []);

//   useEffect(() => {
//     if (showToast) {
//       const timer = setTimeout(() => {
//         setShowToast(false);
//       }, 2000); 
  
//       return () => clearTimeout(timer); 
//     }
//   }, [showToast]);

//   return (
//     <div className="container mt-4">
//       <h2 className=" mb-4 fw-bold fs-3 text-info"><i class="fas fa-calendar-check"></i> Doctor Appointment Booking</h2>


//       <div id="dayCarousel" className="carousel slide mx-auto rounded shadow" style={{ maxWidth: "90%" }}>


//         <div className="carousel-inner">
//           {Array.from({ length: totalSlides }).map((_, i) => (
//             <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={i}>
//               <div className="row justify-content-center">
//                 {days.slice(i * 3, i * 3 + 3).map((day) => (
//                   <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
//                     <DayCard
//                       key={day.date}
//                       day={day}
//                       selectedDay={selectedDay}
//                       selectedTime={selectedTime}
//                       setSelectedDay={setSelectedDay}
//                       setSelectedTime={setSelectedTime}
//                       timeSlots={timeSlots}
//                       bookedAppointments={bookedAppointments}
//                       setShowConfirm={setShowConfirm}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#dayCarousel"
//           data-bs-slide="prev"
//           disabled={activeIndex === 0} 
//         >
//           <span className="carousel-control-prev-icon" aria-hidden="true" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></span>
//           <span className="visually-hidden">Previous</span>
//         </button>


//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#dayCarousel"
//           data-bs-slide="next"
//           disabled={activeIndex === totalSlides - 1} 
//         >
//           <span className="carousel-control-next-icon" aria-hidden="true" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>

//       {showConfirm && selectedDay && selectedTime && (
//         <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Confirm Appointment</h5>
//                 <button type="button" className="btn-close" onClick={handleCloseConfirm} aria-label="Close"></button>
//               </div>
//               <div className="modal-body">
//                 <p>
//                   You are booking for <strong>{selectedDay.name} ({selectedDay.date})</strong> at <strong>{selectedTime}</strong>
//                 </p>

//                 <div className="mb-3">
//                   <label htmlFor="patientName" className="form-label">Patient Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="patientName"
//                     value={patientName}
//                     onChange={(e) => setPatientName(e.target.value)}
//                     placeholder="Enter patient name"
//                   />
//                   {formErrors.patientName && <div className="text-danger">{formErrors.patientName}</div>}
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="patientPhone" className="form-label">Patient Phone</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="patientPhone"
//                     value={patientPhone}
//                     onChange={(e) => setPatientPhone(e.target.value)}
//                     placeholder="Enter patient phone"
//                   />
//                   {formErrors.patientPhone && <div className="text-danger">{formErrors.patientPhone}</div>}
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={handleCloseConfirm}>
//                   Cancel
//                 </button>
//                 <button type="button" className="btn btn-success" onClick={handleBookAppointment}>
//                   Confirm Booking
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}


// {showToast && (
//   <div
//     className="alert alert-success alert-dismissible fade show position-fixed shadow"
//     role="alert"
//     style={{
//       zIndex: 1050,
//       top: "20%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       width: "50%",
//       textAlign: "center"
//     }}
//   >
//     Appointment Booked Successfully!
//     <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
//   </div>
// )}

//     </div>
//   );
// }






// export default Appoint;






import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppointmentContext  from "../appointment/AppointmentContext";
import DayCard from "./daycard"
import {useParams } from "react-router-dom";

function Appoint() {
  const { bookedAppointments, setBookedAppointments } = useContext(AppointmentContext);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/clinic/available-times/`);
        setAppointments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to fetch appointments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const validateForm = () => {
    let errors = {};
    if (!patientName.trim()) {
      errors.patientName = "Patient name is required";
    }
    if (!patientPhone.trim()) {
      errors.patientPhone = "Patient phone is required";
    } else if (!/^\d{10,15}$/.test(patientPhone)) {
      errors.patientPhone = "Phone number must be between 10-15 digits";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBookAppointment = () => {
    if (!selectedDay || !selectedTime) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    const newAppointment = {
      id: Date.now(),
      date: selectedDay.date ,
      time_range: selectedTime,
      patientName,
      patientPhone,
      bookedAt: new Date().toLocaleString(),
    };

    setBookedAppointments([...bookedAppointments, newAppointment]);
    setShowToast(true);
    setShowConfirm(false);

    setSelectedDay(null);
    setSelectedTime(null);
    setPatientName("");
    setPatientPhone("");
    setFormErrors({});
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setFormErrors({});
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const days = appointments.map((appt) => ({ date: appt.day  }));
  const start_time = appointments.map((appt) => appt.start_time);
  const totalSlides = Math.ceil(days.length / 3);

  useEffect(() => {
    const carousel = document.getElementById("dayCarousel");

    if (carousel) {
      const handleSlide = (event) => {
        setActiveIndex(event.to);
      };

      carousel.addEventListener("slide.bs.carousel", handleSlide);

      return () => {
        carousel.removeEventListener("slide.bs.carousel", handleSlide);
      };
    }
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold fs-3 text-info">
        <i className="fas fa-calendar-check"></i> Doctor Appointment Booking
      </h2>

      <div id="dayCarousel" className="carousel slide mx-auto rounded shadow" style={{ maxWidth: "90%" }}>
        <div className="carousel-inner">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={i}>
              <div className="row justify-content-center">
                {days.slice(i * 3, i * 3 + 3).map((day) => (
                  <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center" key={day.date}>
                    <DayCard
                      day={day}
                      selectedDay={selectedDay}
                      selectedTime={selectedTime}
                      setSelectedDay={setSelectedDay}
                      setSelectedTime={setSelectedTime}
                      timeSlots={start_time}
                      bookedAppointments={bookedAppointments}
                      setShowConfirm={setShowConfirm}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#dayCarousel"
          data-bs-slide="prev"
          disabled={activeIndex === 0}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#dayCarousel"
          data-bs-slide="next"
          disabled={activeIndex === totalSlides - 1}
        >
          <span className="carousel-control-next-icon" aria-hidden="true" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {showConfirm && selectedDay && selectedTime && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Appointment</h5>
                <button type="button" className="btn-close" onClick={handleCloseConfirm} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>
                  You are booking for <strong>{selectedDay.date}</strong> at <strong>{selectedTime}</strong>
                </p>
                <div className="mb-3">
                  <label htmlFor="patientName" className="form-label">Patient Name</label>
                  <input type="text" className="form-control" id="patientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
                  {formErrors.patientName && <div className="text-danger">{formErrors.patientName}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="patientPhone" className="form-label">Patient Phone</label>
                  <input type="text" className="form-control" id="patientPhone" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} />
                  {formErrors.patientPhone && <div className="text-danger">{formErrors.patientPhone}</div>}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseConfirm}>Cancel</button>
                <button className="btn btn-success" onClick={handleBookAppointment}>Confirm Booking</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showToast && <div className="alert alert-success">Appointment Booked Successfully!</div>}
    </div>
  );
}

export default Appoint;


