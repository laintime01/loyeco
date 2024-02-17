import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
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
    FaCog
} from "react-icons/fa";

const MyNavLink = ({ to, children, icon, active, onClick }) => {
    return (
      <Link to={to} onClick={onClick} className={active ? 'active' : ''}>
        {icon}
        <span>{children}</span>
      </Link>
    );
};

const SubNavLink = ({ to, children, icon, active }) => {
    return (
      <Link to={to} className={`subnav-item ${active ? 'active' : ''}`}>
        {icon}
        <span>{children}</span>
      </Link>
    );
};



const DashboardSidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  let location = useLocation();
  
  const handleClick = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="profile-sidebar p-3 rounded">
      <div className="p-2 text-center border-bottom">
        <div className="profile-info text-center">
          <Link to={'/'}><img src={img} alt="" /></Link>
          <div className='profile-details'>
            <h5 className='mb-0'>John Snow</h5>
          </div>
        </div>
      </div>
      <nav className="dashboard-menu">
        <ul>
          <li>
            <MyNavLink to={'/dashboard'} icon={<FaTable className="icon" />} active={location.pathname === '/dashboard'}>
              Dashboard
            </MyNavLink>
          </li>
          <li>
            <MyNavLink to={'/dashboard/my-patients'} icon={<FaUserInjured className="icon" />} active={location.pathname === '/dashboard/my-patients'}>
              My Patients
            </MyNavLink>
          </li>
          <li>
            <MyNavLink to={'/dashboard/appointments'} icon={<FaCalendarDay className="icon" />} active={location.pathname === '/dashboard/appointments'}>
              Calendar
            </MyNavLink>
          </li>
          <li>
            <MyNavLink to={'/dashboard/cases'} icon={<FaCalendarDay className="icon" />} active={location.pathname === '/dashboard/cases'}>
              Report
            </MyNavLink>
          </li>
          <li>
            <MyNavLink to={'/dashboard/schedule'} icon={<FaHouseUser className="icon" />} active={location.pathname === '/dashboard/schedule'}>
              Export Data
            </MyNavLink>
          </li>
          <li>
        <MyNavLink to={'#'} icon={<FaUserCog className="icon" />} active={location.pathname.startsWith('/dashboard/profile-setting')} onClick={() => handleClick('settings')}>
            Settings
        </MyNavLink>
        {openMenu === 'settings' && (
            <ul>
            <li>
                <SubNavLink to={'/dashboard/profile-setting'} icon={<FaTools className="icon" />} active={location.pathname === '/dashboard/profile-setting'}>
                Profile Settings
                </SubNavLink>
            </li>
            <li>
                <SubNavLink to={'/dashboard/clinic-setting'} icon={<FaSlidersH className="icon" />} active={location.pathname === '/dashboard/clinic-setting'}>
                Clinic Settings
                </SubNavLink>
            </li>
            <li>
                <SubNavLink to={'/dashboard/password-change'} icon={<FaCog className="icon" />} active={location.pathname === '/dashboard/password-change'}>
                Password Change
                </SubNavLink>
            </li>
            </ul>
        )}
        </li>
          <li>
            <MyNavLink to={'/dashboard/logout'} icon={<FaSignOutAlt className="icon" />} active={location.pathname === '/dashboard/logout'}>
              Logout
            </MyNavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
