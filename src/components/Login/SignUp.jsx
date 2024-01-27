import React, { useEffect, useState } from 'react';
import { FaCheck, FaEnvelope, FaLock, FaTimes, FaUser } from 'react-icons/fa';
import SocialSignUp from './SocialSignUp';
import Spinner from 'react-bootstrap/Spinner';
import swal from 'sweetalert';
import { useDoctorSignUpMutation } from '../../redux/api/authApi';

// SignUp Component
const SignUp = ({ setSignUp }) => {
  // Initialize states
  const [error, setError] = useState({});
  const [infoError, setInfoError] = useState('');
  const [loading, setLoading] = useState(false);
  const formField = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };

  // Initialize user state
  const [user, setUser] = useState(formField);

  // Initialize Doctor Signup Mutation Hook from Redux Toolkit Query
  const [doctorSignUp, { data: dData, isSuccess: dIsSuccess, isError: dIsError, error: dError, isLoading: dIsLoading }] = useDoctorSignUpMutation();
  
  // Initialize passwordValidation state
  const [passwordValidation, setPasswordValidation] = useState({
    carLength: false,
    specailChar: false,
    upperLowerCase: false,
    numeric: false
  });

  // Function to handle successful signup
  const handleSignUpSuccess = () => {
    setLoading(false);
    setUser(formField);
    setSignUp(false);
    swal({
      icon: 'success',
      text: 'Successfully Doctor Account Created Please Login',
      timer: 2000
    });
  };

  // UseEffect hook to handle errors and success
  useEffect(() => {
    if (dIsError && dError) {
      setLoading(false);
      setInfoError(dError.data.message);
    }
    if (!dIsError && dIsSuccess) {
      handleSignUpSuccess();
    }
  }, [dIsError, dError, dIsLoading, dData, setSignUp, setLoading, dIsSuccess]);

  // Initialize emailError state
  const [emailError, setEmailError] = useState({
    emailError: false
  });

  // Function to handle email validation error
  const handleEmailError = (name, value) => {
    if (name === 'email') {
      setEmailError({
        emailError: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      });
    }
  };

  // Function to handle password validation
  const hanldeValidation = (name, value) => {
    // handle lastname, firstname, password validation
    if (name === 'password') {
      setPasswordValidation({
        carLength: (value.length > 8),
        specailChar: /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value),
        upperLowerCase: /^(?=.*[a-z])(?=.*[A-Z])/.test(value),
        numeric: /^(?=.*\d)/.test(value),
      });
    }
    if (name === 'firstname' || name === 'lastname') {
      setError({
        ...error,
        [name]: value.length < 3 ? 'Must be 3 characters long!' : ''
      });
    }
  };

  // Function to handle input change and validation
  const hanldeOnChange = (e) => {
    let { name, value } = e.target;
    hanldeValidation(name, value);
    handleEmailError(name, value);
    let isPassValid = true;

    if (value === 'firstname' || value === 'lastname') {
        isPassValid = value.length > 2;
    }
    if (value === 'email') {
      isPassValid = /\S+@\S+\.\S+/.test(value);
    }
    if (value === 'password') {
      isPassValid = ((value.length > 3)
        // && /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value)
        // && /^(?=.*[a-z])(?=.*[A-Z])/.test(value)
        && /^(?=.*\d)/.test(value));
    }
    if (isPassValid) {
      const newPass = { ...user };
      newPass[name] = value;
      setUser(newPass);
    }
  };

  // Function to handle form submission
  const hanldeOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    doctorSignUp(user);
  };

  return (
    <form className="sign-up-form" onSubmit={hanldeOnSubmit}>
      <h2 className="title">Sign Up</h2>
      <div className="input-field">
        <span className="fIcon"><FaUser /></span>
        <input placeholder="First Name" name="firstname" type="text" onChange={(e) => hanldeOnChange(e)} value={user.firstname} />
      </div>
      <div className="input-field">
        <span className="fIcon"><FaUser /></span>
        <input placeholder="Last Name" name="lastname" type="text" onChange={(e) => hanldeOnChange(e)} value={user.lastname} />
      </div>
      <div className="input-field">
        <span className="fIcon"><FaEnvelope /></span>
        <input placeholder="Email" name="email" type="email" onChange={(e) => hanldeOnChange(e)} value={user.email} />
      </div>
      <div className="input-field">
        <span className="fIcon"><FaLock /></span>
        <input type="password" name="password" placeholder="password" onChange={(e) => hanldeOnChange(e)} value={user.password} />
      </div>
    
      {error.length && <h6 className="text-danger text-center">{error}</h6>}
      {infoError && <h6 className="text-danger text-center">{infoError}</h6>}
      <button type="submit"
        className="btn btn-primary btn-block mt-2 iBtn"
      >
        {loading ? <Spinner animation="border" variant="info" /> : "Sign Up"}
      </button>

      <div className="password-validatity mx-auto">
        {/* Rest of your form code */}
      </div>

      <p className="social-text">Or Sign up with social account</p>
      <SocialSignUp />
    </form>
  );
};

export default SignUp;
