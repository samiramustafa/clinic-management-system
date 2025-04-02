import React, { createContext, useState, useEffect } from "react";

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [bookedAppointments, setBookedAppointments] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bookedAppointments")) || [];
    } catch (error) {
      console.error("Error loading appointments:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      if (bookedAppointments.length > 0) {
        localStorage.setItem("bookedAppointments", JSON.stringify(bookedAppointments));
      }
      // console.log(bookedAppointments)
    } catch (error) {
      console.error("Error saving appointments:", error);
    }
  }, [bookedAppointments]);

  return (
    <AppointmentContext.Provider value={{ bookedAppointments, setBookedAppointments }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;
