import React, { useState, useEffect } from "react";

function DoctorSchedule() {
  const [doctorName, setDoctorName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = [
    "8:00 am", "8:30 am", "9:00 am", "9:30 am",
    "10:00 am", "10:30 am", "11:00 am", "11:30 am",
    "12:00 pm", "12:30 pm", "1:00 pm", "1:30 pm",
    "2:00 pm", "2:30 pm", "3:00 pm", "3:30 pm"
  ];

  useEffect(() => {
    const savedSchedule = JSON.parse(localStorage.getItem("doctorSchedule")) || {};
    if (savedSchedule.name) {
      setDoctorName(savedSchedule.name);
      setSelectedDays(savedSchedule.days || []);
      setSelectedTimes(savedSchedule.times || []);
    }
  }, []);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleTime = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const saveSchedule = () => {
    const schedule = { name: doctorName, days: selectedDays, times: selectedTimes };
    localStorage.setItem("doctorSchedule", JSON.stringify(schedule));
    alert("Schedule saved!");
  };

  return (
    <div className="container mt-4">
      <h2>Doctor Schedule</h2>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Doctor Name"
        value={doctorName}
        onChange={(e) => setDoctorName(e.target.value)}
      />
      <h5>Select Available Days:</h5>
      <div className="d-flex flex-wrap">
        {days.map((day) => (
          <button
            key={day}
            className={`btn m-1 ${selectedDays.includes(day) ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => toggleDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <h5 className="mt-3">Select Available Times:</h5>
      <div className="d-flex flex-wrap">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            className={`btn m-1 ${selectedTimes.includes(slot) ? "btn-success" : "btn-outline-secondary"}`}
            onClick={() => toggleTime(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
      <button className="btn btn-primary mt-3" onClick={saveSchedule}>Save Schedule</button>
    </div>
  );
}

export default DoctorSchedule;
