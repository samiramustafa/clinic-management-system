
//nasser khairy
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../component/Card"; // تأكد من أن هذا هو المكون الصحيح للكارت
import { useParams } from "react-router-dom"; // لا تحتاج لـ .min في المسار عادةً
import FeedbackList from '../feedback/feedbacklist';
import Appoint from "../appointment/Appoint";

function Details() {
    // --- حالة واحدة لتخزين بيانات الطبيب المدمجة ---
    const [doctor, setDoctor] = useState(null);
    // const [user, setUser] = useState(null); // <--- ❌ إزالة حالة user
    const [error, setError] = useState(null); // تغيير اسم errors إلى error للمفرد
    const { id } = useParams();

    useEffect(() => {
        setError(null); // مسح الخطأ عند بدء تحميل جديد
        setDoctor(null); // مسح بيانات الطبيب القديم عند تغيير ID (اختياري)

        // --- استدعاء API واحد فقط للمسار الصحيح ---
        axios.get(`http://127.0.0.1:8000/api/doctors/${id}/`) // <--- ✅ المسار الصحيح
            .then((response) => {
                console.log("Fetched Doctor Details:", response.data); // للتحقق من البيانات المستلمة
                // --- تخزين البيانات المدمجة في حالة doctor ---
                setDoctor(response.data);
            })
            .catch((err) => {
                console.error("Error fetching doctor details:", err.response || err.message);
                setError("Sorry, we couldn't load the doctor's details. Please try again later.");
            });

        // --- ❌ إزالة الاستدعاء الثاني لـ /users/ ---

    }, [id]); // الاعتماد على id فقط

    if (error) { // استخدام error بدل errors
        return <p className="text-danger text-center mt-5">{error}</p>;
    }

    // --- الاعتماد على doctor فقط للتحميل ---
    if (!doctor) {
        // يمكنك إضافة spinner هنا بدل النص
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading doctor details...</span>
                </div>
            </div>
        );
    }

    // --- تأكد من أن مكون الكارت هو Card وليس Mycard ---
    // --- وتأكد من أسماء الـ props التي يتوقعها ---
    return (
        <>
            {/* --- تمرير البيانات من كائن doctor فقط --- */}
            <Card
                // افترض أن Card يتوقع هذه الـ props. عدّل الأسماء إذا لزم الأمر.
                img={doctor.image || "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=No+Image"}
                name={doctor.name || "N/A"}           // <-- من doctor.name
                specialization={doctor.speciality || "N/A"} // <-- من doctor.speciality (تأكد من اسم الـ prop)
                description={doctor.description || "No description available."}
                city={doctor.city || "-"}             // <-- من doctor.city
                area={doctor.area || "-"}             // <-- من doctor.area
                fees={doctor.fees ? `${doctor.fees} EGP` : "200"} // <-- إضافة العملة هنا أو داخل Card
                rate={doctor.average_rating != null && doctor.average_rating > 0 ? doctor.average_rating : null}
                // يمكنك تمرير id الطبيب إذا كان Card يحتاجه داخليًا
                // doctorId={doctor.id}
            />

            <div className="w-50 mx-auto my-4"> {/* أضفت my-4 */}
                <hr className="border border-primary opacity-75" />
            </div>

            {/* افترض أن Appoint يحتاج id الطبيب */}
            <Appoint doctorId={id} />

            <div className="w-50 mx-auto my-4"> {/* أضفت my-4 */}
                <hr className="border border-primary opacity-75" />
            </div>

            {/* FeedbackList يحتاج id الطبيب */}
            <FeedbackList doc_id={id} />

            <div className="w-50 mx-auto my-4"> {/* أضفت my-4 */}
                <hr className="border border-primary opacity-75" />
            </div>
        </>
    );
}

export default Details;
