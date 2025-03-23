


// import React, { useContext, useState } from "react";
// import AppointmentContext from "../appointment/AppointmentContext";

// const DayCard = ({ day, selectedDay, selectedTime, setSelectedDay, setSelectedTime, timeSlots, setShowConfirm }) => {
//   const { bookedAppointments } = useContext(AppointmentContext);
//   const [showAlert, setShowAlert] = useState(false);

//   const isTimeSlotBooked = (time) => {
//     return bookedAppointments.some(app => app.day.name === day.name && app.time === time);
//   };

//   const isTimeSlotSelected = (time) => {
//     return selectedTime === time && selectedDay?.name === day.name;
//   };

//   // استخدم الـ useEffect عشان تعمل الـ timeout
//   React.useEffect(() => {
//     if (showAlert) {
//       const timer = setTimeout(() => {
//         setShowAlert(false);
//       }, 5000);

//       return () => clearTimeout(timer); // Clean up the timer when the component unmounts or showAlert changes
//     }
//   }, [showAlert]); // Only run this effect when showAlert changes


//   return (
//     <div className="card p-2 border text-center shadow-sm bg-light fs-5 fw-bold w-100 mx-auto">
//       <h6 className="bg-primary text-white py-2 rounded">{day.name} ({day.date})</h6>
//       <div className="table-responsive">
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
//                 cellClass += " text-danger";
//               }

//               return (
//                 <tr key={time}> {/* Use 'time' as the key, assuming it's unique */}
//                   <td
//                     className={`${cellClass}`}
//                     style={{ cursor: booked ? "not-allowed" : "pointer" }}
//                     onClick={() => {
//                       if (!booked) {
//                         if (selected) {
//                           setSelectedDay(null);
//                           setSelectedTime(null);
//                         } else {
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




import React, { useContext, useState, useEffect } from "react";
import AppointmentContext from "../appointment/AppointmentContext";

const DayCard = ({ day, selectedDay, selectedTime, setSelectedDay, setSelectedTime, start_time = [], setShowConfirm }) => {
  const { bookedAppointments } = useContext(AppointmentContext);
  const [showAlert, setShowAlert] = useState(false);

  const isTimeSlotBooked = (time) => {
    return bookedAppointments?.some(app => app?.date === day?.date && app?.time === time) ?? false;
  };

  const isTimeSlotSelected = (time) => {
    return selectedTime === time && selectedDay?.date === day?.date;
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className="card p-2 border text-center shadow-sm bg-light fs-5 fw-bold w-100 mx-auto">
      <h6 className="bg-primary text-white py-2 rounded">
        {day?.name} ({day?.date})
      </h6>
      <div className="table-responsive">
        <table className="table table-sm table-bordered">
          <tbody>
            {start_time?.length > 0 ? (
              start_time.map((time) => {
                const booked = isTimeSlotBooked(time);
                const selected = isTimeSlotSelected(time);

                let cellClass = "text-center bg-light";
                if (selected) cellClass = "text-center bg-primary text-white";
                if (booked) cellClass = "text-center bg-light text-danger";

                return (
                  <tr key={`${day?.date}-${time}`}>
                    <td
                      className={cellClass}
                      style={{ cursor: booked ? "not-allowed" : "pointer" }}
                      onClick={() => {
                        if (!booked) {
                          if (selected) {
                            setSelectedDay(null);
                            setSelectedTime(null);
                          } else {
                            setSelectedDay(day);
                            setSelectedTime(time);
                            setShowConfirm(false);
                          }
                        }
                      }}
                    >
                      {time} {booked && " (Booked)"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="text-center text-muted">No available time slots</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        {showAlert && (
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Warning!</strong> Please select a time slot for this day.
            <button type="button" className="btn-close" onClick={() => setShowAlert(false)} aria-label="Close"></button>
          </div>
        )}

        <button
          className="btn btn-primary btn-sm w-100 mt-2 fs-4 fw-bold"
          onClick={() => {
            if (selectedDay && selectedTime) {
              setShowConfirm(true);
            } else {
              setShowAlert(true);
            }
          }}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default DayCard;
