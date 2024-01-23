import React from 'react';
import './InfoPage.css';
import { FaClock, FaHandPaper, FaHeadset,FaHouseUser, FaLock, FaPager  } from "react-icons/fa";
import { Link } from 'react-router-dom';

const InfoPage = () => {
    return (
        <section id="why-us" className="why-us">
            <div className="container">

                <div className="row">
                    <div className="col-lg-4 d-flex align-items-stretch">
                        <div className="content">
                            <h3>Why Choose Us?</h3>
                            <p>
                            Experience the future of practice management with our revolutionary system. Say goodbye to tedious paperwork and hello to streamlined efficiency. Our advanced platform seamlessly integrates appointment scheduling, 
                            client management, and intelligent case template generation.
                            </p>
                            <div className="text-center">
                                <Link href="/" className="more-btn">Learn More <i className="bx bx-chevron-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 d-flex align-items-stretch">
                        <div className="icon-boxes d-flex flex-column justify-content-center">
                            <div className="row">
                                <div className="col-xl-4 d-flex align-items-stretch">
                                    <div className="icon-box mt-4 mt-xl-0">
                                        <FaHouseUser className="icon"/>
                                        <h4>Appointment</h4>
                                        <p>Effortlessly manage client appointments with our user-friendly online booking system.</p>
                                    </div>
                                </div>
                                <div className="col-xl-4 d-flex align-items-stretch">
                                    <div className="icon-box mt-4 mt-xl-0">
                                        <FaPager className="icon"/>
                                        <h4>Intelligent Case Template Generation</h4>
                                        <p>Our system automatically generates professional case templates based on the conditions selected by the massage therapist.</p>
                                    </div>
                                </div>
                                <div className="col-xl-4 d-flex align-items-stretch">
                                    <div className="icon-box mt-4 mt-xl-0">
                                        <FaLock className="icon"/>
                                        <h4>Secure Data Storage</h4>
                                        <p>Our system securely stores client data and case templates in the cloud.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default InfoPage