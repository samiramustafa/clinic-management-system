// import React, { useContext } from "react";
// import AppointmentContext from "./AppointmentContext";

// const DayCard = ({ day, selectedDay, selectedTime, setSelectedDay, setSelectedTime, timeSlots, bookedAppointments, setShowConfirm }) => {
//     // const isTimeSlotBooked = (time) => {
//     //   return bookedAppointments.some(app => app.day.name === day.name && app.time === time);
//     // };

//     // const isTimeSlotSelected = (time) => {
//     //   return selectedTime === time && selectedDay?.name === day.name;
//     // };

//     return (
//       <div className="p-2 border text-center mx-2 shadow-sm rounded bg-light" style={{ width: "180px" }}>
//         <h6 className="bg-primary text-white py-2 rounded">{day.name} ({day.date})</h6>
//         <table className="table table-sm table-bordered">
//           <tbody>
//             {timeSlots.map((time, idx) => {
//               const booked = isTimeSlotBooked(time);
//               const selected = isTimeSlotSelected(time);

//               let cellClass = "text-center";
//               if (selected) {
//                 cellClass += " bg-primary text-white";
//               } else {
//                 cellClass += " bg-light";
//               }
//               if (booked) {
//                 cellClass += " text-muted";
//               }

//               return (
//                 <tr key={idx}>
//                   <td
//                     className={cellClass}
//                     style={{ cursor: booked ? "not-allowed" : "pointer" }}
//                     onClick={() => {
//                       if (!booked) {
//                         if (selected) {
//                           // إذا كان الوقت نفسه محددًا بالفعل، قم بإلغاء التحديد
//                           setSelectedDay(null);
//                           setSelectedTime(null);
//                         } else {
//                           // تعيين اليوم والوقت المحدد
//                           setSelectedDay(day);
//                           setSelectedTime(time);
//                         }
//                       }
//                     }}
//                   >
//                     {time} {booked && " (Booked)"}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <button
//           className="btn btn-primary btn-sm w-100 mt-2"
//           onClick={() => {
//             if (selectedDay && selectedTime) {
//               setShowConfirm(true);
//             } else {
//               alert("Please select a time slot for this day.");
//             }
//           }}
//           disabled={!selectedTime || selectedDay?.name !== day.name || isTimeSlotBooked(selectedTime)}
//         >
//           Book
//         </button>
//       </div>
//     );
//   };


//   export default DayCard;


// import React, { useContext } from "react";
// import AppointmentContext from "../pages/AppointmentContext";

// const DayCard = ({ day, selectedDay, selectedTime, setSelectedDay, setSelectedTime, timeSlots, setShowConfirm }) => {
//     const { bookedAppointments } = useContext(AppointmentContext);


//     const isTimeSlotBooked = (time) => {
//         return bookedAppointments.some(app => app.day.name === day.name && app.time === time);
//     };


//     const isTimeSlotSelected = (time) => {
//         return selectedTime === time && selectedDay?.name === day.name;
//     };

//     return (
//         <div className="p-2 border text-center mx-1 fw-bold shadow-sm rounded bg-light" style={{ width: "250px", margin: "0" }}>
//             <h6 className="bg-primary text-white py-2 rounded">{day.name} ({day.date})</h6>
//             <table className="table table-sm table-bordered">

//                 <tbody>
//                     {timeSlots.map((time, idx) => {
//                         const booked = isTimeSlotBooked(time);
//                         const selected = isTimeSlotSelected(time);

//                         let cellClass = "text-center";
//                         if (selected) {
//                             cellClass += " bg-primary text-white";
//                         } else {
//                             cellClass += " bg-light";
//                         }
//                         if (booked) {
//                             cellClass += " text-danger";
//                         }

//                         return (
//                             <tr key={idx}>
//                                 <td
//                                     className={`${cellClass} w-50`}
//                                     style={{padding: "5px", cursor: booked ? "not-allowed" : "pointer" }}
//                                     onClick={() => {
//                                         if (!booked) {
//                                             if (selected) {

//                                                 setSelectedDay(null);
//                                                 setSelectedTime(null);
//                                             } else {

//                                                 setSelectedDay(day);
//                                                 setSelectedTime(time);
//                                             }
//                                         }
//                                     }}
//                                 >
//                                     {time} {booked && " (Booked)"}
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//             <button
//                 className="btn btn-primary btn-sm w-100 mt-2"
//                 onClick={() => {
//                     if (selectedDay && selectedTime) {
//                         setShowConfirm(true);
//                     } else {
//                         alert("Please select a time slot for this day.");
//                     }
//                 }}
//                 disabled={!selectedTime || selectedDay?.name !== day.name || isTimeSlotBooked(selectedTime)}
//             >
//                 Book
//             </button>
//         </div>
//     );
// };

// export default DayCard;


import React, { useContext, useState } from "react";
import AppointmentContext from "../pages/AppointmentContext";

const DayCard = ({ day, selectedDay, selectedTime, setSelectedDay, setSelectedTime, timeSlots, setShowConfirm }) => {
    const { bookedAppointments } = useContext(AppointmentContext);
    const [showAlert, setShowAlert] = useState(false);

    const isTimeSlotBooked = (time) => {
        return bookedAppointments.some(app => app.day.name === day.name && app.time === time);
    };

    const isTimeSlotSelected = (time) => {
        return selectedTime === time && selectedDay?.name === day.name;
    };
    setTimeout(() => {
        setShowAlert(false);
    }, 5000);

    return (
        <div className="card p-2 border text-center shadow-sm bg-light fs-5 fw-bold w-100 mx-auto">
            <h6 className="bg-primary text-white py-2 rounded">{day.name} ({day.date})</h6>
            <div className="table-responsive">
                <table className="table table-sm table-bordered">
                    <tbody>
                        {timeSlots.map((time, idx) => {
                            const booked = isTimeSlotBooked(time);
                            const selected = isTimeSlotSelected(time);

                            let cellClass = "text-center";
                            if (selected) {
                                cellClass += " bg-primary text-white";
                            } else {
                                cellClass += " bg-light";
                            }
                            if (booked) {
                                cellClass += " text-danger";
                            }

                            return (
                                <tr key={idx}>
                                    <td
                                        className={`${cellClass}`}
                                        style={{ cursor: booked ? "not-allowed" : "pointer" }}
                                        onClick={() => {
                                            if (!booked) {
                                                if (selected) {
                                                    setSelectedDay(null);
                                                    setSelectedTime(null);
                                                } else {
                                                    setSelectedDay(day);
                                                    setSelectedTime(time);
                                                }
                                            }
                                        }}
                                    >
                                        {time} {booked && " (Booked)"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                {/* Bootstrap Alert */}
                {showAlert && (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Warning!</strong> Please select a time slot for this day.
                        <button type="button" className="close" onClick={() => setShowAlert(false)}>
                            <span>&times;</span>
                        </button>
                    </div>
                )}

                <button
                    className="btn btn-primary btn-sm w-100 mt-2 fs-4 fw-bold"
                    onClick={() => {
                        if (selectedDay && selectedTime) {
                            setShowConfirm(true);
                        } else {
                            // alert("Please select a time slot for this day.");
                            setShowAlert(true);

                        }
                    }}
                // disabled={!selectedTime || selectedDay?.name !== day.name || isTimeSlotBooked(selectedTime)}
                >
                    Book
                </button>
            </div>
        </div>
    );
};

export default DayCard;

