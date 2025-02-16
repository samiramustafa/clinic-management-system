import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../component/Card";

function Details() {
    const [doctors, setDoctors] = useState([]);
    const [errors, setErrors] = useState([]);



    useEffect(() => {
        axios.get("https://retoolapi.dev/FvHpw0/doctors/1")
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
        </>
    )

}
export default Details