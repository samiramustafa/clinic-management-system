// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import Title from "../component/Title";
// // import InputField from "../component/Input";

// // const DoctorProfile = () => {
// //   const [user, setUser] = useState(null);
// //   const [formData, setFormData] = useState({});
// //   const token = localStorage.getItem("access_token");

// //   useEffect(() => {
// //     if (!token) {
// //       console.error("No access token found");
// //       return;
// //     }

// //     axios
// //       .get("http://127.0.0.1:8000/clinic/api/users/me/", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((response) => {
// //         setUser(response.data);
// //         setFormData(response.data);
// //       })
// //       .catch((error) => console.error("Error fetching profile:", error));
// //   }, [token]);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };
// //   // console.log(formData);
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     axios
// //       .put("http://127.0.0.1:8000/clinic/api/users/me/", formData, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((response) => {
// //         setUser(response.data);
// //         alert("Profile updated successfully!");
// //       })
// //       .catch((error) => console.error("Error updating profile:", error));
// //   };

// //   if (!user) return <p>Loading...</p>;

// //   return (
// //     <div>
     
// //       <Title titleName="Profile" />
// //       <form onSubmit={handleSubmit}>
// //         <label>Full Name:</label>
// //         <InputField
// //           type="text"
// //           name="full_name"
// //           value={formData.full_name || ""}
// //           onChange={handleChange}
// //         />

// //         {/* {user.role === "doctor" && (
// //           <>
// //             <label>Speciality:</label>
// //             <input
// //               type="text"
// //               name="speciality"
// //               value={formData.speciality || ""}
// //               onChange={handleChange}
// //             />
// //             <label>Description:</label>
// //             <textarea
// //               name="description"
// //               value={formData.description || ""}
// //               onChange={handleChange}
// //             />
// //             <label>Fees:</label>
// //             <input
// //               type="number"
// //               name="fees"
// //               value={formData.fees || ""}
// //               onChange={handleChange}
// //             />
// //           </>
// //         )} */}

// //         {user.role === "patient" && (
// //           <>
// //             <label>Birth Date:</label>
// //             <input
// //               type="date"
// //               name="birth_date"
// //               value={formData.patient_data.birth_date || "2000-01-01"}
// //               onChange={handleChange}
// //             />
// //             <label>Medical History:</label>
// //             <textarea
// //               name="medical_history"
// //               value={formData.patient_data.medical_history || ""}
// //               onChange={handleChange}
// //             /> 
// //              <label>Gender:</label>
// //             <select
// //               name="gender"
// //               value={formData.patient_data.gender || "male"}
// //               onChange={handleChange}
// //             >
// //               <option value="male">Male</option>
// //               <option value="female">Female</option>
// //             </select> 
// //            </>
// //         )}

// //         <label>Phone Number:</label>
// //         <InputField
// //           type="text"
// //           name="phone_number"
// //           value={formData.phone_number || ""}
// //           onChange={handleChange}
// //         />



// //         <button className="btn btn-primary w-100" type="submit">Update Profile</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default DoctorProfile;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Title from "../component/Title";
// import InputField from "../component/Input";

// const DoctorProfile = () => {
//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({
//     full_name: "",
//     phone_number: "",
//     patient_data: {
//       birth_date: "2000-01-01",
//       medical_history: "",
//       gender: "male"
//     }
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     if (!token) {
//       setError("No access token found");
//       return;
//     }

//     setLoading(true);
//     axios.get("http://127.0.0.1:8000/clinic/api/users/me/", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => {
//       setFormData({
//         full_name: response.data.full_name || "",
//         phone_number: response.data.phone_number || "",
//         patient_data: {
//           birth_date: response.data.patient_data?.birth_date || "2000-01-01",
//           medical_history: response.data.patient_data?.medical_history || "",
//           gender: response.data.patient_data?.gender || "male"
//         }
//       });
//       setUser(response.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching profile:", error);
//       setError("Failed to load profile");
//     })
//     .finally(() => setLoading(false));
//   }, [token]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) return;
  
//     setLoading(true);
//     try {
//       // إعداد البيانات بشكل صحيح للسيرفر
//       const requestData = {
//         ...formData,
//         ...(user.role === "patient" && {
//           patient_data: {
//             ...formData.patient_data,
//             // تأكد من أن تاريخ الميلاد بصيغة YYYY-MM-DD
//             birth_date: formData.patient_data.birth_date || null
//           }
//         })
//       };
  
//       const response = await axios.put(
//         "http://127.0.0.1:8000/clinic/api/users/me/", 
//         requestData,
//         { 
//           headers: { 
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           } 
//         }
//       );
      
