import React from 'react'
import './index.css';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import img2 from '../../images/doc/doctor4.png'
import SubHeader from '../Shared/SubHeader';

const About = () => {
    return (
        <>
            <Header />
            <SubHeader title="about us" subtitle="all-in-one practice management system."/>
            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row p-5">
                    <div className="col-lg-4">
                        <div className='section-title text-center'>
                            <h2 className='text-uppercase'>LoyEco System</h2>
                            <p className='form-text m-0'> Key Features to Optimize Your Practice.</p>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <p>Welcome to our all-in-one practice management system tailored for massage therapists, acupuncturists, and other wellness practitioners. With our intuitive platform, you can effortlessly manage client appointments, generate professional case templates based on selected conditions, and focus on delivering exceptional care and personalized treatment.</p>
                        {/* <img src={img2} alt="" className="img-fluid rounded shadow" /> */}
                    </div>
                </div>
            </div>

            <div className="container say-about" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row">
                    <div className="col-lg-6 offset-lg-6">
                        <div className='mb-4 section-title text-center'>
                            <h2 className='text-uppercase'>What User's Say</h2>
                            <p className='form-text m-0'>Elevate My Practice with Integrated Solutions!</p>
                        </div>
                    </div>
                </div>

                <div className="row align-items-center">
                    <div className="col-lg-6 offset-lg-6">
                        <div className="my-2">
                            <h4 style={{ color: '#223a66' }} className='my-0'>Amazing service!</h4>
                            <span>John Partho</span>
                        </div>
                        <p className='form-text'>
                        Your practice management system has truly transformed the way I run my massage practice. It has given me the power to optimize my workflow, deliver personalized care, and exceed my clients' expectations. From the seamless appointment scheduling to the intelligent case template generation, every feature has simplified my administrative tasks, allowing me to focus on what I love most – providing exceptional treatments and improving client outcomes.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About