import React, { useState } from "react";
import "../css/style.css";

function Footer() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setMessage("Please enter a valid email address!");
            return;
        }

        // Simulate successful subscription on the frontend
        setMessage("Thank you for subscribing! You will receive a greeting message shortly.");
        console.log(`Simulating sending greeting email to: ${email}`);

        // Optionally, still send the email to the backend for logging or other purposes
        try {
            const response = await fetch("http://127.0.0.1:8000/clinic/send-email/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                console.log("Email address sent to backend for potential logging.");
            } else {
                console.error("Failed to send email address to backend.");
            }
        } catch (error) {
            console.error("Error sending email address to backend:", error);
        }

        // Clear the input field after "submission"
        setEmail("");
    };

    return (
        <>
            <div className="container-fluid footer text-light mt-5 py-5">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <h4 className="d-inline-block Clinic text-uppercase border-bottom border-5 border-secondary mb-4">Get In Touch</h4>
                            <p className="mb-4">Clinic services provide comprehensive care to ensure the well-being of patients. Our team of dedicated professionals is committed to delivering high-quality medical assistance, tailored to meet the unique needs of each individual. </p>
                            <p className="mb-2"><i className="fa fa-map-marker-alt text-primary me-3 text-info"></i>123 Mohandssen St , Cairo, Egypt</p>
                            <p className="mb-2"><i className="fa fa-envelope text-primary me-3 text-info"></i>info@example.com</p>
                            <p className="mb-0 "><i className="fa fa-phone-alt text-primary me-3 text-info"></i>+012 345 67890</p>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="d-inline-block Clinic text-uppercase border-bottom border-5 border-secondary mb-4">Quick Links</h4>
                            <div className="d-flex flex-column justify-content-start text-decoration-none">
                                <a className="text-light mb-2 text-decoration-none" href="#"><i className="fa fa-angle-right me-2"></i>Home</a>
                                <a className="text-light mb-2 text-decoration-none" href="/about"><i className="fa fa-angle-right me-2"></i>About Us</a>
                                <a className="text-light mb-2 text-decoration-none" href="#"><i className="fa fa-angle-right me-2"></i>Our Services</a>
                                <a className="text-light mb-2 text-decoration-none" href="#"><i className="fa fa-angle-right me-2"></i>Meet The Team</a>
                                <a className="text-light mb-2 text-decoration-none" href="#"><i className="fa fa-angle-right me-2"></i>Latest Blog</a>
                                <a className="text-light text-decoration-none" href="#"><i className="fa fa-angle-right me-2"></i>Contact Us</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="d-inline-block Clinic text-uppercase border-bottom border-5 border-secondary mb-4">Popular Links</h4>
                            <div className="d-flex flex-column justify-content-start">
                                <a className="text-light mb-2 text-decoration-none" href="#"><i className="fa fa-angle-right me-2"></i>Home</a>
                                <a className="text-light mb-2 text-decoration-none" href="/about"><i className="fa fa-angle-right me-2"></i>About Us</a>
                                <a className="text-light mb-2 text-decoration-none" href="#"><i className="fa fa-angle-right me-2"></i>Our Services</a>
                                <a className="text-light mb-2 text-decoration-none" href="#"><i className="fa fa-angle-right me-2"></i>Meet The Team</a>
                                <a className="text-light mb-2 text-decoration-none" href="#"><i className="fa fa-angle-right me-2"></i>Latest Blog</a>
                                <a className="text-light text-decoration-none" href="#"><i className="fa fa-angle-right me-2"></i>Contact Us</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="d-inline-block Clinic text-uppercase border-bottom border-5 border-secondary mb-4">Newsletter</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control p-3 border-0"
                                        placeholder="Your Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button type="submit" className="btn btn-info text-light">Sign Up</button>
                                </div>
                            </form>
                            {message && <p className="mt-2 text-warning">{message}</p>}
                            <h6 className="Clinic text-uppercase mt-4 mb-3">Follow Us</h6>
                            <div className="d-flex">
                                <a className="btn btn-lg btn-info btn-lg-square rounded-circle me-2" href="#"><i className="bi bi-twitter text-light"></i></a>
                                <a className="btn btn-lg btn-info btn-lg-square rounded-circle me-2" href="#"><i className="bi bi-facebook text-light"></i></a>
                                <a className="btn btn-lg btn-info btn-lg-square rounded-circle me-2" href="#"><i className="bi bi-linkedin text-light"></i></a>
                                <a className="btn btn-lg btn-info btn-lg-square rounded-circle" href="#"><i className="bi bi-instagram text-light"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid footer text-light border-top border-secondary py-4">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-md-6 text-center text-md-start">
                            <p className="mb-md-0">&copy; <a className="Clinic" href="#">Clinic Tech </a>. All Rights Reserved.</p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <p className="mb-0">Designed by <a className="Clinic" href="https://htmlcodex.com">Clinic Team </a></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;