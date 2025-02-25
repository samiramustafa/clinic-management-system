import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../component/Card";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Feedback from "../feedback/feedback";
import FeedbackList from '../feedback/feedbacklist'

function Details() {
    const [doctors, setDoctors] = useState([]);
    const [errors, setErrors] = useState([]);
    
    const {id}=useParams()



    useEffect(() => {
        axios.get("https://retoolapi.dev/FvHpw0/doctors/"+id)
            .then((response) => { setDoctors(response.data) })
            .catch((error) => setErrors("Error"))
    }, [])
    return (
        <>
            <p className="text text-dark fw-bold fs-2 text-center mt-5"> {doctors.full_name}</p>
            <Card
                img={doctors.img}
                name={doctors.full_name}
                specialization={doctors.Specialization}
                fees={doctors.fees}
            />
            <FeedbackList
                doc_id={id}

            />
            <Feedback/>
        </>
    )

}
export default Details