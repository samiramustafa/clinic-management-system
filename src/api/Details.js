

import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../component/Card";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Feedback from "../feedback/feedback";
import FeedbackList from '../feedback/feedbacklist'
import Appoint from "../appointment/Appoint";

function Details() {
    const [doctor, setDoctor] = useState(null);  
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState(null);
    const { id } = useParams();

          // axios.get("http://127.0.0.1:8000/clinic/feedbacks/")
                //     .then((rateResponse) => {
                //         const ratesData = rateResponse.data;

                //         // Find rating for the specific doctor
                //         const doctorRate = ratesData.find(rate => rate.id === doctorData.id);
                //         const updatedDoctor = { ...doctorData, rate: doctorRate ? doctorRate.rate : "No rating" };

                //         setDoctor(updatedDoctor);
                //     })
                //     .catch(() => setErrors("Error fetching ratings"));

                useEffect(() => {
                    
                    axios.get(`http://127.0.0.1:8000/clinic/doctors/${id}/`)
                        .then((response) => {
                        setDoctor(response.data);
                        const token = localStorage.getItem("access_token"); 
                        const headers = { Authorization: `Bearer ${token}` }; 

                            return axios.get(`http://127.0.0.1:8000/clinic/users/${response.data.user}`, { headers });

                        })
                        .then((userResponse) => {
                            setUser(userResponse.data);
                        })
                        .catch(() => setErrors("Error fetching doctor details"));
                }, [id]);
                

    if (errors) {
        return <p className="text-danger text-center mt-5">{errors}</p>;
    }

    if (!doctor || !user) {
        return <p className="text-muted text-center mt-5">Loading doctor details...</p>;
    }

    return (
        <>
           
            <Card
                img={doctor.image || "https://via.placeholder.com/150"}
                name={user.full_name}  
                specialization={doctor.speciality}
                description={doctor.description}  
                city={user.city}
                area={user.area} 
                fees={doctor.fees}
                rate={doctor.average_rating>0 && doctor.average_rating  }

            />
            {/* <Feedback /> */}
            <div className="w-50 mx-auto">
                <hr className="border border-primary opacity-75" />
            </div>
            <Appoint />
            <div className="w-50 mx-auto">
                <hr className="border border-primary opacity-75" />
            </div>
            <FeedbackList doc_id={id} />
            <div className="w-50 mx-auto mt-5">
                <hr className="border border-primary opacity-75" />
            </div>
            
        </>
    );
}

export default Details;