//       setUser(response.data);
//       console.log("Update successful:", response.data);
//       alert("تم تحديث الملف الشخصي بنجاح");
//     } catch (error) {
//       console.error("Update error:", error.response?.data || error.message);
//       alert(`خطأ في التحديث: ${error.response?.data?.error || error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePatientDataChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       patient_data: {
//         ...prev.patient_data,
//         [name]: value
//       }
//     }));
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!token) return;

//   //   setLoading(true);
//   //   try {
//   //     const response = await axios.put(
//   //       "http://127.0.0.1:8000/clinic/api/users/me/", 
//   //       formData,
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );
      
//   //     setUser(response.data);
//   //     alert("Profile updated successfully!");//cancel alert
//   //     console.log("Update successful:", response.data);
//   //   } catch (error) {
//   //     console.error("Update error:", error.response?.data || error.message);
//   //     setError(error.response?.data?.message || "Failed to update profile");
//   //     alert("Update failed. Check console for details.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!user) return <p>No user data found</p>;

//   return (
//     <div>
//       <Title titleName="Profile" />
//       <form onSubmit={handleSubmit}>
//         <label>Full Name:</label>
//         <InputField
//           type="text"
//           name="full_name"
//           value={formData.full_name}
//           onChange={handleChange}
//         />

//         {user.role === "patient" && (
//           <>
//             <label>Birth Date:</label>
//             <input
//               type="date"
//               name="birth_date"
//               value={formData.patient_data.birth_date}
//               onChange={handlePatientDataChange}
//             />
            
//             <label>Medical History:</label>
//             <textarea
//               name="medical_history"
//               value={formData.patient_data.medical_history}
//               onChange={handlePatientDataChange}
//             /> 
            
//             <label>Gender:</label>
//             <select
//               name="gender"
//               value={formData.patient_data.gender}
//               onChange={handlePatientDataChange}
//             >
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select> 
//           </>
//         )}

//         <label>Phone Number:</label>
//         <InputField
//           type="text"
//           name="phone_number"
//           value={formData.phone_number}
//           onChange={handleChange}
//         />

//         <button className="btn btn-primary w-100" type="submit" disabled={loading}>
//           {loading ? "Updating..." : "Update Profile"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default DoctorProfile;
import React, { useEffect, useState } from "react";
import axios from "axios"; // تأكد من استيراد axios
import Title from "../component/Title"; // تأكد من المسار الصحيح
import InputField from "../component/Input"; // تأكد من المسار الصحيح

