import React from 'react';
import { Toaster } from 'react-hot-toast'; // Toaster
import { createContext } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home/Home/Home';
import SignInForm from './components/Login/SignInForm';
import DoctorBooking from './components/Booking/DoctorBooking/DoctorBooking';
import BookingSuccess from './components/Booking/BookingSuccess';
import BookingInvoice from './components/Booking/BookingInvoice/BookingInvoice';
import Appointments from './components/Doctor/Appointments/Appointments';
import MyPatients from './components/Doctor/MyPatients/MyPatients';
import Schedule from './components/Doctor/Schedule/Schedule';
import ProfileSetting from './components/Doctor/ProfileSetting/ProfileSetting';
import ClinicSetting from './components/Doctor/ClinicSetting/ClinicSetting';
import ChangePassword from './components/Doctor/ChangePassword/ChangePassword';
import AdminDashboard from './components/Admin/Dashboard/Dashboard';
import AdminAppointments from './components/Admin/Appointments/Appointments';
import Doctors from './components/Admin/Doctors/Doctors';
import Patients from './components/Admin/Patients/Patients';
import Profile from './components/Admin/Profile/Profile';
import Transactions from './components/Admin/Transactions/Transactions';
import Specialites from './components/Admin/Specialites/Specialites';
import DoctorInvoice from './components/Doctor/Invoice/DoctorInvoice';
import Report from './components/Doctor/Report/Report';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Service from './components/Service/Service';
import Dashboard from './components/Doctor/Dashboard/Dashboard';
import ChartSetting from './components/Doctor/ChartSetting/ChartSetting';
import ServiceSetting from './components/Doctor/ServiceSetting/ServiceSetting';
import LocationSetting from './components/Doctor/LocationSetting/LocationSetting';
import LicenseSetting from './components/Doctor/LicenseSetting/LicenseSetting';
import PrivateRoute from './utils/PrivateRoute';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/contact', element: <Contact /> },
  { path: '/about', element: <About /> },
  { path: '/service', element: <Service /> },
  { path: '/login', element: <SignInForm /> },


  
  { path: '/dashboard', element: <PrivateRoute><Dashboard /></PrivateRoute> },
  { path: '/dashboard/my-patients', element: <PrivateRoute><MyPatients /></PrivateRoute> },
  { path: '/dashboard/schedule', element: <PrivateRoute><Schedule /></PrivateRoute> },
  { path: '/dashboard/appointments', element: <PrivateRoute><Appointments /></PrivateRoute> },
  { path: '/dashboard/change-password', element: <PrivateRoute><ChangePassword /></PrivateRoute> },
  { path: '/dashboard/profile-setting', element: <PrivateRoute><ProfileSetting /></PrivateRoute> },
  { path: '/dashboard/clinic-setting', element: <PrivateRoute><ClinicSetting /></PrivateRoute> },
  { path: '/dashboard/invoices', element: <PrivateRoute><DoctorInvoice /></PrivateRoute> },
  { path: '/dashboard/cases', element: <PrivateRoute><Report /></PrivateRoute> },
  { path: '/dashboard/service-setting', element: <PrivateRoute><ServiceSetting /></PrivateRoute> },
  { path: '/dashboard/location-setting', element: <PrivateRoute><LocationSetting /></PrivateRoute> },
  { path: '/dashboard/chart-setting', element: <PrivateRoute><ChartSetting /></PrivateRoute> },
  { path: '/dashboard/license-setting', element: <PrivateRoute><LicenseSetting /></PrivateRoute> },

  { path: '/booking/:doctorId', element: <PrivateRoute><DoctorBooking /></PrivateRoute> },
  { path: '/booking/success/', element: <PrivateRoute><BookingSuccess /></PrivateRoute> },
  { path: '/booking/invoice/:id', element: <PrivateRoute><BookingInvoice /></PrivateRoute> },

  { path: '/admin/dashboard', element: <PrivateRoute><AdminDashboard /></PrivateRoute> },
  { path: '/admin/appointments', element: <PrivateRoute><AdminAppointments /></PrivateRoute> },
  { path: '/admin/doctors', element: <PrivateRoute><Doctors /></PrivateRoute> },
  { path: '/admin/patients', element: <PrivateRoute><Patients /></PrivateRoute> },
  { path: '/admin/profile', element: <PrivateRoute><Profile /></PrivateRoute> },
  { path: '/admin/transaction', element: <PrivateRoute><Transactions /></PrivateRoute> },
  { path: '/admin/specialites', element: <PrivateRoute><Specialites /></PrivateRoute> },
]);


function App() {
  return (
    <div>
      <Toaster /> {/* Add Toaster */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
