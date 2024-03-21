import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import img from '../../images/John.jpg';
import './DashboardSidebar.css';
import {
    FaTable,
    FaCalendarDay,
    FaUserInjured,
    FaUserCog,
    FaSignOutAlt,
    FaHouseUser,
    FaTools,
    FaSlidersH,
    FaCog,
    FaServer,
    FaLocationArrow,
    FaChartBar
} from "react-icons/fa";

const MyNavLink = ({ to, children, icon, onClick, active }) => {
    const handleClick = (event) => {
        if (to === '#') {
            event.preventDefault();
            onClick();
        }
    };

    return (
        <NavLink to={to} onClick={handleClick} className={active ? 'active' : ''}>
            {icon}
            <span>{children}</span>
        </NavLink>
    );
};

const SubNavLink = ({ to, children, icon }) => {
    return (
        <NavLink to={to} activeClassName='active' className='subnav-item'>
            {icon}
            <span>{children}</span>
        </NavLink>
    );
};

const DashboardSidebar = () => {
    const [selectedMenu, setSelectedMenu] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // add service,location and chart setting
        const settingsSubMenuPaths = ['/dashboard/profile-setting', '/dashboard/clinic-setting', '/dashboard/change-password', '/dashboard/service-setting', '/dashboard/location-setting', '/dashboard/chart-setting'];
        if (settingsSubMenuPaths.includes(location.pathname)) {
            setSelectedMenu('settings');
        }
    }, [location]);

    const handleClick = (menu) => {
        setSelectedMenu(prev => prev === menu ? null : menu);
    };

    return (
        <div className="profile-sidebar p-3 rounded">
            <div className="p-2 text-center border-bottom">
                <div className="profile-info text-center">
                    <NavLink to={'/'}><img src={img} alt="" /></NavLink>
                    <div className='profile-details'>
                        <h5 className='mb-0'>John Snow</h5>
                    </div>
                </div>
            </div>
            <nav className="dashboard-menu">
                <ul>
                    <li>
                        <MyNavLink to={'/dashboard'} icon={<FaTable className="icon" />}>
                            Dashboard
                        </MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to={'/dashboard/my-patients'} icon={<FaUserInjured className="icon" />}>
                            My Patients
                        </MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to={'/dashboard/appointments'} icon={<FaCalendarDay className="icon" />}>
                            Calendar
                        </MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to={'/dashboard/cases'} icon={<FaCalendarDay className="icon" />}>
                            Report
                        </MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to={'/dashboard/schedule'} icon={<FaHouseUser className="icon" />}>
                            Export Data
                        </MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to={'#'} icon={<FaUserCog className="icon" />} onClick={() => handleClick('settings')}>
                            Settings
                        </MyNavLink>
                        {selectedMenu === 'settings' && (
                            <ul>
                                <li>
                                    <SubNavLink to={'/dashboard/profile-setting'} icon={<FaTools className="icon" />}>
                                        Profile
                                    </SubNavLink>
                                </li>
                                <li>
                                    <SubNavLink to={'/dashboard/clinic-setting'} icon={<FaSlidersH className="icon" />}>
                                        Clinic
                                    </SubNavLink>
                                </li>
                                <li>
                                    <SubNavLink to={'/dashboard/change-password'} icon={<FaCog className="icon" />}>
                                        Password
                                    </SubNavLink>
                                </li>
                                <li>
                                    <SubNavLink to={'/dashboard/service-setting'} icon={<FaServer className="icon" />}>
                                        Service
                                    </SubNavLink>
                                </li>
                                {/* add chart and location settings */}
                                <li>
                                    <SubNavLink to={'/dashboard/location-setting'} icon={<FaLocationArrow className="icon" />}>
                                        Location
                                    </SubNavLink>
                                </li>
                                <li>
                                    <SubNavLink to={'/dashboard/chart-setting'} icon={<FaChartBar className="icon" />}>
                                        Chart
                                    </SubNavLink>
                                </li>

                            </ul>
                        )}
                    </li>
                    <li>
                        <MyNavLink to={'/dashboard/logout'} icon={<FaSignOutAlt className="icon" />}>
                            Logout
                        </MyNavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default DashboardSidebar;
