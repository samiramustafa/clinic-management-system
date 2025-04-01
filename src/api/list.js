import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Mycard from "../component/Mycard";
import { useParams } from "react-router-dom";
import { debounce } from 'lodash';


function ListDoctors() {
    const [doctors, setDoctors] = useState([]);
    const [user, setUser] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { pageNumber } = useParams();
    const [currentPage, setCurrentPage] = useState(Number(pageNumber) || 1);
    const doctorsPerPage = 8;
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("access_token"); // احصل على التوكن المخزن
        const headers = { Authorization: `Bearer ${token}` }; // أضفه في الـ Headers
        Promise.all([
            axios.get("http://127.0.0.1:8000/clinic/doctors/"),
            axios.get("http://127.0.0.1:8000/clinic/users/", { headers }) ,

        ])
            .then(([doctorsResponse, usersResponse]) => {
                const doctorsData = doctorsResponse.data;
                const usersData = usersResponse.data;
                console.log("Doctors Data:", doctorsData);
                console.log("Users Data:", usersData);
      
              



                const updatedDoctors = doctorsData.map((doctor) => {
                    const doctorUser = usersData.find(user => user.id === doctor.user);
                     console.log("Doctor User:", doctorUser);
                    // console.log("Doctor Image:", doctorUser ? doctorUser.profile_picture : "No Image Found");
           
                    return {
                        ...doctor,
                        name: doctorUser ? doctorUser.name : "Unknown",
                        img: doctorUser ? doctorUser.profile_picture : "",
                    };
                });
         

                setDoctors(updatedDoctors);
                console.log("updatedDoctors", updatedDoctors)
                // console.log("Doctors", doctors)




                setFilteredDoctors(updatedDoctors);

                const uniqueSpecializations = [...new Set(doctorsData.map(doctor => doctor.specialization))];
                setSpecializations(uniqueSpecializations);
            })
            .catch(() => console.error("Failed to fetch data."))
            .finally(() => setLoading(false));
    }, []);


    

    const handleSearch = useCallback(() => {
        let filtered = doctors;

        if (selectedSpecialization) {
            filtered = filtered.filter(doctor => doctor.specialization === selectedSpecialization);
        }

        if (searchTerm) {
            filtered = filtered.filter(doctor => doctor.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        setFilteredDoctors(filtered);
    }, [doctors, selectedSpecialization, searchTerm]);

    const debouncedHandleSearch = useCallback(
        debounce(() => {
            handleSearch();
        }, 300),
        [handleSearch]
    );

    useEffect(() => {
        debouncedHandleSearch();
    }, [debouncedHandleSearch]);

    const currentDoctors = useMemo(() => {
        const lastDoctorIndex = currentPage * doctorsPerPage;
        const firstDoctorIndex = lastDoctorIndex - doctorsPerPage;
        return filteredDoctors.slice(firstDoctorIndex, lastDoctorIndex);
    }, [filteredDoctors, currentPage, doctorsPerPage]);

    const paginate = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="container">
            <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
                <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
                    Our Doctors
                </h5>
                <h1 className="display-4">Qualified Healthcare Professionals</h1>
            </div>


            <div className="row mb-4 align-items-center">
                <div className="col-md-6 fs-4">
                    <input
                        type="text"
                        className="form-control fs-5"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ height: '50px' }}
                    />
                </div>

                <div className="col-md-6" >
                    <div className="dropdown">
                        <button
                            className="btn btn-primary dropdown-toggle w-100 fw-bold fs-4"
                            type="button"
                            onClick={toggleDropdown}
                            aria-expanded={isDropdownOpen}
                            style={{ height: '50px' }}
                        >
                            {selectedSpecialization || "Select Specialization"}
                        </button>
                        <ul
                            className={`dropdown-menu w-100 w-100 fw-bold fs-4 ${isDropdownOpen ? 'show' : ''}`}
                            aria-labelledby="dropdownMenuButton"
                        >
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => {
                                        setSelectedSpecialization("");
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
                                            setSelectedSpecialization(spec);
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


            {loading ? (
                <div className="text-center">Loading doctors...</div>
            ) : currentDoctors.length === 0 ? (
                <div className="text-center">No doctors found matching your criteria.</div>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {currentDoctors.map((doctor) => (console.log(doctor),
                        <div key={doctor.id} className="col" style={{ height: "600px" }}>
                            <Mycard
                                {...doctor}
                                path={`/Details/${doctor.id}`}
                                img={doctor.image || "https://via.placeholder.com/150"}
                                name={doctor.username}
                                Specialist={doctor.speciality}
                                rate={doctor.average_rating}
                                style={{ height: "100%" }}
                            />
                        </div>
                    ))}
                </div>
            )}


            <nav className="mt-4">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                    </li>
                    {[...Array(Math.ceil(filteredDoctors.length / doctorsPerPage))].map((_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                            <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === Math.ceil(filteredDoctors.length / doctorsPerPage) ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default ListDoctors;