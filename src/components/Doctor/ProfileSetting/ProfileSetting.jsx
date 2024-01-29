import React from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import PatientProfileSetting from './PatientProfileSetting';
import DoctorProfileSetting from './DoctorProfileSetting';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';

const ProfileSetting = () => {
    const { role } = useAuthCheck();
    return (
        <DashboardLayout>
            <DoctorProfileSetting />
        </DashboardLayout>
    )
}
export default ProfileSetting;