
// import React, { useEffect, useState } from "react";
// import axios from "axios"; 
// import Title from "../component/Title"; 
// import InputField from "../component/Input"; 

// const DoctorProfile = () => {
//     const [user, setUser] = useState(null); 
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [formData, setFormData] = useState({
//         full_name: "",
//         phone_number: "",
//         // يمكنك إضافة حقول أساسية أخرى هنا لو أردت تعديلها

//         // بيانات بروفايل المريض (استخدم نفس اسم المفتاح اللي الباك اند بيتوقعه: patient_profile)
//         patient_profile: {
//             birth_date: "",
//             medical_history: "",
//             gender: "male", // أو القيمة الافتراضية من الباك إند
//         },
//         // بيانات بروفايل الطبيب (استخدم نفس اسم المفتاح اللي الباك اند بيتوقعه: doctor_profile)
//         doctor_profile: {
//             speciality: "",
//             description: "",
//             fees: "",
//             image: null, // رابط الصورة للعرض، لا نرسل الملف هنا
//         }
//     });
//     const [loading, setLoading] = useState(true); // يبدأ true لجلب البيانات الأولية
//     const [error, setError] = useState(null); // لتخزين رسائل الخطأ
//     const token = localStorage.getItem("access_token"); // جلب التوكن

//     // --- useEffect لجلب بيانات المستخدم عند تحميل المكون ---
//     useEffect(() => {
//         if (!token) {
//             setError("Authentication token not found. Please login.");
//             setLoading(false); // أوقف التحميل
//             return;
//         }

//         setLoading(true); // ابدأ التحميل
//         setError(null); // امسح أي خطأ سابق

//         axios.get("http://127.0.0.1:8000/api/users/me/", { // استخدم المسار الصحيح لـ API
//             headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => {
//             const userData = response.data;
//             setUser(userData); // خزن بيانات المستخدم الأصلية

//             // تهيئة formData بالبيانات المستلمة
//             let initialFormData = {
//                 full_name: userData.full_name || "",
//                 phone_number: userData.phone_number || "",
//                 // قيم افتراضية أولية للبروفايلات
//                 patient_profile: { birth_date: "", medical_history: "", gender: "male" },
//                 doctor_profile: { speciality: "", description: "", fees: "", image: null }
//             };

//             // املأ بيانات البروفايل الصحيحة بناءً على الدور
//             if (userData.role === 'patient' && userData.patient_profile) {
//                 initialFormData.patient_profile = {
//                     birth_date: userData.patient_profile.birth_date || "", // تأكد YYYY-MM-DD
//                     medical_history: userData.patient_profile.medical_history || "",
//                     gender: userData.patient_profile.gender || "male"
//                 };
//             } else if (userData.role === 'doctor' && userData.doctor_profile) {
//                 initialFormData.doctor_profile = {
//                     speciality: userData.doctor_profile.speciality || "",
//                     description: userData.doctor_profile.description || "",
//                     fees: userData.doctor_profile.fees || "",
//                     image: userData.doctor_profile.image || null // رابط الصورة المستلم للعرض
//                 };
//             }

//             setFormData(initialFormData); // اضبط حالة الفورم

//         })
//         .catch((error) => {
//             console.error("Error fetching profile:", error);
//             const errorMsg = error.response?.data?.detail || error.message || "Failed to load profile data.";
//             setError(errorMsg);
//         })
//         .finally(() => {
//             setLoading(false); // انهي التحميل دائماً
//         });

//     }, [token]); // يعتمد فقط على التوكن

//     // --- Handlers لتغيير بيانات الفورم ---

//     // للبيانات الأساسية (مثل full_name, phone_number)
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     // لبيانات بروفايل المريض (مثل birth_date, gender)
//     const handlePatientProfileChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             patient_profile: {
//                 ...prev.patient_profile,
//                 [name]: value
//             }
//         }));
//     };

//     // لبيانات بروفايل الطبيب (مثل speciality, fees)
//     const handleDoctorProfileChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             doctor_profile: {
//                 ...prev.doctor_profile,
//                 [name]: value
//             }
//         }));
//     };

//     // --- Handler لتقديم الفورم (Update) ---
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!token || !user) {
//             setError("Cannot update profile. User data or token missing.");
//             return;
//         }

//         setLoading(true); // ابدأ التحميل لعملية التحديث
//         setError(null); // امسح الأخطاء القديمة
//         setSuccessMessage(null);
//         // بناء الـ Payload الصحيح للـ PUT request
//         let requestData = {
//             full_name: formData.full_name,
//             phone_number: formData.phone_number,
//             // أضف أي حقول أساسية أخرى قمت بتعديلها هنا
//         };

//         // إضافة بيانات البروفايل المتداخلة حسب الدور
//         if (user.role === 'patient') {
//             requestData.patient_profile = {
//                ...formData.patient_profile,
//                birth_date: formData.patient_profile.birth_date || null // أرسل null لو فارغ
//             };
//         } else if (user.role === 'doctor') {
//             requestData.doctor_profile = {
//                 ...formData.doctor_profile,
//                 fees: formData.doctor_profile.fees || null, // أرسل null لو فارغ
//                 image: undefined // لا نرسل الصورة في طلب JSON
//             };
//             // حذف مفتاح الصورة إذا لم نرد تحديثه عبر JSON
//             delete requestData.doctor_profile.image;
//         }

//         console.log("Sending update data:", JSON.stringify(requestData, null, 2)); // للتحقق

//         try {
//             const response = await axios.put(
//                 "http://127.0.0.1:8000/api/users/me/", // مسار التحديث
//                 requestData, // البيانات المبنية بشكل صحيح
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json' // مهم جداً لطلبات PUT/POST بدون ملفات
//                     }
//                 }
//             );

//             // تحديث الحالة بعد النجاح
//             const updatedUserData = response.data;
//             setUser(updatedUserData); // حدث بيانات المستخدم الأساسية في العرض

//             // حدث formData أيضاً ليعكس التغييرات المحفوظة
//             let updatedFormDataState = {
//                  full_name: updatedUserData.full_name || "",
//                  phone_number: updatedUserData.phone_number || "",
//                  patient_profile: { birth_date: "", medical_history: "", gender: "male" },
//                  doctor_profile: { speciality: "", description: "", fees: "", image: null }
//             };
//              if (updatedUserData.role === 'patient' && updatedUserData.patient_profile) {
//                   updatedFormDataState.patient_profile = updatedUserData.patient_profile;
//              } else if (updatedUserData.role === 'doctor' && updatedUserData.doctor_profile) {
//                   // تأكد من نسخ كل الحقول من الرد
//                    updatedFormDataState.doctor_profile = {
//                       ...updatedUserData.doctor_profile, // انسخ كل شيء من الرد
//                       image: updatedUserData.doctor_profile?.image || null // احتفظ بالرابط المستلم
//                    };
//              }
//             setFormData(updatedFormDataState);


//             setSuccessMessage("Profile updated successfully!");
//             setTimeout(() => setSuccessMessage(null), 3000);

//         } catch (error) {
//             console.error("Update error:", error.response?.data || error.message);
//             let errorDetail = "Failed to update profile.";
//             if (error.response?.data) {
//                  try {
//                      // محاولة استخراج الأخطاء بشكل مفصل
//                      const errors = error.response.data;
//                      errorDetail = Object.entries(errors).map(([key, value]) =>
//                         `${key}: ${Array.isArray(value) ? value.join(', ') : value}`
//                      ).join('; ');
//                  } catch {
//                      try { // محاولة استخراج خطأ عام detail
//                         errorDetail = error.response.data.detail || JSON.stringify(error.response.data);
//                      } catch {
//                         errorDetail = "An unexpected error format was received from the server."
//                      }
//                  }
//             } else {
//                  errorDetail = error.message;
//             }
//             setError(`Update failed: ${errorDetail}`); // اعرض الخطأ للمستخدم
//         } finally {
//             setLoading(false); // انهي التحميل دائماً
//         }
//     };

//     // --- JSX Rendering ---
//     return (
//         <div className="container" style={{ maxWidth: "600px", margin: "50px auto" }}>
//             <Title titleName="My Profile" /> {/* عنوان أوضح */}

//             {successMessage && (
//                 <div className="alert alert-success alert-dismissible fade show" role="alert">
//                     {successMessage}
//                     <button
//                         type="button"
//                         className="btn-close"
//                         data-bs-dismiss="alert"
//                         aria-label="Close"
//                         onClick={() => setSuccessMessage(null)} // إخفاء الـ Alert عند الضغط على زر الإغلاق
//                     ></button>
//                 </div>
//             )}

//             {/* عرض رسائل الخطأ */}
//             {error && <div className="alert alert-danger">{error}</div>}

//             {/* عرض مؤشر التحميل */}
//             {loading && !user && <p>Loading profile...</p>} {/* التحميل الأولي */}

//             {/* عرض الفورم بعد انتهاء التحميل ووجود بيانات المستخدم */}
//             {!loading && user && (
//                 <form onSubmit={handleSubmit}>
//                     {/* --- البيانات الأساسية --- */}
//                     <fieldset className="border p-3 mb-3">
//                          <legend className="w-auto px-2">Basic Information</legend>
//                          <div className="mb-3">
//                             <label className="form-label fw-bold">Full Name:</label>
//                             <InputField
//                                 type="text"
//                                 name="full_name"
//                                 value={formData.full_name}
//                                 onChange={handleChange}
//                                 required
//                             />
//                          </div>
//                          <div className="mb-3">
//                             <label className="form-label fw-bold">Phone Number:</label>
//                             <InputField
//                                 type="text" // أو tel
//                                 name="phone_number"
//                                 value={formData.phone_number}
//                                 onChange={handleChange}
//                                 required
//                             />
//                          </div>
//                          {/* يمكنك إضافة عرض لحقول أخرى غير قابلة للتعديل مثل username, email, national_id */}
//                          <p><span className="fw-bold">Username:</span> {user.username}</p>
//                          {user.national_id && <p><span className="fw-bold">National ID:</span> {user.national_id}</p>}
//                          <p><span className="fw-bold">Email:</span> {user.email || 'Not set'}</p>
//                          {console.log("User data:", user)} {/* للتحقق من البيانات */}

//                     </fieldset>


//                     {/* --- بيانات المريض (إذا كان مريضاً) --- */}
//                     {user.role === "patient" && (
//                         <fieldset className="border p-3 mb-3">
//                             <legend className="w-auto px-2">Patient Details</legend>
                         
//                             <div className="mb-3">
//                                 <label className="form-label fw-bold">Medical History:</label>
//                                 <textarea
//                                     className="form-control"
//                                     name="medical_history"
//                                     value={formData.patient_profile.medical_history || ''}
//                                     onChange={handlePatientProfileChange}
//                                     rows="3"
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label fw-bold">Gender:</label>
//                                 <select
//                                     className="form-select"
//                                     name="gender"
//                                     value={formData.patient_profile.gender || 'male'} // تأكد من القيمة
//                                     onChange={handlePatientProfileChange}
//                                 >
//                                     <option value="male">Male</option>
//                                     <option value="female">Female</option>
//                                     {/* <option value="M">Male</option> */}
//                                     {/* <option value="F">Female</option> */}
//                                 </select>
//                             </div>
//                         </fieldset>
//                     )}

//                     {/* --- بيانات الطبيب (إذا كان طبيباً) --- */}
//                     {user.role === "doctor" && (
//                         <fieldset className="border p-3 mb-3">
//                             <legend className="w-auto px-2">Doctor Details</legend>
//                             <div className="mb-3">
//                                 <label className="form-label fw-bold">Speciality:</label>
//                                 <InputField
//                                     type="text"
//                                     name="speciality"
//                                     value={formData.doctor_profile.speciality || ''}
//                                     onChange={handleDoctorProfileChange}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label fw-bold">Description:</label>
//                                 <textarea
//                                     className="form-control"
//                                     name="description"
//                                     value={formData.doctor_profile.description || ''}
//                                     onChange={handleDoctorProfileChange}
//                                     rows="3"
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label fw-bold">Fees:</label>
//                                 <InputField
//                                     type="number"
//                                     name="fees"
//                                     step="0.01"
//                                     value={formData.doctor_profile.fees || ''}
//                                     onChange={handleDoctorProfileChange}
//                                 />
//                             </div>
//                             {/* عرض الصورة الحالية (إذا وجدت) */}
//                             {formData.doctor_profile.image && typeof formData.doctor_profile.image === 'string' && (
//                                 <div className="mb-3">
//                                     <label className="form-label fw-bold">Current Profile Image:</label>
//                                     <div>
//                                         {/* تأكد من بناء الرابط بشكل صحيح */}
//                                         <img src={`http://127.0.0.1:8000${formData.doctor_profile.image}`} alt="Profile" style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover' }} />
//                                     </div>
//                                     <small>To change the image, please use the dedicated image upload section (if available).</small>
//                                 </div>
//                             )}
//                             {/* مكان لإضافة حقل تحميل صورة جديدة لو أردت (يتطلب تعديل handleSubmit) */}
//                         </fieldset>
//                     )}

//                     {/* زر التحديث */}
//                     <button className="btn btn-primary w-100 mt-3" type="submit" disabled={loading}>
//                         {loading ? "Saving Changes..." : "Save Changes"}
//                     </button>
//                 </form>
//             )}

//             {/* رسالة في حالة عدم وجود مستخدم بعد انتهاء التحميل */}
//             {!loading && !user && !error && (
//                 <p>Could not load user profile. Please try again later.</p>
//             )}
//         </div>
//     );
// };

// export default DoctorProfile;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../component/Title";
import InputField from "../component/Input";

// const specialitiesList = [ ... ]; // Define if needed

const DoctorProfile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        full_name: "",
        phone_number: "",
        patient_profile: {
            birth_date: "",
            medical_history: "",
            gender: "male",
        },
        doctor_profile: {
            speciality: "",
            description: "",
            fees: "",
            image: null,
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const token = localStorage.getItem("access_token");

    const validate = (field, value) => {
        let errorMsg = "";
        switch (field) {
            case "full_name":
                const trimmedValue = value.trim();
                if (!trimmedValue) {
                    errorMsg = "Full name is required";
                } else if (!/^[a-zA-Z\s]+$/.test(trimmedValue)) {
                    errorMsg = "Full name must contain letters and spaces only";
                } else {
                    const parts = trimmedValue.split(' ').filter(part => part.length > 0);
                    if (parts.length < 2) {
                        errorMsg = "Full name must consist of at least two parts";
                    } else if (!parts.every(part => part.length >= 3)) {
                        errorMsg = "Each part of the full name must be at least 3 characters long";
                    }
                }
                break;
            case "phone_number":
                if (!value.trim()) errorMsg = "Phone number is required";
                else if (!/^\d{11}$/.test(value)) errorMsg = "Phone number must be exactly 11 digits";
                break;
            case "birth_date":
                if (user?.role === 'patient' && value) {
                   const birthDate = new Date(value);
                   const currentDate = new Date();
                   if (birthDate > currentDate) {
                       errorMsg = "Date of birth cannot be in the future";
                   }
                }
                break;
            case "gender":
                 if (user?.role === 'patient' && !value) errorMsg = "Gender is required";
                 break;
            case "speciality":
                 if (user?.role === 'doctor' && !value.trim()) errorMsg = "Speciality is required";
                 break;
            case "fees":
                 const trimmedFees = String(value).trim();
                 if (user?.role === 'doctor') {
                      if (trimmedFees && isNaN(Number(trimmedFees))) {
                          errorMsg = "Fees must be a valid number.";
                      } else if (trimmedFees) {
                          const numericFees = Number(trimmedFees);
                          if (numericFees < 100) {
                              errorMsg = "Fees must be 100 or greater";
                          }
                      }
                      // Add this if fees become required:
                      // else if (!trimmedFees) {
                      //    errorMsg = "Fees are required";
                      // }
                 }
                 break;
            default:
                break;
        }
        return errorMsg;
    };

    useEffect(() => {
        if (!token) {
            setError("Authentication token not found. Please login.");
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        setErrors({});
        setTouched({});

        axios.get("http://127.0.0.1:8000/api/users/me/", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            const userData = response.data;
            setUser(userData);

            let initialFormData = {
                full_name: userData.full_name || "",
                phone_number: userData.phone_number || "",
                patient_profile: {
                    birth_date: "",
                    medical_history: "",
                    gender: "male",
                },
                doctor_profile: {
                    speciality: "",
                    description: "",
                    fees: "",
                    image: null,
                }
            };

            if (userData.role === 'patient' && userData.patient_profile) {
                initialFormData.patient_profile = {
                    birth_date: userData.patient_profile.birth_date || "",
                    medical_history: userData.patient_profile.medical_history || "",
                    gender: userData.patient_profile.gender || "male"
                };
            } else if (userData.role === 'doctor') {
                 let initialFees = "100"; // Default value
                 if (userData.doctor_profile?.fees !== null && userData.doctor_profile?.fees !== undefined) {
                     initialFees = String(userData.doctor_profile.fees);
                 }

                initialFormData.doctor_profile = {
                    speciality: userData.doctor_profile?.speciality || "",
                    description: userData.doctor_profile?.description || "",
                    fees: initialFees,
                    image: userData.doctor_profile?.image || null
                };
            }

            setFormData(initialFormData);
        })
        .catch((error) => {
            console.error("Error fetching profile:", error);
            const errorMsg = error.response?.data?.detail || error.message || "Failed to load profile data.";
            setError(errorMsg);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;

        if (name === "phone_number") {
            processedValue = value.replace(/\D/g, '');
            if (processedValue.length > 11) {
                 processedValue = processedValue.slice(0, 11);
            }
        }

        setFormData(prev => ({ ...prev, [name]: processedValue }));
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validate(name, processedValue) }));
    };

    const handlePatientProfileChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            patient_profile: {
                ...prev.patient_profile,
                [name]: value
            }
        }));
        const fieldKey = `patient_profile.${name}`;
        setTouched(prev => ({ ...prev, [fieldKey]: true }));
        setErrors(prev => ({ ...prev, [fieldKey]: validate(name, value) }));
    };

    const handleDoctorProfileChange = (e) => {
        const { name, value } = e.target;
         let processedValue = value;

        if (name === "fees") {
             processedValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        }

        setFormData(prev => ({
            ...prev,
            doctor_profile: {
                ...prev.doctor_profile,
                [name]: processedValue
            }
        }));
        const fieldKey = `doctor_profile.${name}`;
        setTouched(prev => ({ ...prev, [fieldKey]: true }));
        setErrors(prev => ({ ...prev, [fieldKey]: validate(name, processedValue) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token || !user) {
            setError("Cannot update profile. User data or token missing.");
            return;
        }

        const currentFormData = formData;
        const newErrors = {};
        let hasErrors = false;

        const topLevelFields = ['full_name', 'phone_number'];
        topLevelFields.forEach(field => {
            const error = validate(field, currentFormData[field]);
            if (error) {
                newErrors[field] = error;
                hasErrors = true;
            }
        });

        if (user.role === 'patient') {
            const patientFields = ['birth_date', 'gender'];
            patientFields.forEach(field => {
                 const fieldKey = `patient_profile.${field}`;
                 const error = validate(field, currentFormData.patient_profile[field]);
                 if (error) {
                     newErrors[fieldKey] = error;
                     hasErrors = true;
                 }
            });
        } else if (user.role === 'doctor') {
            const doctorFields = ['speciality', 'fees', /* 'description' */ ];
            doctorFields.forEach(field => {
                const fieldKey = `doctor_profile.${field}`;
                const error = validate(field, currentFormData.doctor_profile[field]);
                if (error) {
                    newErrors[fieldKey] = error;
                    hasErrors = true;
                }
            });
        }

        const allTouched = {};
        Object.keys(currentFormData).forEach(key => {
            if (key === 'patient_profile' || key === 'doctor_profile') {
                 Object.keys(currentFormData[key]).forEach(subKey => {
                     if (subKey !== 'image'){
                          allTouched[`${key}.${subKey}`] = true;
                     }
                 });
            } else if (key !== 'image') {
                 allTouched[key] = true;
            }
        });
        setTouched(allTouched);
        setErrors(newErrors);

        if (hasErrors) {
            setError("Please fix the errors in the form.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        let requestData = {
            full_name: formData.full_name,
            phone_number: formData.phone_number,
        };

        if (user.role === 'patient') {
             requestData.patient_profile = {
                 birth_date: formData.patient_profile.birth_date || null,
                 medical_history: formData.patient_profile.medical_history,
                 gender: formData.patient_profile.gender,
            };
        } else if (user.role === 'doctor') {
             requestData.doctor_profile = {
                speciality: formData.doctor_profile.speciality,
                description: formData.doctor_profile.description,
                fees: formData.doctor_profile.fees === "" ? null : Number(formData.doctor_profile.fees),
            };
        }

        console.log("Sending update data (JSON):", JSON.stringify(requestData, null, 2));

        try {
            const response = await axios.put(
                "http://127.0.0.1:8000/api/users/me/",
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const updatedUserData = response.data;
            setUser(updatedUserData);

            let updatedFormDataState = {
                full_name: updatedUserData.full_name || "",
                phone_number: updatedUserData.phone_number || "",
                patient_profile: { birth_date: "", medical_history: "", gender: "male" },
                doctor_profile: { speciality: "", description: "", fees: "100", image: null }
            };
             if (updatedUserData.role === 'patient' && updatedUserData.patient_profile) {
                 updatedFormDataState.patient_profile = {
                      ...updatedUserData.patient_profile,
                      birth_date: updatedUserData.patient_profile.birth_date || "",
                 };
             } else if (updatedUserData.role === 'doctor' && updatedUserData.doctor_profile) {
                 updatedFormDataState.doctor_profile = {
                     ...updatedUserData.doctor_profile,
                     fees: updatedUserData.doctor_profile.fees !== null ? String(updatedUserData.doctor_profile.fees) : "100",
                     image: updatedUserData.doctor_profile.image || null
                 };
             } else if (updatedUserData.role === 'doctor' && !updatedUserData.doctor_profile) {
                 // Ensure fees defaults if profile is somehow null after update
                 updatedFormDataState.doctor_profile.fees = "100";
             }

            setFormData(updatedFormDataState);
            setTouched({});
            setErrors({});

            setSuccessMessage("Profile updated successfully!");
            setTimeout(() => setSuccessMessage(null), 3000);

        } catch (err) {
            console.error("Update error:", err.response?.data || err.message);
            let errorDetail = "Failed to update profile.";
            if (err.response?.data) {
                try {
                    const backendErrors = err.response.data;
                    if (typeof backendErrors === 'object' && backendErrors !== null) {
                       const fieldErrors = [];
                       const generalErrors = [];
                       Object.entries(backendErrors).forEach(([key, value]) => {
                           const formattedValue = Array.isArray(value) ? value.join(', ') : value;
                           if (key === 'non_field_errors' || key === 'detail'){
                               generalErrors.push(formattedValue)
                           } else {
                               const frontendKey = key.includes('.') ? key : (user?.role === 'doctor' && ['speciality', 'description', 'fees'].includes(key) ? `doctor_profile.${key}` : (user?.role === 'patient' && ['birth_date', 'medical_history', 'gender'].includes(key) ? `patient_profile.${key}` : key));
                               fieldErrors.push(`${key}: ${formattedValue}`);
                               setErrors(prev => ({...prev, [frontendKey]: formattedValue}));
                           }
                       });
                        errorDetail = generalErrors.length > 0 ? generalErrors.join(' ') : fieldErrors.join('; ');
                        if (!errorDetail) errorDetail = "An unknown error occurred.";

                    } else {
                       errorDetail = String(backendErrors);
                    }
                } catch {
                    errorDetail = "Could not parse error response from server.";
                }
            } else {
                errorDetail = err.message;
            }
            setError(`Update failed: ${errorDetail}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: "700px", margin: "50px auto" }}>
            <Title titleName="My Profile" />

            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {successMessage}
                    <button type="button" className="btn-close" onClick={() => setSuccessMessage(null)} aria-label="Close"></button>
                </div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}

            {loading && !user && <div className="text-center p-4"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>}

            {!loading && user && (
                <form onSubmit={handleSubmit} noValidate>
                    <fieldset className="border p-3 mb-3 rounded">
                         <legend className="w-auto px-2 fs-5 fw-bold">Basic Information</legend>
                         <p><span className="fw-bold">Username:</span> {user.username}</p>
                         {user.national_id && <p><span className="fw-bold">National ID:</span> {user.national_id}</p>}
                         <p><span className="fw-bold">Email:</span> {user.email || 'Not set'}</p>

                         <InputField
                             label="Full Name"
                             name="full_name"
                             value={formData.full_name}
                             onChange={handleChange}
                             isInvalid={touched.full_name && !!errors.full_name}
                             feedback={errors.full_name}
                             required
                         />
                         <InputField
                             label="Phone Number"
                             name="phone_number"
                             type="tel"
                             value={formData.phone_number}
                             onChange={handleChange}
                             maxLength={11}
                             isInvalid={touched.phone_number && !!errors.phone_number}
                             feedback={errors.phone_number}
                             required
                         />
                    </fieldset>

                    {user.role === "patient" && (
                        <fieldset className="border p-3 mb-3 rounded">
                             <legend className="w-auto px-2 fs-5 fw-bold">Patient Details</legend>

                             <div className="mb-3">
                                <label htmlFor="patient_birth_date" className="form-label fw-bold">Date of Birth:</label>
                                <input
                                    type="date"
                                    id="patient_birth_date"
                                    className={`form-control ${touched['patient_profile.birth_date'] && errors['patient_profile.birth_date'] ? 'is-invalid' : touched['patient_profile.birth_date'] && formData.patient_profile.birth_date ? 'is-valid' : ''}`}
                                    name="birth_date"
                                    value={formData.patient_profile.birth_date || ''}
                                    onChange={handlePatientProfileChange}
                                     max={new Date().toISOString().split("T")[0]}
                                />
                                {touched['patient_profile.birth_date'] && errors['patient_profile.birth_date'] && <div className="invalid-feedback">{errors['patient_profile.birth_date']}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="patient_medical_history" className="form-label fw-bold">Medical History:</label>
                                <textarea
                                    id="patient_medical_history"
                                    className="form-control"
                                    name="medical_history"
                                    value={formData.patient_profile.medical_history || ''}
                                    onChange={handlePatientProfileChange}
                                    rows="4"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="patient_gender" className="form-label fw-bold">Gender:</label>
                                <select
                                    id="patient_gender"
                                    className={`form-select ${touched['patient_profile.gender'] && errors['patient_profile.gender'] ? 'is-invalid' : touched['patient_profile.gender'] ? 'is-valid' : ''}`}
                                    name="gender"
                                    value={formData.patient_profile.gender || 'male'}
                                    onChange={handlePatientProfileChange}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {touched['patient_profile.gender'] && errors['patient_profile.gender'] && <div className="invalid-feedback">{errors['patient_profile.gender']}</div>}
                            </div>
                        </fieldset>
                    )}

                    {user.role === "doctor" && (
                        <fieldset className="border p-3 mb-3 rounded">
                            <legend className="w-auto px-2 fs-5 fw-bold">Doctor Details</legend>

                             <InputField
                                 label="Speciality"
                                 name="speciality"
                                 value={formData.doctor_profile.speciality || ''}
                                 onChange={handleDoctorProfileChange}
                                 isInvalid={touched['doctor_profile.speciality'] && !!errors['doctor_profile.speciality']}
                                 feedback={errors['doctor_profile.speciality']}
                                 required
                             />

                             <div className="mb-3">
                                <label htmlFor="doctor_description" className="form-label fw-bold">Description:</label>
                                <textarea
                                    id="doctor_description"
                                    className="form-control"
                                    name="description"
                                    value={formData.doctor_profile.description || ''}
                                    onChange={handleDoctorProfileChange}
                                    rows="4"
                                />
                             </div>

                             <InputField
                                label="Fees (EGP)"
                                name="fees"
                                type="text"
                                inputMode="decimal"
                                value={formData.doctor_profile.fees || ''}
                                onChange={handleDoctorProfileChange}
                                isInvalid={touched['doctor_profile.fees'] && !!errors['doctor_profile.fees']}
                                feedback={errors['doctor_profile.fees']}
                                min="100"
                             />

                            {formData.doctor_profile.image && typeof formData.doctor_profile.image === 'string' && (
                                <div className="mt-3 mb-3">
                                    <label className="form-label fw-bold d-block">Current Profile Image:</label>
                                    <img
                                       src={formData.doctor_profile.image.startsWith('http') ? formData.doctor_profile.image : `http://127.0.0.1:8000${formData.doctor_profile.image}`}
                                       alt="Profile"
                                       style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
                                       onError={(e) => { e.target.style.display='none'; }}
                                    />
                                     <small className="d-block text-muted mt-2">Changing the image requires a separate action.</small>
                                </div>
                            )}
                        </fieldset>
                    )}

                    <button className="btn btn-primary w-100 mt-3 fw-bold" type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Saving Changes...
                            </>
                         ) : "Save Changes"}
                    </button>
                </form>
            )}

            {!loading && !user && !error && (
                <p className="text-center text-muted">Could not load user profile. Please try refreshing the page or logging in again.</p>
            )}
        </div>
    );
};

export default DoctorProfile;