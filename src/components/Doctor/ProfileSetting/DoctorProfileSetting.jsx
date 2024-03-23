import React, { useEffect, useRef, useState } from 'react';
import img from '../../../images/John.jpg';
import { Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../../redux/api/profileApi';
import './style.css';

const DoctorProfileSetting = () => {
    const { data, isLoading, isError, refetch } = useGetProfileQuery();
    const [updateProfile] = useUpdateProfileMutation();
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        preferredName: '',
        clinicName: '',
        clinicLocationName: '',
        clinicAddress: '',
        clinicCity: '',
        clinicProvince: '',
        clinicCountry: '',
        clinicPostalCode: '',
        clinicPhone: '',
        clinicEmail: '',
        licenses: []
    });

    useEffect(() => {
        if (data) {
            setProfileData(data);
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleLicenseChange = (index, e) => {
        const updatedLicenses = [...profileData.licenses];
        updatedLicenses[index] = { ...updatedLicenses[index], [e.target.name]: e.target.value };
        setProfileData({ ...profileData, licenses: updatedLicenses });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(profileData).unwrap();
            message.success('Profile Updated Successfully');
            refetch();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ marginBottom: '10rem' }}>
            <div className="w-100 mb-3 rounded mb-5 p-2" style={{ background: '#f8f9fa' }}>
                <h5 className="text-title mb-2 mt-3">Update Your Information</h5>
                <form className="row form-row" onSubmit={handleSubmit}>
                    <div className="col-md-12 mb-5">
                        <div className="form-group">
                            <div className="change-avatar d-flex gap-2 align-items-center">
                                <Link to={'/dashboard/profile-setting'} className="my-3">
                                    <img src={img} alt="" style={{ width: "100px", height: 'auto' }} />
                                </Link>
                                <div className='mt-3'>
                                    <div>
                                        <span> Upload Photo</span>
                                        <input type="file" className="upload" />
                                    </div>
                                    <small className="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>First Name <span className="text-danger">*</span></label>
                            <input name="firstName" value={profileData.firstName} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Last Name <span className="text-danger">*</span></label>
                            <input name="lastName" value={profileData.lastName} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Email</label>
                            <input name="email" value={profileData.email} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Preferred Name</label>
                            
                            <input name="preferredName" value={profileData.preferredName} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                    {/* Clinic Information */}
                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Clinic Name</label>
                            <input name="clinicName" value={profileData.clinicName} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Clinic Location Name</label>
                            <input name="clinicLocationName" value={profileData.clinicLocationName} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Clinic Address</label>
                            <input name="clinicAddress" value={profileData.clinicAddress} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Clinic City</label>
                            <input name="clinicCity" value={profileData.clinicCity} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Clinic Province</label>
                            <input name="clinicProvince" value={profileData.clinicProvince} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Clinic Country</label>
                            <input name="clinicCountry" value={profileData.clinicCountry} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Clinic Postal Code</label>
                            <input name="clinicPostalCode" value={profileData.clinicPostalCode} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Clinic Phone</label>
                            <input name="clinicPhone" value={profileData.clinicPhone} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Clinic Email</label>
                            <input name="clinicEmail" value={profileData.clinicEmail} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                    {/* Licenses Information */}
                    {profileData.licenses.map((license, index) => (
                        <div key={index} className="col-md-12">
                            <div className="form-group mb-2 card-label">
                                <label>License ID</label>
                                <input name="licenseId" value={license.licenseId} onChange={(e) => handleLicenseChange(index, e)} className="form-control" />
                            </div>
                            <div className="form-group mb-2 card-label">
                                <label>License Type</label>
                                <input name="licenseType" value={license.licenseType} onChange={(e) => handleLicenseChange(index, e)} className="form-control" />
                            </div>
                        </div>
                    ))}

                    <div className='text-center my-3'>
                        <Button htmlType='submit' type="primary" size='large'>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoctorProfileSetting;
