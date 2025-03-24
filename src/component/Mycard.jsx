

import React from "react";
import { Link } from "react-router-dom";

import { useState } from "react";
function Mycard(props) {

   

    return (
        // style={{ textDecoration: "none" }}
        <Link to={props.path} style={{ textDecoration: "none" }}>
            <div className="card border-5 h-100 w-100">
                {props.img && (
                    <img
                        src={props.img}
                        className="card-img-top img-fluid"
                        alt="Doctor"
                        style={{ objectFit: "cover", height: "300px" }}
                    />
                )}
                <div className="card-body d-flex flex-column flex-grow-1">
                    {props.name && (
                        <p className="card-title fs-3">
                            <b>DR.<span className="text-capitalize">{props.name}</span></b>
                        </p>
                        
                    )}

                    {props.Specialist && (
                        <p className="card-text fs-4">
                            <i class="bi bi-prescription2 text-primary"></i> 
                             {props.Specialist}</p>
                    )}
                    {props.clinicAddress && (
                        <p className="card-text fs-4"><i class="bi bi-geo-alt text-primary"></i> {props.clinicAddress}</p>
                    )}
                    {/* <i class="bi bi-check text-success fs-5"></i> */}
                    {/* style={{ color: "#2ec742", fontSize: "12px" }} */}
                    {props.isAvailable && (
                        <p className="card-text text-success">
                            <i className="bi bi-record-circle-fill"></i> <b>Available</b>
                        </p>
                    )}
                    

                  
                    <div className="mt-auto">
                       
                          {props.rate && (
                        <p className="text-warning fs-5">
                            {"⭐".repeat(props.rate)}{" "}
                            <div className="text-muted fs-6">overall rating({props.rate}/5)</div>
                        </p>
                    )}

                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Mycard;


// import React from "react";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// function Mycard(props) {
//     const [feedbacks, setFeedbacks] = useState([]);

//     return (
//         <Link to={props.path} style={{ textDecoration: "none" }}>
//             <div className="card border-5 h-100 w-100">
//                 {props.img && (
//                     <img
//                         src={props.img}
//                         className="card-img-top img-fluid"
//                         alt="Doctor"
//                         style={{ objectFit: "cover", height: "300px" }}
//                     />
//                 )}
//                 <div className="card-body d-flex flex-column flex-grow-1">
//                     {props.name && (
//                         <p className="card-title fs-3">
//                             <b>Dr. </b> {props.name}
//                         </p>
//                     )}
//                     {props.Specialist && (
//                         <p className="card-text fs-4">Specialist: {props.Specialist}</p>
//                     )}
//                     {props.isAvailable && (
//                         <p className="card-text text-success">
//                             <i className="bi bi-record-circle-fill"></i> <b>Available</b>
//                         </p>
//                     )}

//                     <div className="mt-auto">
//                         {/* Star rating */}
//                         <i className="bi bi-star-fill text-warning px-1"></i>
//                         <i className="bi bi-star text-warning px-1"></i>
//                         <i className="bi bi-star text-warning px-1"></i>
//                         <i className="bi bi-star text-warning px-1"></i>
//                         <i className="bi bi-star text-warning px-1"></i>

//                         {props.rate && (
//                             <h5 className="card-text">
//                                 <b><i className="bi bi-star"></i></b>: {props.vote_average}
//                             </h5>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     );
// }

// export default Mycard;
