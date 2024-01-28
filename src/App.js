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
import ChangePassword from './components/Doctor/ChangePassword/ChangePassword';
import AdminDashboard from './components/Admin/Dashboard/Dashboard';
import AdminAppointments from './components/Admin/Appointments/Appointments';
import Doctors from './components/Admin/Doctors/Doctors';
import Patients from './components/Admin/Patients/Patients';
import Profile from './components/Admin/Profile/Profile';
import Transactions from './components/Admin/Transactions/Transactions';
import Specialites from './components/Admin/Specialites/Specialites';
import DoctorInvoice from './components/Doctor/Invoice/DoctorInvoice';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Service from './components/Service/Service';
import Dashboard from './components/Doctor/Dashboard/Dashboard';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/contact', element: <Contact /> },
  { path: '/about', element: <About /> },
  { path: '/service', element: <Service /> },
  { path: '/login', element: <SignInForm /> },


  
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/dashboard/my-patients', element: <MyPatients /> },
  { path: '/dashboard/schedule', element: <Schedule /> },
  { path: '/dashboard/appointments', element: <Appointments /> },
  { path: '/dashboard/change-password', element: <ChangePassword /> },
  { path: '/dashboard/profile-setting', element: <ProfileSetting /> },
  { path: '/dashboard/invoices', element: <DoctorInvoice /> },

  { path: '/booking/:doctorId', element: <DoctorBooking /> },
  { path: '/booking/success/', element: <BookingSuccess /> },
  { path: '/booking/invoice/:id', element: <BookingInvoice /> },

  // Dashboard
  { path: '/admin/dashboard', element: <AdminDashboard /> },
  { path: '/admin/appointments', element: <AdminAppointments /> },
  { path: '/admin/doctors', element: <Doctors /> },
  { path: '/admin/patients', element: <Patients /> },
  { path: '/admin/profile', element: <Profile /> },
  { path: '/admin/transaction', element: <Transactions /> },
  { path: '/admin/specialites', element: <Specialites /> },

  // { path: '/appointment', element: <PrivateRoute><AppointMent /></PrivateRoute> },
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
