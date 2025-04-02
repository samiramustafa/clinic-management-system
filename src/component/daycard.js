


// import React, { useContext, useState, useEffect } from "react";
// import AppointmentContext from "../appointment/AppointmentContext";

// const DayCard = ({ day, selectedDay, selectedTime, setSelectedDay, setSelectedTime, timeSlots = [], setShowConfirm }) => {
//   const [showAlert, setShowAlert] = useState(false);

//   const isTimeSlotSelected = (startTime, endTime) => {
//     return (
//       selectedTime?.start_time === startTime &&
//       selectedTime?.end_time === endTime &&
//       selectedDay?.date === day?.date
//     );
//   };

//   useEffect(() => {
//     if (showAlert) {
//       const timer = setTimeout(() => setShowAlert(false), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [showAlert]);

//   return (
//     <div className="card p-2 border text-center shadow-sm bg-light fs-5 fw-bold w-100 mx-auto "style={{ height: "350px" }}>
//       <h6 className="bg-primary text-white py-2 rounded fs-5 fw-bold">
//         {day?.name} ({day?.date})
//       </h6>
//       <div className="table-responsive mt-5 mb-0 w-100 mx-auto">
//         <table className="table table-sm table-bordered">
//           <thead>
//             <tr className="bg-light text-primary" style={{ height: "50px" }}>
//               <th className="mb-0 fs-5 fw-bold text-capitalize text-center mx-auto" style={{ width: "50%" }}>
//                 Start Time
//               </th>
//               <th style={{ width: "50%" }}>End Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {timeSlots.length > 0 ? (
//               timeSlots.map((slot, index) => {
//                 const { start_time, end_time } = slot;
//                 const selected = isTimeSlotSelected(start_time, end_time);
//                 let cellClass = "text-center bg-light";
//                 if (selected) cellClass = "text-center bg-primary text-white";

//                 return (
//                   <tr key={`${day?.date}-${start_time}-${end_time}-${index}`}>
//                     <td className={cellClass} style={{ cursor: "pointer" }} onClick={() => {
//                       if (selected) {
//                         setSelectedDay(null);
//                         setSelectedTime(null);
//                       } else {
//                         setSelectedDay(day);
//                         setSelectedTime({ start_time, end_time });
//                         setShowConfirm(false);
//                       }
//                     }}>
//                       {start_time}
//                     </td>
//                     <td className={cellClass} style={{ cursor: "pointer" }} onClick={() => {
//                       if (selected) {
//                         setSelectedDay(null);
//                         setSelectedTime(null);
//                       } else {
//                         setSelectedDay(day);
//                         setSelectedTime({ start_time, end_time });
//                         setShowConfirm(false);
//                       }
//                     }}>
//                       {end_time}
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan="2" className="text-center text-muted">
//                   No available time slots
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div>
//         {showAlert && (
//           <div className="alert alert-warning alert-dismissible fade show" role="alert">
//             <strong>Warning!</strong> Please select a time slot for this day.
//             <button type="button" className="btn-close" onClick={() => setShowAlert(false)} aria-label="Close"></button>
//           </div>
//         )}
//         <button
//           className="btn btn-primary btn-sm w-100 mt-2 fs-4 fw-bold"
//           onClick={() => {
//             if (selectedDay && selectedTime) {
//               setShowConfirm(true);
//             } else {
//               setShowAlert(true);
//             }
//           }}
//         >
//           Book
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DayCard;