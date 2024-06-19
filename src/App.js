import React from 'react';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import ProtectedRoute from './utils/ProtectedRoute';
import PublicRoute from './utils/PublicRoute';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/contact', element: <Contact /> },
  { path: '/about', element: <About /> },
  { path: '/service', element: <Service /> },
  {
    path: '/login',
    element: <PublicRoute />,
    children: [
      { path: '', element: <SignInForm /> }
    ]
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'my-patients', element: <MyPatients /> },
      { path: 'schedule', element: <Schedule /> },
      { path: 'appointments', element: <Appointments /> },
      { path: 'change-password', element: <ChangePassword /> },
      { path: 'profile-setting', element: <ProfileSetting /> },
      { path: 'clinic-setting', element: <ClinicSetting /> },
      { path: 'invoices', element: <DoctorInvoice /> },
      { path: 'cases', element: <Report /> },
      { path: 'service-setting', element: <ServiceSetting /> },
      { path: 'location-setting', element: <LocationSetting /> },
      { path: 'chart-setting', element: <ChartSetting /> },
      { path: 'license-setting', element: <LicenseSetting /> }
    ]
  },
  {
    path: '/booking',
    element: <ProtectedRoute />,
    children: [
      { path: ':doctorId', element: <DoctorBooking /> },
      { path: 'success', element: <BookingSuccess /> },
      { path: 'invoice/:id', element: <BookingInvoice /> }
    ]
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'appointments', element: <AdminAppointments /> },
      { path: 'doctors', element: <Doctors /> },
      { path: 'patients', element: <Patients /> },
      { path: 'profile', element: <Profile /> },
      { path: 'transaction', element: <Transactions /> },
      { path: 'specialites', element: <Specialites /> }
    ]
  }
]);

function App() {
  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
