// import React, { useState } from "react";
// import axios from "axios";
// import InputField from "../component/Input";
// import { useHistory } from "react-router-dom";
// import Title from "../component/Title";

// const Login = () => {
//     const [formData, setFormData] = useState({
//         username: "",
//         password: "",
//     });
//     const [error, setError] = useState("");
//     const history = useHistory();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(""); // مسح أي خطأ قديم
    
//         try {
//             const response = await axios.post("http://127.0.0.1:8000/api/token/", {
//                 username: formData.username,
//                 password: formData.password,
//             });
    
//             // حفظ الـ access token في localStorage
//             localStorage.setItem("access_token", response.data.access);
//             localStorage.setItem("refresh_token", response.data.refresh);
    
//             console.log("✅ Login successful!", response.data);
    
//             // تحويل المستخدم إلى الصفحة الرئيسية بعد تسجيل الدخول
//             history.push("/dashboard");
    
//         } catch (err) {
//             setError("❌ اسم المستخدم أو كلمة المرور غير صحيحة.");
//             console.error("❌ Login failed:", err.response?.data || err.message);
//         }
//     };
    

//     return (
//         <div>
//             <Title text="Login" />
//             <form onSubmit={handleSubmit}>
//                 <InputField label="Username" name="username" value={formData.username} onChange={handleChange} required />
//                 <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />

//                 {error && <p style={{ color: "red" }}>{error}</p>}

//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import InputField from "../component/Input";
import { useHistory } from "react-router-dom";
import Title from "../component/Title";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const history = useHistory();

    // ✅ دالة تحديث بيانات الفورم عند الكتابة
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
    
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/token/", {
                username: formData.username,
                password: formData.password,
            });
    
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
    
            // ✅ جلب بيانات المستخدم بعد تسجيل الدخول
            const userResponse = await axios.get("http://127.0.0.1:8000/api/users/me/", {
                headers: { Authorization: `Bearer ${response.data.access}` }
            });
    
            localStorage.setItem("loginSession", JSON.stringify(userResponse.data));
    
            // ✅ تحديث Navbar فورًا بعد تسجيل الدخول
            window.dispatchEvent(new Event("storage"));
    
            // ✅ إعادة التوجيه إلى صفحة البروفايل المناسبة
            const profilePath = userResponse.data.role === "doctor" ? "/DoctorProfile" : "/PatientProfile";
            history.push(profilePath);
    
        } catch (err) {
            setError("❌ اسم المستخدم أو كلمة المرور غير صحيحة.");
            console.error("❌ Login failed:", err.response?.data || err.message);
        }
    };

    return (
        <div>
            <Title text="Login" />
            <form onSubmit={handleSubmit}>
                <InputField label="Username" name="username" value={formData.username} onChange={handleChange} required />
                <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
