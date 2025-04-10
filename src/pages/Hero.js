import "../css/style.css";
import { Link } from "react-router-dom";

import help from './img/about.jpg'


function Hero() {
    return (
        <>
            <div className="container-fluid bg-primary py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row justify-content-start">
                        <div className="col-lg-8 text-center text-lg-start">
                            <h5 className="d-inline-block fw-bold text-uppercase border-bottom Clinic border-5 border-color: rgba(255, 255, 255, 0.3)
 !important;">Welcome To Clinic tech</h5>
                            <h1 className="display-1 text-white mb-md-4 fw-bold">Best Healthcare Solution In Your City</h1>
                            <div className="pt-2">
                                <a href="#" className="btn btn-light rounded-pill py-md-3 px-md-5 mx-2">Find Doctor</a>
                                <a href="#" className="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2">Appointment</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: '500px' }}>
                            <div className="position-relative h-100">
                                <img
                                    className="position-absolute w-100 h-100 rounded"
                                    src={help}
                                    alt="About"
                                    style={{ objectFit: 'cover' }}
                                />

                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="mb-4">
                                <h5 className="d-inline-block text-info fw-bold text-uppercase border-bottom border-5">About Us</h5>
                                <h1 className="display-4 fw-bold">Best Medical Care For Yourself and Your Family</h1>
                            </div>
                            <p>Clinic services provide comprehensive care to ensure the well-being of patients. Our team of dedicated professionals is committed to delivering high-quality medical assistance, tailored to meet the unique needs of each individual. With state-of-the-art facilities and a patient-centered approach, the clinic strives to enhance health outcomes and foster trust through compassionate care.</p>
                            <div className="row g-3 pt-3">
                                <div className="col-sm-3 col-6">
                                    <div className="bg-body-secondary text-center rounded-circle py-4">
                                        <i className="fa fa-3x fa-user-md text-info mb-3"></i>
                                        <h6 className="mb-0 fw-bold ">Qualified<small className="d-block text-info fw-bold">Doctors</small></h6>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-6">
                                    <div className="bg-body-secondary text-center rounded-circle py-4">
                                        <i className="fa fa-3x fa-procedures text-info mb-3"></i>
                                        <h6 className="mb-0 fw-bold">Emergency<small className="d-block text-info fw-bold">Services</small></h6>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-6">
                                    <div className="bg-body-secondary text-center rounded-circle py-4">
                                        <i className="fa fa-3x fa-microscope text-info mb-3"></i>
                                        <h6 className="mb-0 fw-bold ">Accurate<small className="d-block text-info fw-bold">Testing</small></h6>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-6">
                                    <div className="bg-body-secondary text-center rounded-circle py-4">
                                        <i className="fa fa-3x fa-ambulance text-info mb-3"></i>
                                        <h6 className="mb-0 fw-bold">Free<small className="d-block text-info fw-bold">Ambulance</small></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero