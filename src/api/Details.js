import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../component/Card";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Feedback from "../component/Feedback";
import FeedbackList from '../component/FeedbackList';

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
            
            <Card
                img={doctors.img}
                name={doctors.full_name}
                specialization={doctors.Specialization}
                fees={doctors.fees}
            />
            <FeedbackList/>
            <Feedback/>
        </>
    )

}
export default Details