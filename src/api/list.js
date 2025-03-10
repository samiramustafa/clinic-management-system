

import axios from "axios";
import React, { useEffect, useState } from "react";
import Mycard from "../component/Mycard";
import { useParams } from "react-router-dom";

function ListDoctors() {
    const [doctors, setDoctors] = useState([]);
    const [errors, setErrors] = useState([]);
    const { pageNumber } = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [filtereddoctor, setFiltereddoctor] = useState([]);
    const [currentdoctor, setCurrentdoctor] = useState(Number(pageNumber) || 1);
    const [doctoerperage] = useState(8);

    useEffect(() => {
        
        axios.get("https://retoolapi.dev/FvHpw0/doctors")
            .then((response) => {
                const doctorsData = response.data;

             
                axios.get("https://retoolapi.dev/yXHfgN/feeback_and_rating")
                    .then((rateResponse) => {
                        const ratesData = rateResponse.data;
                        console.log(ratesData)

                      
                        const updatedDoctors = doctorsData.map((doctor) => {
                            const doctorRate = ratesData.find(rate => rate.id === doctor.id);
                            return { ...doctor, rate: doctorRate ? doctorRate.rate : "No rate" }; 
                        });

                        setDoctors(updatedDoctors);
                        setFiltereddoctor(updatedDoctors);
                    })
                    .catch((error) => setErrors("Error fetching rates"));
            })
            .catch((error) => setErrors("Error fetching doctors"));
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term === "") {
            setFiltereddoctor(doctors);
        } else {
            const filtered = doctors.filter((doctor) =>
                doctor.full_name.toLowerCase().startsWith(term.toLowerCase())
            );
            setFiltereddoctor(filtered);
        }
    };

    const lastDoctorIndex = currentdoctor * doctoerperage;
    const firstDoctorIndex = lastDoctorIndex - doctoerperage;
    const currentDoctors = filtereddoctor.slice(firstDoctorIndex, lastDoctorIndex);

    const paginate = (pageNumber) => setCurrentdoctor(pageNumber);

    return (
        <div className="container">
            <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
                <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Our Doctors</h5>
                <h1 className="display-4">Qualified Healthcare Professionals</h1>
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or specialization"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {currentDoctors.map((doctor) => (
                    <div key={doctor.id} className="col " style={{ height: "600px" }}>
                        <Mycard
                            {...doctor}
                            path={`/Details/${doctor.id}`}
                            img={doctor.img}
                            name={doctor.full_name}
                            Specialist={doctor.Specialization}
                            isAvailable={doctor.isAvailable}
                           
                            rate={doctor.rate} 
                            style={{ height: "100%" }}
                        />
                    </div>
                ))}
            </div>

            <nav className="mt-4">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentdoctor === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => paginate(currentdoctor - 1)}>Previous</button>
                    </li>
                    {[...Array(Math.ceil(filtereddoctor.length / doctoerperage))].map((_, i) => (
                        <li key={i} className={`page-item ${currentdoctor === i + 1 ? "active" : ""}`}>
                            <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentdoctor === Math.ceil(filtereddoctor.length / doctoerperage) ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => paginate(currentdoctor + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default ListDoctors;


