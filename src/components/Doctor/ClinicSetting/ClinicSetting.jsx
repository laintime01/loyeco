import React from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import DoctorClinicSetting from './DoctorClinicSetting';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';

const ClinicSetting = () => {
    const { role } = useAuthCheck();
    return (
        <DashboardLayout>
            <DoctorClinicSetting />
        </DashboardLayout>
    )
}
export default ClinicSetting;