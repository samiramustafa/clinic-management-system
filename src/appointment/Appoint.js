
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DayCard from "./daycard";
import { useParams } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // تأكد من استيراد Bootstrap JS

function Appoint() {
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedAvailableTimeId, setSelectedAvailableTimeId] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { id } = useParams();
  const carouselRef = useRef(null); // للتحكم في الكاروسيل



  useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/available-times/?doctor_id=${id}`
      );
      const enrichedAppointments = response.data.map((appt) => ({
        ...appt,
        day: appt.day || new Date(appt.date).toLocaleDateString("en-US", { weekday: "long" }),
      }));
      setAppointments(enrichedAppointments);
      const firstAvailableTimeId = enrichedAppointments?.[0]?.id || null;
      setSelectedAvailableTimeId(firstAvailableTimeId);
      setDoctorId(id);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to fetch appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchAppointments();
}, [id]);

  // Fetch authentication data
  useEffect(() => {
    const fetchAuthData = async () => {
      const token = localStorage.getItem("access_token");
      setIsAuthenticated(!!token);
      if (!token) return;

      try {
        const userResponse = await axios.get(
          "http://127.0.0.1:8000/api/users/me/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const userId = userResponse.data.id;
        const phone = userResponse.data.phone_number;
        const user_name = userResponse.data.username;
        setPatientName(user_name);
        setPatientPhone(phone);

        const patientResponse = await axios.get(
          "http://127.0.0.1:8000/api/patients/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const patientData = patientResponse.data.find(
          (patient) => patient.user === userId
        );

        if (patientData) {
          setPatientId(patientData.id);
        } else {
          console.log("No patient found for this user.");
        }
      } catch (error) {
        console.error("Error fetching auth data:", error);
      }
    };

    fetchAuthData();
  }, [id]);

  // Initialize Bootstrap Carousel with no wrap
  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement && window.bootstrap) {
      const carousel = new window.bootstrap.Carousel(carouselElement, {
        wrap: false, // تعطيل الحلقة الدائرية
      });

      const handleSlide = (event) => {
        setActiveIndex(event.to); // تحديث الفهرس النشط
      };

      carouselElement.addEventListener("slide.bs.carousel", handleSlide);
      return () => {
        carouselElement.removeEventListener("slide.bs.carousel", handleSlide);
        carousel.dispose(); // تنظيف الكاروسيل عند إلغاء التثبيت
      };
    }
  }, [appointments]); // يعتمد على appointments لأنه يحدد عدد الشرائح

  // Toast auto-close
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const validateForm = () => {
    let errors = {};
    if (!patientName || !patientName.trim()) {
      errors.patientName = "Patient name is required";
    }
    if (!patientPhone || !patientPhone.trim()) {
      errors.patientPhone = "Patient phone is required";
    } else if (!/^\d{10,15}$/.test(patientPhone)) {
      errors.patientPhone = "Phone number must be between 10-15 digits";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBookAppointment = async () => {
    if (!selectedDay || !selectedTime || !selectedAvailableTimeId) {
      console.warn("Missing required fields:", { selectedDay, selectedTime, selectedAvailableTimeId });
      return;
    }

    if (!validateForm()) return;

    try {
      const newAppointment = {
        patient: patientId,
        date: selectedDay.date,
        time_range: `${selectedTime.start_time} - ${selectedTime.end_time}`,
        doctor: doctorId,
        available_time: selectedAvailableTimeId,
        phone_number: patientPhone,
        patient_name: patientName,
        status: "pending",
      };

      const { data: bookedAppointment } = await axios.post(
        "http://127.0.0.1:8000/api/appointments/",
        newAppointment,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setBookedAppointments((prev) => [...prev, bookedAppointment]);
      setShowToast(true);
      setShowConfirm(false);

      setFormErrors({});
      setSelectedDay(null);
      setSelectedTime(null);
      setSelectedAvailableTimeId(null);
      setPatientName("");
      setPatientPhone("");
    } catch (error) {
      console.error("Error booking appointment:", error);
      setError(error.response?.data?.message || "Failed to book appointment. Please try again.");
    }
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setFormErrors({});
  };

  const uniqueDays = Array.from(
    new Map(appointments.map((appt) => [appt.date, { name: appt.day, date: appt.date }])).values()
  );

  const getTimeSlotsForDay = (dayDate) => {
    return appointments
      .filter((appt) => appt.date === dayDate)
      .map((appt) => ({
        start_time: appt.start_time,
        end_time: appt.end_time,
      }));
  };

  const totalSlides = Math.ceil(uniqueDays.length / 3);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold fs-3 text-info">
        <i className="fas fa-calendar-check"></i> Doctor Appointment Booking
      </h2>

      <div
        id="dayCarousel"
        className="carousel slide mx-auto rounded shadow"
        style={{ maxWidth: "90%" }}
        ref={carouselRef}
        data-bs-wrap="false" // تعطيل الحلقة الدائرية مباشرة عبر HTML
      >
        <div className="carousel-inner">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div className={`carousel-item ${i === activeIndex ? "active" : ""}`} key={i}>
              <div className="row justify-content-center">
                {uniqueDays.slice(i * 3, i * 3 + 3).map((day) => (
                  <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center" key={day.date}>
                    <DayCard
                      day={day}
                      selectedDay={selectedDay}
                      selectedTime={selectedTime}
                      setSelectedDay={setSelectedDay}
                      setSelectedTime={setSelectedTime}
                      timeSlots={getTimeSlotsForDay(day.date)}
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
                  You are booking for <strong>{selectedDay.date}</strong> from{" "}
                  <strong>{selectedTime.start_time}</strong> to <strong>{selectedTime.end_time}</strong>
                </p>
                <div className="mb-3">
                  <label htmlFor="patientName" className="form-label">Patient Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                  {formErrors.patientName && <div className="text-danger">{formErrors.patientName}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="patientPhone" className="form-label">Patient Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientPhone"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                  />
                  {formErrors.patientPhone && <div className="text-danger">{formErrors.patientPhone}</div>}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseConfirm}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleBookAppointment}>
                  Confirm Booking
                </button>
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