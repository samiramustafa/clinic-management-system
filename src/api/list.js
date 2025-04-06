// import { useState, useEffect, useCallback, useMemo } from "react";
// import axios from "axios";
// import Mycard from "../component/Mycard";
// import { useParams } from "react-router-dom";
// import { debounce } from 'lodash';


// function ListDoctors() {
//     const [doctors, setDoctors] = useState([]);
//     const [user, setUser] = useState([]);
//     const [filteredDoctors, setFilteredDoctors] = useState([]);
//     const [specializations, setSpecializations] = useState([]);
//     const [selectedSpecialization, setSelectedSpecialization] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const { pageNumber } = useParams();
//     const [currentPage, setCurrentPage] = useState(Number(pageNumber) || 1);
//     const doctorsPerPage = 8;
//     const [loading, setLoading] = useState(true);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);


//     useEffect(() => {
//         setLoading(true);
//         const token = localStorage.getItem("access_token"); 
//         const headers = { Authorization: `Bearer ${token}` }; 
//         Promise.all([
//             axios.get("http://127.0.0.1:8000/clinic/doctors/"),
//             axios.get("http://127.0.0.1:8000/clinic/users/", { headers }) ,

//         ])
//             .then(([doctorsResponse, usersResponse]) => {
//                 const doctorsData = doctorsResponse.data;
//                 const usersData = usersResponse.data;
//                 const updatedDoctors = doctorsData.map((doctor) => {
//                 const doctorUser = usersData.find(user => user.id === doctor.user);
           
//                     return {
//                         ...doctor,
//                         name: doctorUser ? doctorUser.full_name : "",
//                         city: doctorUser ? doctorUser.city: "",
//                         area: doctorUser ? doctorUser.area: "",

//                     };
//             });


//             setDoctors(updatedDoctors);
//             setFilteredDoctors(updatedDoctors);
//             const uniqueSpecializations = [...new Set(doctorsData.map(doctor => doctor.speciality))];
//             setSpecializations(uniqueSpecializations);
//         })
//         .catch(() => console.error("Failed to fetch data."))
//         .finally(() => setLoading(false));
//     }, []);


    

//     const handleSearch = useCallback(() => {
//         let filtered = doctors;

//         if (selectedSpecialization) {
//             filtered = filtered.filter(doctor => doctor.speciality === selectedSpecialization);
//         }

//         if (searchTerm) {
//             filtered = filtered.filter(doctor => doctor.name.toLowerCase().includes(searchTerm.toLowerCase()));
//         }

//         setFilteredDoctors(filtered);
//     }, [doctors, selectedSpecialization, searchTerm]);

//     const debouncedHandleSearch = useCallback(
//         debounce(() => {
//             handleSearch();
//         }, 300),
//         [handleSearch]
//     );

//     useEffect(() => {
//         debouncedHandleSearch();
//     }, [debouncedHandleSearch]);

//     const currentDoctors = useMemo(() => {
//         const lastDoctorIndex = currentPage * doctorsPerPage;
//         const firstDoctorIndex = lastDoctorIndex - doctorsPerPage;
//         return filteredDoctors.slice(firstDoctorIndex, lastDoctorIndex);
//     }, [filteredDoctors, currentPage, doctorsPerPage]);

