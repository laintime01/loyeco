import React from 'react';
import img from '../../images/john.png';
import './DashboardSidebar.css';
import { Link, NavLink } from 'react-router-dom';
import useAuthCheck from '../../redux/hooks/useAuthCheck';
import {
    FaTable,
    FaCalendarDay,
    FaUserInjured,
    FaHourglassStart,
    FaUserCog, FaLock,
    FaSignOutAlt,
    FaHouseUser
} from "react-icons/fa";

const DashboardSidebar = () => {
    const { data } = useAuthCheck();

    return (
        <div className="profile-sidebar p-3 rounded">
            <div className="p-2 text-center border-bottom">
                <div className="profile-info text-center">
                    <Link to={'/'}><img src={img} alt="" /></Link>
                    <div className='profile-details'>
                        <h5 className='mb-0'>John Snow</h5>
                        <div>
                            <p className="mb-0">{data?.designation}</p>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="dashboard-menu">
                <ul>
                    <li className="active">
                        <NavLink to={'/dashboard'} activeClassName="active" end>
                            <FaTable className="icon" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/appointments'} activeClassName="active">
                            <FaCalendarDay className="icon" />
                            <span>Appointments</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/my-patients'} activeClassName="active">
                            <FaUserInjured className="icon" />
                            <span>My Patients</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/cases'} activeClassName="active">
                            <FaHouseUser className="icon" />
                            <span>Case Management</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/schedule'} activeClassName="active">
                            <FaCalendarDay className="icon" />
                            <span>Schedule Timings</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/invoices'} activeClassName="active">
                            <FaHourglassStart className="icon" />
                            <span>Invoices</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/profile-setting'} activeClassName="active">
                            <FaUserCog className="icon" />
                            <span>Profile Settings</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/change-password'} activeClassName="active">
                            <FaLock className="icon" />
                            <span>Change Password</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/'}>
                            <FaSignOutAlt className="icon" />
                            <span>Logout</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default DashboardSidebar;
