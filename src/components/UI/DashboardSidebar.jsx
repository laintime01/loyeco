import { useLocation, Link } from 'react-router-dom';
import img from '../../images/John.jpg';
import './DashboardSidebar.css';
import {
    FaTable,
    FaCalendarDay,
    FaUserInjured,
    FaUserCog,
    FaSignOutAlt,
    FaHouseUser
} from "react-icons/fa";

function MyNavLink({ to, children, icon }) {
  let location = useLocation();
  let isActive = location.pathname === to;

  return (
    <Link to={to} className={isActive ? 'active' : ''}>
      {icon}
      <span>{children}</span>
    </Link>
  );
}

const DashboardSidebar = () => {
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
            <MyNavLink to={'/dashboard/profile-setting'} icon={<FaUserCog className="icon" />}>
              Settings
            </MyNavLink>
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
