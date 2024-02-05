import React from 'react'
import DoctorDashCard from './doctor/DoctorDashCard';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import DashboardPage from './doctor/DashboardPage';

const Dashboard = () => {
    return (
        <>
            <DashboardLayout>
                <DoctorDashCard />
                <div className="row">
                    <div className="col-md-12 rounded" style={{ background: '#f8f9fa' }}>
                        <h5 className="text-title">Appointments</h5>
                        {/* <DashboardPage /> */}
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Dashboard;
