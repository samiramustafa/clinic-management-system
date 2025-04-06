import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // <-- For React Router v5
import 'bootstrap/dist/css/bootstrap.min.css'; // تأكد من استيراد Bootstrap

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory(); // <-- Hook for navigation in v5

    const handleSubmit = async (event) => {
        event.preventDefault(); // منع إعادة تحميل الصفحة الافتراضي للفورم
        setIsLoading(true);
        setError(null); // مسح أي خطأ سابق

        try {
            // --- استدعاء API تسجيل دخول الأدمن ---
            const response = await axios.post('http://127.0.0.1:8000/api/admin/login/', {
                username: username,
                password: password,
            });

            // --- التحقق من النجاح واستلام التوكن ---
            if (response.data && response.data.access) {
                console.log("Admin Login Successful:", response.data);

                // --- تخزين التوكن وبيانات الأدمن ---
                localStorage.setItem('access_token', response.data.access);
                if (response.data.refresh) {
                    localStorage.setItem('refresh_token', response.data.refresh);
                }
                localStorage.setItem('isAdmin', 'true'); // تحديد أن المستخدم أدمن

                // --- إعادة التوجيه إلى لوحة التحكم ---
                // استبدل '/admin/dashboard' بالمسار الفعلي للوحة تحكم الأدمن عندك
                history.push('/admin/dashboard');

            } else {
                // حالة غير متوقعة: نجاح 200 ولكن لا يوجد توكن
                console.error("Login successful but no token received:", response.data);
                setError('Login failed: Could not retrieve authentication token.');
            }

        } catch (err) {
            // --- التعامل مع الأخطاء ---
            console.error("Admin Login Error:", err.response || err.message);
            setIsLoading(false); // إيقاف التحميل عند حدوث خطأ

            if (err.response) {
                // السيرفر استجاب بخطأ (مثل 400, 401, 500)
                let errorMessage = "An error occurred. Please try again."; // رسالة افتراضية
                const errorData = err.response.data;

                // محاولة استخلاص رسالة خطأ أوضح من الباك إند
                if (errorData) {
                    if (errorData.detail) {
                        errorMessage = errorData.detail; // رسالة الخطأ الشائعة من DRF/SimpleJWT
                    } else if (errorData.non_field_errors) {
                         errorMessage = errorData.non_field_errors.join(' ');
                    } else if (typeof errorData === 'string') {
                        errorMessage = errorData;
                    }
                    // يمكنك إضافة المزيد من التحققات هنا إذا كان الباك إند يرسل أخطاء بشكل مختلف
                }

                 // تخصيص الرسالة إذا كان الخطأ هو "ليس أدمن" (تعتمد على النص الذي حددته في السيريالايزر)
                 if (errorMessage.includes("User is not an admin")) {
                     setError("Access Denied: This login is for administrators only.");
                 } else if (err.response.status === 401 || err.response.status === 400) {
                     // خطأ شائع للبيانات غير الصحيحة
                     setError("Invalid username or password.");
                 } else {
                    setError(errorMessage); // عرض رسالة الخطأ العامة من السيرفر
                 }

            } else {
                // خطأ في الشبكة أو مشكلة قبل وصول الطلب للسيرفر
                setError('Network error or server unreachable. Please check your connection.');
            }
        }
        // لا نحتاج لـ finally هنا لأن setIsLoading تتم داخل catch وفي بداية try ضمنيًا
        // finally {
        //     setIsLoading(false); // تأكد من إيقاف التحميل دائمًا
        // }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Admin Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="adminUsername" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="adminUsername"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        disabled={isLoading} // تعطيل الحقل أثناء التحميل
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="adminPassword" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="adminPassword"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading} // تعطيل الحقل أثناء التحميل
                                    />
                                </div>

                                {/* عرض رسالة الخطأ إن وجدت */}
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isLoading} // تعطيل الزر أثناء التحميل
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                <span className="ms-2">Logging in...</span>
                                            </>
                                        ) : (
                                            'Login'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;