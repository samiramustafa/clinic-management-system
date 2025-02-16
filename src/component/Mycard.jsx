
    // src={props.img} 
    //{props.name} 
    // {props.Specialist}
    //{props.fees}
    import React from "react";
    import { Link } from "react-router-dom";
    
    function Mycard(props) {
 
    
        return (
            <div className="card border-5 m-1" style={{ width: "20rem" }}>
                {props.img && <img src={props.img} className="card-img-top" alt="..." />}
                <div className="card-body">
          
                    {props.name && (
                        <>
                            <h3 className="card-title text-center"><b>Dr.</b>: {props.name} </h3>
                            <hr />
                        </>
                    )}
                    {props.Specialist && (
                        <>
                            <h5 className="card-text"><b>Specialist</b>: {props.Specialist}</h5>
                            <hr />
                        </>
                    )}
                   
                   
                    {props.vote_average && (
                        <>
                            <h5 className="card-text"><b>Vote Average</b>: {props.vote_average} ⭐</h5>
                            <hr />
                        </>
                    )}
                    {props.path && <Link to={props.path} className="btn btn-primary"><b>More Details</b></Link>}
                </div>
            </div>
        );
    }
    
    export default Mycard;
 