import React from 'react';
import './index.css';
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaGithubSquare, FaPhoneAlt, FaEnvelope  } from "react-icons/fa";

const TopHeader = () => {
    return (
        <div id="topbar" className="d-flex align-items-center fixed-top">
            <div className="container d-flex justify-content-between">
                <div className="contact-info d-flex align-items-center">
                    <FaPhoneAlt className='contact-icon'/> <a href="">Feel Free To Contact</a> 
                    <FaEnvelope className='contact-icon'/> <a href="mailto:loyeco@gmail.com">loyeco@gmail.com</a>
                </div>
                <div className="d-none d-lg-flex social-links align-items-center">
                    <a href="https://github.com/laintime01" target='_blank' rel="noreferrer" className=""><FaGithubSquare /></a>
                </div>
            </div>
        </div>
    );
};
export default TopHeader;