import axios from "axios";
import React, { useEffect, useState } from "react";
import Mycard from "../components/Mycard";
function ListDoctors(){
    const [doctors,setDoctors]=useState([]);
    const [errors,setErrors]=useState([]);


    useEffect (()=>{
        axios.get("https://retoolapi.dev/FvHpw0/doctors")
        .then((response)=> {
            setDoctors(response.data)})
        .catch((error)=>setErrors("Error"))
    },[])

    return(
        <> 
        <div className="container-fluid py-5">
            <div className="container">
                    <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
                        <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Our Doctors</h5>
                        <h1 className="display-4">Qualified Healthcare Professionals</h1>
                    </div>       
       { doctors.map((doctor)=> {
              return (
                <Mycard
                key={doctor.id}
                img={doctor.img}
                name={doctor.full_name}
                Specialist={doctor.Specialization}
                />
                )
            })
        }
        </div>
        </div>
        </>
    )

}
export  default ListDoctors