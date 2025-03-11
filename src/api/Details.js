

import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../component/Card";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Feedback from "../feedback/feedback";
import FeedbackList from '../feedback/feedbacklist'
import Appoint from "../component/Appoint";

function Details() {
    const [doctor, setDoctor] = useState(null);
    const [errors, setErrors] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://retoolapi.dev/FvHpw0/doctors/${id}`)
            .then((response) => {
                const doctorData = response.data;

                // Fetch feedback ratings
                axios.get("https://retoolapi.dev/yXHfgN/feeback_and_rating")
                    .then((rateResponse) => {
                        const ratesData = rateResponse.data;

                        // Find rating for the specific doctor
                        const doctorRate = ratesData.find(rate => rate.id === doctorData.id);
                        const updatedDoctor = { ...doctorData, rate: doctorRate ? doctorRate.rate : "No rating" };

                        setDoctor(updatedDoctor);
                    })
                    .catch(() => setErrors("Error fetching ratings"));
            })
            .catch(() => setErrors("Error fetching doctor details"));
    }, []);

    if (errors) {
        return <p className="text-danger text-center mt-5">{errors}</p>;
    }

    if (!doctor) {
        return <p className="text-muted text-center mt-5">Loading doctor details...</p>;
    }

    return (
        <>
            <p className="text text-dark fw-bold fs-2 text-center mt-5">
                {doctor.full_name}
            </p>
            <Card
                img={doctor.img}
                name={doctor.full_name}
                specialization={doctor.Specialization}
                fees={doctor.fees}
                rate={doctor.rate}
            />
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
            <Feedback />
        </>
    );
}

export default Details;


