
    // src={props.img} 
    //{props.name} 
    // {props.Specialist}
    //{props.fees}
    import React from "react";
    import { Link } from "react-router-dom";
    // import axios from "axios";
import  {  useState } from "react";
    function Mycard(props) {

         //feed back api
            const [feedbacks, setFeedbacks] = useState([]);
                // const [errors, setErrors] = useState([]);
            
        
        
            // useEffect(() => {
            //     axios.get("https://retoolapi.dev/yXHfgN/feeback_and_rating")
            //         .then((response) => {
            //           setFeedbacks(response.data)
            //         })
            //         .catch((error) => setErrors("Error"))
            // }, [])
    
        return (
            <Link to={props.path} style={{ textDecoration: "none" }}>
            <div className="card border-5 h-60 "  style={{ height: "600px" }}>
                {props.img && <img src={props.img} className="card-img-top" alt="..." />}
                <div className="card-body">
          
                    {props.name && (
                        <>
                            <p className="card-title  fs-3 "> <b>Dr. </b> {props.name} </p>
                         <br></br>
                        </>
                    )}
                    {props.Specialist && (
                        <>
                            <p className="card-text fs-4"> Specialist {props.Specialist}</p>
                  
                        </>
                    )}
                    {/* <i class="bi bi-check text-success fs-5"></i> */}
                    {/* style={{ color: "#2ec742", fontSize: "12px" }} */}
                    {props.isAvailable && (
                        <>
                            <p className="card-text " style={{ color: "#2ec738", fontSize: "16px" }}><i className="bi bi-record-circle-fill " ></i><b> Available</b> {props.isAvailable}
                            
                            </p>
                  
                        </>
                    )}
            
                    <i className="bi bi-star-fill text-warning px-1"></i>
                    <i className="bi bi-star text-warning px-1" ></i>
                    <i className="bi bi-star text-warning px-1" ></i>
                    <i className="bi bi-star text-warning px-1" ></i>
                    <i className="bi bi-star text-warning px-1" ></i>
                   
                   
                    {props.rate && (
                        <>
                            <h5 className="card-text"><b
                            ><i className="bi bi-star"></i>
                            </b>: {props.vote_average} </h5>
                            <hr />
                        </>
                    )}
                </div>
            </div>
            </Link>
        );
    }
    
    export default Mycard;
 