import React, { useEffect, useState } from 'react';
import { FaAddressBook, FaCheck, FaCity, FaCode, FaEnvelope, FaHatCowboy, FaLock, FaMap, FaPersonBooth, FaTimes, FaUser } from 'react-icons/fa';
import SocialSignUp from './SocialSignUp';
import Spinner from 'react-bootstrap/Spinner';
import swal from 'sweetalert';
import { useSignUpMutation } from '../../redux/api/authApi';

import {instance} from '../../helpers/axios/axiosInstance';

const SignUp = ({ setSignUp }) => {
    const [error, setError] = useState({});
    const [infoError, setInfoError] = useState('');
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);

    const formField = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        clinicAddress: '',
        clinicCity: '',
        clinicProvince: '',
        clinicPostalCode: '',
    }

    const [user, setUser] = useState(formField);
    const [userSignUp, { data: dData, isSuccess: dIsSuccess, isError: dIsError, error: dError, isLoading: dIsLoading }] = useSignUpMutation();
    const [passwordValidation, setPasswordValidation] = useState({
        numeric: false
    });

    const handleSignUpSuccess = () => {
        setLoading(false);
        setUser(formField);
        setSignUp(false);
        swal({
            icon: 'success',
            text: `Successfully Account Created Please Login`,
            timer: 2000
        });
    };

    useEffect(() => {
        if (dIsError && dError) {
            setLoading(false);
            setInfoError(dError.data.message);
        }
        if (!dIsError && dIsSuccess) {
            handleSignUpSuccess();
        }
    }, [dIsError, dError, dIsLoading, dData, setSignUp, setLoading, dIsSuccess]);

    const [emailError, setEmailError] = useState({
        emailError: false
    });

    const handleEmailError = (name, value) => {
        if (name === 'email') {
            setEmailError({
                emailError: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            });
        }
    };

    const hanldeValidation = (name, value) => {
        if (name === 'password') {
            setPasswordValidation({
                numeric: /^(?=.*\d)/.test(value),
            });
        }
    };

    const hanldeOnChange = (e) => {
        let { name, value } = e.target;
        hanldeValidation(name, value);
        handleEmailError(name, value);
        let isPassValid = true;

        if (value === 'email') {
            isPassValid = /\S+@\S+\.\S+/.test(value);
        }
        if (value === 'password') {
            isPassValid = /^(?=.*\d)/.test(value);
        }
        if (isPassValid) {
            const newPass = { ...user };
            newPass[name] = value;
            setUser(newPass);
        }
    };

    const hanldeOnSubmit = async (e) => {
        e.preventDefault();
        userSignUp(user);
    };

    const handleBackClick = () => {
        if (page === 2) {
            setPage(1);
        }
    };

    const handleClinicClick = () => {
        if (page === 1) {
            setPage(2);
        }
    };

    return (
        <form className="sign-up-form" onSubmit={hanldeOnSubmit}>
            <h2 className="title">{page === 1 ? 'Sign Up' : 'Clinic Info'}</h2>
            {page === 1 ? (
                <>
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
                        <input type="password" name="password" placeholder="Password" onChange={(e) => hanldeOnChange(e)} value={user.password} />
                    </div>
                    {error.length && <h6 className="text-danger text-center">{error}</h6>}
                    {infoError && <h6 className="text-danger text-center">{infoError}</h6>}
                    <button type="button" className='iBtn btn-primary mt-2' onClick={handleClinicClick}>Next</button>
                </>
            ) : (
                <>
                    <div className="input-field">
                        <span className="fIcon"><FaAddressBook /></span>
                        <input placeholder="Address" name="clinicAddress" type="text" onChange={(e) => hanldeOnChange(e)} value={user.clinicAddress} />
                    </div>
                    <div className="input-field">
                        <span className="fIcon"><FaCity /></span>
                        <input placeholder="City" name="clinicCity" type="text" onChange={(e) => hanldeOnChange(e)} value={user.clinicCity} />
                    </div>
                    <div className="input-field">
                        <span className="fIcon"><FaMap /></span>
                        <input placeholder="Province" name="clinicProvince" type="text" onChange={(e) => hanldeOnChange(e)} value={user.clinicProvince} />
                    </div>
                    <div className="input-field">
                        <span className="fIcon"><FaCode /></span>
                        <input placeholder="Post Code" name="clinicPostalCode" type="text" onChange={(e) => hanldeOnChange(e)} value={user.clinicPostalCode} />
                    </div>
                    <div className='button-container'>
                        <button className='button-back iBtn' type="button" onClick={handleBackClick}>Back</button>
                        <button className='button-submit iBtn' type="submit">{loading ? <Spinner animation="border" variant="info" /> : "Submit"}</button>
                    </div>
                </>
            )}
            <p className="social-text">Or Sign up with social account</p>
            <SocialSignUp />
        </form>
    );
};

export default SignUp;
