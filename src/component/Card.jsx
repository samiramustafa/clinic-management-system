import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Feedback from "../feedback/feedback";

function Card(props) {
    return (
        <div className="container-fluid py-5">
            <div className="container">
                <div className="owl-carousel team-carousel position-relative">
                    <div className="team-item">
                        <div className="row g-0 bg-light rounded overflow-hidden">
                            <div className="col-12 col-sm-5 h-100">
                                <img 
                                    className="img-fluid h-100" 
                                    src={props.img} 
                                    alt={props.name} 
                                    style={{ objectFit: 'cover' }} 
                                />
                            </div>
                            <div className="col-12 col-sm-7 h-100 d-flex flex-column">
                                <div className="mt-auto p-4">
                                    <h3>DR. {props.name}</h3>
                                    <h6 className="fw-normal fst-italic text-primary mb-4">
                                        {props.Specialist}
                                    </h6>
                                    <p className="m-0">
                                        Dolor lorem eos dolor duo eirmod sea. Dolor sit magna rebum clita rebum dolor
                                    </p>

                                    <p className="m-0">
                                        {props.fees} $
                                    </p>


                                </div>
                                <div className="d-flex mt-auto border-top p-4">
                                <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" style={{ textDecoration: "none" }} to="#">
                                        <i className="fab fa-twitter text-light"></i>
                                        </Link>
                                    <a className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" href="#">
                                        <i className="fab fa-facebook-f text-light"></i>
                                    </a>
                                    <a className="btn btn-lg btn-primary btn-lg-square rounded-circle" href="#">
                                        <i className="fab fa-linkedin-in text-light"></i>
                                    </a>
                                    <Link 
                                        className="btn btn-lg btn-primary text-light ms-5 rounded-pill" 
                                        to= {"/feedback"}
                                        > 
                                        Feedback
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default Card;