const DoctorProfile = () => {
    // --- State Hooks ---
    const [user, setUser] = useState(null); // لتخزين بيانات المستخدم الأصلية من الـ API
    const [formData, setFormData] = useState({ // لإدارة بيانات الفورم
        // بيانات أساسية مشتركة
        full_name: "",
        phone_number: "",
        // يمكنك إضافة حقول أساسية أخرى هنا لو أردت تعديلها

        // بيانات بروفايل المريض (استخدم نفس اسم المفتاح اللي الباك اند بيتوقعه: patient_profile)
        patient_profile: {
            birth_date: "",
            medical_history: "",
            gender: "male", // أو القيمة الافتراضية من الباك إند
        },
        // بيانات بروفايل الطبيب (استخدم نفس اسم المفتاح اللي الباك اند بيتوقعه: doctor_profile)
        doctor_profile: {
            speciality: "",
            description: "",
            fees: "",
            image: null, // رابط الصورة للعرض، لا نرسل الملف هنا
        }
    });
    const [loading, setLoading] = useState(true); // يبدأ true لجلب البيانات الأولية
    const [error, setError] = useState(null); // لتخزين رسائل الخطأ
    const token = localStorage.getItem("access_token"); // جلب التوكن

    // --- useEffect لجلب بيانات المستخدم عند تحميل المكون ---
    useEffect(() => {
        if (!token) {
            setError("Authentication token not found. Please login.");
            setLoading(false); // أوقف التحميل
            return;
        }

        setLoading(true); // ابدأ التحميل
        setError(null); // امسح أي خطأ سابق

        axios.get("http://127.0.0.1:8000/clinic/api/users/me/", { // استخدم المسار الصحيح لـ API
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            const userData = response.data;
            setUser(userData); // خزن بيانات المستخدم الأصلية

            // تهيئة formData بالبيانات المستلمة
            let initialFormData = {
                full_name: userData.full_name || "",
                phone_number: userData.phone_number || "",
                // قيم افتراضية أولية للبروفايلات
                patient_profile: { birth_date: "", medical_history: "", gender: "male" },
                doctor_profile: { speciality: "", description: "", fees: "", image: null }
            };

            // املأ بيانات البروفايل الصحيحة بناءً على الدور
            if (userData.role === 'patient' && userData.patient_profile) {
                initialFormData.patient_profile = {
                    birth_date: userData.patient_profile.birth_date || "", // تأكد YYYY-MM-DD
                    medical_history: userData.patient_profile.medical_history || "",
                    gender: userData.patient_profile.gender || "male"
                };
            } else if (userData.role === 'doctor' && userData.doctor_profile) {
                initialFormData.doctor_profile = {
                    speciality: userData.doctor_profile.speciality || "",
                    description: userData.doctor_profile.description || "",
                    fees: userData.doctor_profile.fees || "",
                    image: userData.doctor_profile.image || null // رابط الصورة المستلم للعرض
                };
            }

            setFormData(initialFormData); // اضبط حالة الفورم

        })
        .catch((error) => {
            console.error("Error fetching profile:", error);
            const errorMsg = error.response?.data?.detail || error.message || "Failed to load profile data.";
            setError(errorMsg);
        })
        .finally(() => {
            setLoading(false); // انهي التحميل دائماً
        });

    }, [token]); // يعتمد فقط على التوكن

    // --- Handlers لتغيير بيانات الفورم ---

    // للبيانات الأساسية (مثل full_name, phone_number)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // لبيانات بروفايل المريض (مثل birth_date, gender)
    const handlePatientProfileChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            patient_profile: {
                ...prev.patient_profile,
                [name]: value
            }
        }));
    };

    // لبيانات بروفايل الطبيب (مثل speciality, fees)
    const handleDoctorProfileChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            doctor_profile: {
                ...prev.doctor_profile,
                [name]: value
            }
        }));
    };

    // --- Handler لتقديم الفورم (Update) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token || !user) {
            setError("Cannot update profile. User data or token missing.");
            return;
        }

        setLoading(true); // ابدأ التحميل لعملية التحديث
        setError(null); // امسح الأخطاء القديمة

        // بناء الـ Payload الصحيح للـ PUT request
        let requestData = {
            full_name: formData.full_name,
            phone_number: formData.phone_number,
            // أضف أي حقول أساسية أخرى قمت بتعديلها هنا
        };

        // إضافة بيانات البروفايل المتداخلة حسب الدور
        if (user.role === 'patient') {
            requestData.patient_profile = {
               ...formData.patient_profile,
               birth_date: formData.patient_profile.birth_date || null // أرسل null لو فارغ
            };
        } else if (user.role === 'doctor') {
            requestData.doctor_profile = {
                ...formData.doctor_profile,
                fees: formData.doctor_profile.fees || null, // أرسل null لو فارغ
                image: undefined // لا نرسل الصورة في طلب JSON
            };
            // حذف مفتاح الصورة إذا لم نرد تحديثه عبر JSON
            delete requestData.doctor_profile.image;
        }

        console.log("Sending update data:", JSON.stringify(requestData, null, 2)); // للتحقق

        try {
            const response = await axios.put(
                "http://127.0.0.1:8000/clinic/api/users/me/", // مسار التحديث
                requestData, // البيانات المبنية بشكل صحيح
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json' // مهم جداً لطلبات PUT/POST بدون ملفات
                    }
                }
            );

            // تحديث الحالة بعد النجاح
            const updatedUserData = response.data;
            setUser(updatedUserData); // حدث بيانات المستخدم الأساسية في العرض

            // حدث formData أيضاً ليعكس التغييرات المحفوظة
            let updatedFormDataState = {
                 full_name: updatedUserData.full_name || "",
                 phone_number: updatedUserData.phone_number || "",
                 patient_profile: { birth_date: "", medical_history: "", gender: "male" },
                 doctor_profile: { speciality: "", description: "", fees: "", image: null }
            };
             if (updatedUserData.role === 'patient' && updatedUserData.patient_profile) {
                  updatedFormDataState.patient_profile = updatedUserData.patient_profile;
             } else if (updatedUserData.role === 'doctor' && updatedUserData.doctor_profile) {
                  // تأكد من نسخ كل الحقول من الرد
                   updatedFormDataState.doctor_profile = {
                      ...updatedUserData.doctor_profile, // انسخ كل شيء من الرد
                      image: updatedUserData.doctor_profile?.image || null // احتفظ بالرابط المستلم
                   };
             }
            setFormData(updatedFormDataState);


            alert("Profile updated successfully!"); // رسالة نجاح مؤقتة

        } catch (error) {
            console.error("Update error:", error.response?.data || error.message);
            let errorDetail = "Failed to update profile.";
            if (error.response?.data) {
                 try {
                     // محاولة استخراج الأخطاء بشكل مفصل
                     const errors = error.response.data;
                     errorDetail = Object.entries(errors).map(([key, value]) =>
                        `${key}: ${Array.isArray(value) ? value.join(', ') : value}`
                     ).join('; ');
                 } catch {
                     try { // محاولة استخراج خطأ عام detail
                        errorDetail = error.response.data.detail || JSON.stringify(error.response.data);
                     } catch {
                        errorDetail = "An unexpected error format was received from the server."
                     }
                 }
            } else {
                 errorDetail = error.message;
            }
            setError(`Update failed: ${errorDetail}`); // اعرض الخطأ للمستخدم
        } finally {
            setLoading(false); // انهي التحميل دائماً
        }
    };

    // --- JSX Rendering ---
    return (
        <div className="container" style={{ maxWidth: "600px", margin: "50px auto" }}>
            <Title titleName="My Profile" /> {/* عنوان أوضح */}

            {/* عرض رسائل الخطأ */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* عرض مؤشر التحميل */}
            {loading && !user && <p>Loading profile...</p>} {/* التحميل الأولي */}

            {/* عرض الفورم بعد انتهاء التحميل ووجود بيانات المستخدم */}
            {!loading && user && (
                <form onSubmit={handleSubmit}>
                    {/* --- البيانات الأساسية --- */}
                    <fieldset className="border p-3 mb-3">
                         <legend className="w-auto px-2">Basic Information</legend>
                         <div className="mb-3">
                            <label className="form-label fw-bold">Full Name:</label>
                            <InputField
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                            />
                         </div>
                         <div className="mb-3">
                            <label className="form-label fw-bold">Phone Number:</label>
                            <InputField
                                type="text" // أو tel
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                required
                            />
                         </div>
                         {/* يمكنك إضافة عرض لحقول أخرى غير قابلة للتعديل مثل username, email, national_id */}
                         <p><span className="fw-bold">Username:</span> {user.username}</p>
                         {user.national_id && <p><span className="fw-bold">National ID:</span> {user.national_id}</p>}
                         {/* <p><span className="fw-bold">Email:</span> {user.email || 'Not set'}</p> */}

                    </fieldset>


                    {/* --- بيانات المريض (إذا كان مريضاً) --- */}
                    {user.role === "patient" && (
                        <fieldset className="border p-3 mb-3">
                            <legend className="w-auto px-2">Patient Details</legend>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Birth Date:</label>
                                <input
                                    className="form-control"
                                    type="date"
                                    name="birth_date"
                                    value={formData.patient_profile.birth_date || ''} // تأكد من القيمة الافتراضية
                                    onChange={handlePatientProfileChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Medical History:</label>
                                <textarea
                                    className="form-control"
                                    name="medical_history"
                                    value={formData.patient_profile.medical_history || ''}
                                    onChange={handlePatientProfileChange}
                                    rows="3"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Gender:</label>
                                <select
                                    className="form-select"
                                    name="gender"
                                    value={formData.patient_profile.gender || 'male'} // تأكد من القيمة
                                    onChange={handlePatientProfileChange}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    {/* <option value="M">Male</option> */}
                                    {/* <option value="F">Female</option> */}
                                </select>
                            </div>
                        </fieldset>
                    )}

                    {/* --- بيانات الطبيب (إذا كان طبيباً) --- */}
                    {user.role === "doctor" && (
                        <fieldset className="border p-3 mb-3">
                            <legend className="w-auto px-2">Doctor Details</legend>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Speciality:</label>
                                <InputField
                                    type="text"
                                    name="speciality"
                                    value={formData.doctor_profile.speciality || ''}
                                    onChange={handleDoctorProfileChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Description:</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={formData.doctor_profile.description || ''}
                                    onChange={handleDoctorProfileChange}
                                    rows="3"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Fees:</label>
                                <InputField
                                    type="number"
                                    name="fees"
                                    step="0.01"
                                    value={formData.doctor_profile.fees || ''}
                                    onChange={handleDoctorProfileChange}
                                />
                            </div>
                            {/* عرض الصورة الحالية (إذا وجدت) */}
                            {formData.doctor_profile.image && typeof formData.doctor_profile.image === 'string' && (
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Current Profile Image:</label>
                                    <div>
                                        {/* تأكد من بناء الرابط بشكل صحيح */}
                                        <img src={`http://127.0.0.1:8000${formData.doctor_profile.image}`} alt="Profile" style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover' }} />
                                    </div>
                                    <small>To change the image, please use the dedicated image upload section (if available).</small>
                                </div>
                            )}
                            {/* مكان لإضافة حقل تحميل صورة جديدة لو أردت (يتطلب تعديل handleSubmit) */}
                        </fieldset>
                    )}

                    {/* زر التحديث */}
                    <button className="btn btn-primary w-100 mt-3" type="submit" disabled={loading}>
                        {loading ? "Saving Changes..." : "Save Changes"}
                    </button>
                </form>
            )}

            {/* رسالة في حالة عدم وجود مستخدم بعد انتهاء التحميل */}
            {!loading && !user && !error && (
                <p>Could not load user profile. Please try again later.</p>
            )}
        </div>
    );
};

export default DoctorProfile;