import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import log from '../../images/website-design.jpg';
import register from '../../images/website-maintenance.jpg';
import SignIn from './SignIn';
import './SignInForm.css';
import SignUp from './SignUp';

// SignInForm is a React component
const SignInForm = () => {
    // isSignUp state determines whether the Sign Up form is displayed
    const [isSignUp, setSignUp] = useState(false);
    return (
        <div className={`${isSignUp ? "signin-signup-container sign-up-mode" : "signin-signup-container"}`}>
            {/* Link to homepage */}
            <Link to="/">
                {/* Close button */}
                <span className="pageCloseBtn"><FaTimes /></span>
            </Link>
            <div className="forms-container">
                <div className="signIn-singUp">
                    {/* Sign In form component */}
                    <SignIn />
                    {/* Sign Up form component */}
                    <SignUp setSignUp={setSignUp} />
                </div>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        {/* Heading and text for new users */}
                        <h3 className='text-white'>New here ?</h3>
                        <p>Unlock the Power of LoyEco System!</p>
                        {/* Button to display Sign Up form */}
                        <button className="iBtn transparent" onClick={() => setSignUp(true)}>Sign Up</button>
                    </div>
                    {/* Image for panel */}
                    <img src={`${log}`} alt="" className="pImg" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        {/* Heading and text for existing users */}
                        <h3 className='text-white'>One of us ?</h3>
                        <p>Welcome back to LoyEco System</p>
                        {/* Button to display Sign In form */}
                        <button className="iBtn transparent" onClick={() => setSignUp(false)}>Sign In</button>
                    </div>
                    {/* Image for panel */}
                    <img src={`${register}`} alt="" className="pImg" />
                </div>
            </div>
        </div>
    );
};

// Export SignInForm component
export default SignInForm;
