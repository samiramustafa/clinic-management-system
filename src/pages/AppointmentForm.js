import React, { useState } from 'react';

const departments = ['Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Orthopedics'];

const doctors = {
  Cardiology: ['Dr. Heart', 'Dr. Vascular'],
  Dermatology: ['Dr. Skin', 'Dr. Derm'],
  Neurology: ['Dr. Brain', 'Dr. Neuro'],
  Pediatrics: ['Dr. Kid', 'Dr. Child'],
  Orthopedics: ['Dr. Bone', 'Dr. Ortho'],
};

const AppointmentForm = () => {
  const [department, setDepartment] = useState(departments[0]);
  const [doctor, setDoctor] = useState(doctors[departments[0]][0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setDoctor(doctors[e.target.value][0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment booked successfully for ${name} with Dr. ${doctor} in the ${department} department on ${date} at ${time}.`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Make An Appointment For Your Family</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <select id="department" className="form-control" value={department} onChange={handleDepartmentChange} required>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="doctor">Doctor:</label>
          <select id="doctor" className="form-control" value={doctor} onChange={(e) => setDoctor(e.target.value)} required>
            {doctors[department].map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input type="time" id="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;