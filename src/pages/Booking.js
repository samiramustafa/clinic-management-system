import { useState } from "react";

const doctors = [
    { id: 1, name: "Dr. Ahmed" },
    { id: 2, name: "Dr. Sarah" },
];

const availableAppointments = {
    1: ["10:00 AM", "11:00 AM", "2:00 PM"],
    2: ["9:00 AM", "1:00 PM", "4:00 PM"],
};

function AppointmentBooking() {
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [message, setMessage] = useState("");

    const handleBooking = () => {
        if (!selectedDoctor || !selectedTime) {
            setMessage("يرجى اختيار الطبيب والموعد");
            return;
        }

        // إرسال بيانات الحجز إلى السيرفر
        console.log(`تم حجز ${selectedTime} مع ${selectedDoctor}`);
        setMessage(`تم حجز ${selectedTime} مع ${selectedDoctor}`);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">حجز موعد</h2>

            <label className="form-label">اختر الطبيب:</label>
            <select
                className="form-select mb-3"
                onChange={(e) => setSelectedDoctor(e.target.value)}
            >
                <option value="">اختر الطبيب</option>
                {doctors.map((doc) => (
                    <option key={doc.id} value={doc.name}>
                        {doc.name}
                    </option>
                ))}
            </select>

            {selectedDoctor && (
                <>
                    <label className="form-label">اختر الموعد:</label>
                    <select
                        className="form-select mb-3"
                        onChange={(e) => setSelectedTime(e.target.value)}
                    >
                        <option value="">اختر الموعد</option>
                        {availableAppointments[
                            doctors.find((doc) => doc.name === selectedDoctor)?.id
                        ].map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>

                    <button className="btn btn-primary" onClick={handleBooking}>
                        تأكيد الحجز
                    </button>
                </>
            )}

            {message && <p className="mt-3 text-success">{message}</p>}
        </div>
    );
}

export default AppointmentBooking;