//     const paginate = useCallback((pageNumber) => {
//         setCurrentPage(pageNumber);
//     }, []);

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     return (
//         <div className="container">
//             <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
//                 <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
//                     Our Doctors
//                 </h5>
//                 <h1 className="display-4">Qualified Healthcare Professionals</h1>
//             </div>


//             <div className="row mb-4 align-items-center">
//                 <div className="col-md-6 fs-4">
//                     <input
//                         type="text"
//                         className="form-control fs-5"
//                         placeholder="Search by name"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         style={{ height: '50px' }}
//                     />
//                 </div>

//                 <div className="col-md-6" >
//                     <div className="dropdown">
//                         <button
//                             className="btn btn-primary dropdown-toggle w-100 fw-bold fs-4"
//                             type="button"
//                             onClick={toggleDropdown}
//                             aria-expanded={isDropdownOpen}
//                             style={{ height: '50px' }}
//                         >
//                             {selectedSpecialization || "Select Specialization"}
//                         </button>
//                         <ul
//                             className={`dropdown-menu w-100 w-100 fw-bold fs-4 ${isDropdownOpen ? 'show' : ''}`}
//                             aria-labelledby="dropdownMenuButton"
//                         >
//                             <li>
//                                 <button
//                                     className="dropdown-item"
//                                     onClick={() => {
//                                         setSelectedSpecialization("");
//                                         setIsDropdownOpen(false);
//                                     }}
//                                 >
//                                     All Specializations
//                                 </button>
//                             </li>
//                             {specializations.map((spec, index) => (
//                                 <li key={index}>
//                                     <button
//                                         className="dropdown-item"
//                                         onClick={() => {
//                                             setSelectedSpecialization(spec);
//                                             setIsDropdownOpen(false);
//                                         }}
//                                     >
//                                         {spec}
//                                     </button>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>

//             </div>


//             {loading ? (
//                 <div className="text-center">Loading doctors...</div>
//             ) : currentDoctors.length === 0 ? (
//                 <div className="text-center">No doctors found matching your criteria.</div>
//             ) : (
//                 <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
//                     {currentDoctors.map((doctor) => (
//                         <div key={doctor.id} className="col" style={{ height: "600px" }}>
//                             <Mycard
//                                 {...doctor}
//                                 path={`/Details/${doctor.id}`}
//                                 img={doctor.image || "https://via.placeholder.com/150"}
//                                 name={doctor.name}
//                                 city={doctor.city}
//                                 area={doctor.area}
//                                 rate={doctor.average_rating >0 && doctor.average_rating  }
//                                 Specialist={doctor.speciality}
//                                 style={{ height: "100%" }}
//                             />
//                         </div>
//                     ))}
//                 </div>
//             )}


//             <nav className="mt-4">
//                 <ul className="pagination justify-content-center">
//                     <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//                         <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
//                     </li>
//                     {[...Array(Math.ceil(filteredDoctors.length / doctorsPerPage))].map((_, i) => (
//                         <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
//                             <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
//                         </li>
//                     ))}
//                     <li className={`page-item ${currentPage === Math.ceil(filteredDoctors.length / doctorsPerPage) ? "disabled" : ""}`}>
//                         <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// }

// export default ListDoctors;

import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Mycard from "../component/Mycard"; // تأكد أن المسار صحيح
import { useParams, useHistory } from "react-router-dom"; // أضفنا useNavigate للتنقل البرمجي عند الحاجة
import { debounce } from 'lodash';

function ListDoctors() {
    const [doctors, setDoctors] = useState([]); // سيحتوي على قائمة الأطباء بالبيانات الكاملة
    // const [user, setUser] = useState([]); // <--- ❌ لم نعد بحاجة لهذا
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { pageNumber } = useParams();
    const history = useHistory();  // للتنقل بين الصفحات برمجياً
    const [currentPage, setCurrentPage] = useState(Number(pageNumber) || 1);
    const doctorsPerPage = 8;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // لإظهار رسالة خطأ عند فشل التحميل
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // --- 👇 useEffect لجلب بيانات الأطباء فقط ---
    useEffect(() => {
        setLoading(true);
        setError(null); // إعادة تعيين الخطأ عند بدء تحميل جديد
        // const token = localStorage.getItem("access_token"); // <--- ❌ لا نحتاج للتوكن
        // const headers = { Authorization: `Bearer ${token}` }; // <--- ❌ لا نحتاج للهيدرز

        // --- طلب API واحد فقط ---
        axios.get("http://127.0.0.1:8000/api/doctors/") // تأكد أن هذا هو المسار الصحيح للـ DoctorViewSet في urls.py
            .then(response => {
                const doctorsData = response.data;
                // البيانات تأتي جاهزة الآن بالاسم والمدينة والمنطقة والتخصص...الخ
                setDoctors(doctorsData);
                setFilteredDoctors(doctorsData); // تهيئة القائمة المفلترة

                // استخلاص التخصصات الفريدة
                const uniqueSpecializations = [...new Set(doctorsData.map(doctor => doctor.speciality).filter(spec => spec))]; // filter(spec => spec) لإزالة القيم الفارغة
                setSpecializations(uniqueSpecializations);
            })
            .catch(err => { // التعامل مع الأخطاء
                console.error("Failed to fetch doctors data:", err.response?.data || err.message);
                setError("Sorry, we couldn't load the doctors at this time. Please try again later."); // رسالة للمستخدم
            })
            .finally(() => {
                setLoading(false);
            });

        // --- ❌ إزالة Promise.all وطلب /clinic/users/ ومنطق الدمج ---

    }, []); // [] يعني هذا الـ effect يعمل مرة واحدة عند تحميل الكومبوننت

    // --- 👇 دالة البحث والفلترة (مبسطة) ---
    const handleSearch = useCallback(() => {
        let filtered = doctors; // ابدأ بالقائمة الأصلية الكاملة

        // فلترة بالتخصص
        if (selectedSpecialization) {
            filtered = filtered.filter(doctor => doctor.speciality === selectedSpecialization);
        }

        // فلترة بالاسم (مع التأكد أن الاسم موجود)
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(doctor =>
                doctor.name && doctor.name.toLowerCase().includes(lowerSearchTerm)
            );
        }

        setFilteredDoctors(filtered);
        // إعادة التوجيه للصفحة الأولى عند تغيير الفلاتر أو البحث
        if (currentPage !== 1) {
            setCurrentPage(1);
            // اختياري: تحديث الـ URL إذا كنت تريد أن يعكس رقم الصفحة 1
            // navigate('/doctors/page/1'); // أو المسار المناسب عندك
        }
    }, [doctors, selectedSpecialization, searchTerm, currentPage]); // أضفنا currentPage للتحقق

    // --- 👇 Debounced Search Handler (كما هو) ---
    const debouncedHandleSearch = useCallback(
        debounce(() => {
            handleSearch();
        }, 300), // تأخير 300 ملي ثانية
        [handleSearch] // يعتمد على أحدث نسخة من handleSearch
    );

    // --- 👇 useEffect لتشغيل البحث الـ debounced عند تغيير الفلاتر ---
    useEffect(() => {
        debouncedHandleSearch();
        // تنظيف: إلغاء أي بحث مؤجل إذا تغيرت الفلاتر بسرعة أو تم إلغاء تحميل الكومبوننت
        return () => {
            debouncedHandleSearch.cancel();
        };
    }, [searchTerm, selectedSpecialization, doctors, debouncedHandleSearch]); // إعادة التشغيل عند تغير هذه القيم

    // --- 👇 حساب الأطباء للعرض في الصفحة الحالية (كما هو) ---
    const currentDoctors = useMemo(() => {
        const lastDoctorIndex = currentPage * doctorsPerPage;
        const firstDoctorIndex = lastDoctorIndex - doctorsPerPage;
        return filteredDoctors.slice(firstDoctorIndex, lastDoctorIndex);
    }, [filteredDoctors, currentPage, doctorsPerPage]);

    // --- 👇 دالة التنقل بين الصفحات (مع تحسينات وحدود) ---
    const paginate = useCallback((pageNumber) => {
        const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
        // التأكد أن رقم الصفحة ضمن الحدود
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            // اختياري: تحديث الـ URL ليعكس الصفحة الحالية
            // navigate(`/doctors/page/${pageNumber}`); // أو المسار المناسب عندك
            //スクロールをトップに戻す (Scroll to top - اختياري)
            window.scrollTo(0, 0);
        }
    }, [filteredDoctors.length, doctorsPerPage /*, navigate*/ ]); // أزل navigate إذا لم تستخدمه هنا

    // --- 👇 دالة فتح/إغلاق القائمة المنسدلة (كما هي) ---
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // --- 👇 JSX للعرض ---
    return (
        <div className="container mt-5"> {/* أضفت mt-5 للهامش العلوي */}
            {/* ... (جزء الـ Header كما هو) ... */}
            <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
                <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
                    Our Doctors
                </h5>
                <h1 className="display-4">Qualified Healthcare Professionals</h1>
            </div>

            {/* ... (جزء البحث والفلترة كما هو في التصميم، لكن الـ onChange تعمل الآن فقط) ... */}
            <div className="row mb-4 align-items-center">
                <div className="col-md-6 mb-3 mb-md-0 fs-4">
                    <input
                        type="text"
                        className="form-control fs-5"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // تحديث حالة البحث مباشرة
                        style={{ height: '50px' }}
                    />
                </div>
                <div className="col-md-6">
                    <div className="dropdown">
                        <button
                            className="btn btn-primary dropdown-toggle w-100 fw-bold fs-4"
                            type="button"
                            id="specializationDropdown" // Added ID for accessibility
                            onClick={toggleDropdown}
                            aria-expanded={isDropdownOpen}
                            style={{ height: '50px' }}
                        >
                            {selectedSpecialization || "Select Specialization"}
                        </button>
                        <ul
                            className={`dropdown-menu w-100 fw-bold fs-4 ${isDropdownOpen ? 'show' : ''}`}
                            aria-labelledby="specializationDropdown"
                        >
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => {
                                        setSelectedSpecialization(""); // اختيار "الكل"
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    All Specializations
                                </button>
                            </li>
                            {specializations.map((spec, index) => (
                                <li key={index}>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => {
                                            setSelectedSpecialization(spec); // اختيار تخصص معين
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {spec}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- 👇 عرض حالة التحميل أو الخطأ أو قائمة الأطباء --- */}
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading doctors...</span>
                    </div>
                </div>
            ) : error ? ( // <-- عرض رسالة الخطأ
                 <div className="text-center alert alert-danger" role="alert" style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     {error}
                 </div>
            ) : currentDoctors.length === 0 ? (
                <div className="text-center alert alert-info" role="alert" style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    No doctors found matching your criteria.
                </div>
            ) : (
                // --- عرض كروت الأطباء ---
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {currentDoctors.map((doctor) => (console.log(doctor),
                        <div key={doctor.id} className="col d-flex align-items-stretch"> {/* استخدام flex للمحاذاة */}
                            {/* --- 👇 تمرير الـ props بالأسماء الجديدة --- */}
                            <Mycard
                                id={doctor.id} // تمرير الـ ID إذا كان Mycard يستخدمه
                                path={`/Details/${doctor.id}`} // تأكد أن هذا المسار صحيح
                                img={doctor.image || "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=No+Image"} // صورة افتراضية أفضل
                                name={doctor.name || "Doctor Name Unavailable"} // اسم افتراضي أوضح
                                city={doctor.city || "-"} // استخدام "-" للقيم الفارغة قد يكون أفضل من N/A
                                area={doctor.area || "-"}
                                // تأكد من أن average_rating هو الاسم الصحيح من السيريالايزر
                                rate={doctor.average_rating != null && doctor.average_rating > 0 ? doctor.average_rating : null} // التعامل مع null و 0
                                Specialist={doctor.speciality || "General"} // تخصص افتراضي
                                // مرر أي props أخرى يحتاجها Mycard (مثل phone_number لو أضفته)
                                // phone={doctor.phone_number || "-"}
                                rate={doctor.average_rating > 0 ? doctor.average_rating : null} // التعامل مع null و 0
                                fees={doctor.fees || "N/A"} 
                                description={doctor.description || "No description available."} // وصف افتراضي
                                style={{ height: "100%" }} // للتأكد أن الكارت يملأ المساحة العمودية
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* --- 👇 عرض الـ Pagination (فقط إذا كان هناك أكثر من صفحة) --- */}
            {!loading && !error && filteredDoctors.length > doctorsPerPage && (
                <nav className="mt-5" aria-label="Doctors pagination">
                    <ul className="pagination justify-content-center flex-wrap"> {/* flex-wrap للصفحات الكثيرة */}
                        {/* زر السابق */}
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                                <span aria-hidden="true">«</span>
                            </button>
                        </li>
                        {/* أرقام الصفحات */}
                        {[...Array(Math.ceil(filteredDoctors.length / doctorsPerPage)).keys()].map((number) => {
                            const pageNum = number + 1;
                            // يمكنك إضافة منطق هنا لعرض عدد محدود من أرقام الصفحات إذا كانت كثيرة جداً
                            return (
                                <li key={pageNum} className={`page-item ${currentPage === pageNum ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => paginate(pageNum)}>
                                        {pageNum}
                                    </button>
                                </li>
                            );
                        })}
                        {/* زر التالي */}
                        <li className={`page-item ${currentPage === Math.ceil(filteredDoctors.length / doctorsPerPage) ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => paginate(currentPage + 1)} aria-label="Next">
                                <span aria-hidden="true">»</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}

export default ListDoctors;