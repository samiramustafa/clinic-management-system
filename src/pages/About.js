import { Link } from "react-router-dom";
import "../css/style.css";
import  help from './img/about.jpg';
function About() {
    return (
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
                        <p>Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam dolor diam ipsum et, tempor voluptua sit consetetur sit. Aliquyam diam amet diam et eos sadipscing labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor consetetur takimata eirmod, dolores takimata consetetur invidunt magna dolores aliquyam dolores dolore. Amet erat amet et magna</p>
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
    )
}

export default About