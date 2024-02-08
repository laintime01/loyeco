import React, { useEffect, useState } from 'react';
import { FaAddressBook, FaCheck, FaCity, FaCode, FaEnvelope, FaHatCowboy, FaLock, FaMap, FaPersonBooth, FaTimes, FaUser } from 'react-icons/fa';
import SocialSignUp from './SocialSignUp';
import Spinner from 'react-bootstrap/Spinner'
import swal from 'sweetalert';
import { useDoctorSignUpMutation } from '../../redux/api/authApi';
import { useCreateClinicMutation } from '../../redux/api/clinicApi';


const SignUp = ({ setSignUp }) => {
    const [error, setError] = useState({});
    const [infoError, setInfoError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isClinic, setIsClinic] = useState(false);
    const formField = {
        firstName: '',
        lastname: '',
        email: '',
        password: '',
    }
    const clinicField = {
        address: '',
        city: '',
        province: '',
        postCode: '',
    }
    const [user, setUser] = useState(formField)
    const [clinic, setClinic] = useState(clinicField)
    const [doctorSignUp, { data: dData, isSuccess: dIsSuccess, isError: dIsError, error: dError, isLoading: dIsLoading }] = useDoctorSignUpMutation();
    const [createClinic, { data: cData, isSuccess: cIsSuccess, isError: cIsError, error: cError, isLoading: cIsLoading }] = useCreateClinicMutation();
    const [passwordValidation, setPasswordValidation] = useState({
        numeric: false
    })

    const handleSignUpSuccess = () => {
        setLoading(false);
        setUser(formField)
        setClinic(clinicField)
        setSignUp(false)
        swal({
            icon: 'success',
            text: `Successfully Account Created Please Login`,
            timer: 2000
        })
    }
    useEffect(() => {
        if (dIsError && dError) {
            setLoading(false)
            setInfoError(dError.data.message)
        }
        if (!dIsError && dIsSuccess) {
            handleSignUpSuccess();
        }
    }, [dIsError, dError, dIsLoading, dData, setSignUp, setLoading, dIsSuccess])

    const [emailError, setEmailError] = useState({
        emailError: false
    })

    const handleEmailError = (name, value) => {
        if (name === 'email') {
            setEmailError({
                emailError: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            })
        }
    }
    const hanldeValidation = (name, value) => {
        if (name === 'password') {
            setPasswordValidation({
                numeric: /^(?=.*\d)/.test(value),
            })
        }
    }

    const hanldeOnChange = (e) => {
        let { name, value } = e.target;
        hanldeValidation(name, value)
        handleEmailError(name, value)
        let isPassValid = true;

        if (value === 'email') {
            isPassValid = /\S+@\S+\.\S+/.test(value);
        }
        if (value === 'password') {
            isPassValid = (/^(?=.*\d)/.test(value))
        }
        if (isPassValid) {
            const newPass = { ...user };
            newPass[name] = value
            setUser(newPass)
        }
    }

    // handle clinic info change
    const handleClinicChange = (e) => {
        let { name, value } = e.target;
        const newClinic = { ...clinic };
        newClinic[name] = value
        setClinic(newClinic)
    }


    const hanldeOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        doctorSignUp(user);
        createClinic(clinic);
    }

    const handleClinicClick = () => {
        setIsClinic(true);
    }

    const handleBackClick = () => {
        setIsClinic(false);
    }

    return (
        <form className="sign-up-form" onSubmit={hanldeOnSubmit}>
            {isClinic ? (
                <>
                    <h2 className="title">Clinic Info</h2>
                    <div className="input-field">
                        <span className="fIcon"><FaAddressBook /></span>
                        <input placeholder="Address" name="address" type="text" onChange={(e) => handleClinicChange(e)} value={clinic.address} />
                    </div>
                    <div className="input-field">
                        <span className="fIcon"><FaCity /></span>
                        <input placeholder="City" name="city" type="text" onChange={(e) => handleClinicChange(e)} value={clinic.city} />
                    </div>
                    <div className="input-field">
                        <span className="fIcon"><FaMap /></span>
                        <input placeholder="Province" name="province" type="text" onChange={(e) => handleClinicChange(e)} value={clinic.province} />
                    </div>
                    <div className="input-field">
                        <span className="fIcon"><FaCode /></span>
                        <input placeholder="Post Code" name="postCode" type="text" onChange={(e) => handleClinicChange(e)} value={clinic.postCode} />
                    </div>
                    <div className='button-container'>
                        <button className='button-back iBtn' type="button"  onClick={handleBackClick}>Back</button>
                        <button className='button-submit iBtn' type="submit">{loading ? <Spinner animation="border" variant="info" /> : "Submit"}</button>
                    </div>
                    
                </>
            ) : (
                <>
                    <h2 className="title">Sign Up</h2>
                    <div className="input-field">
                        <span className="fIcon"><FaUser /></span>
                        <input placeholder="First Name" name="firstName" type="text" onChange={(e) => hanldeOnChange(e)} value={user.firstName} />
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
                    <button type="button" className='iBtn btn-primary mt-2' onClick={handleClinicClick}>Next</button>
                </>
            )}
            <p className="social-text">Or Sign up with social account</p>
            <SocialSignUp />
        </form>
    );
};

export default SignUp;
