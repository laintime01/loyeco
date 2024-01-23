import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section id="hero" class="d-flex align-items-center">
            <div className="container">
                <div>
                    <small>Streamline Your Practice Management</small>
                    <h1>Intelligent Case <br />Template Generation</h1>
                </div>
                <Link to={'/about'} className="btn-get-started scrollto">Get Started</Link>
            </div>
        </section>
    )
}
export default HeroSection;