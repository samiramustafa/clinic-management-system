import 'bootstrap/dist/css/bootstrap.min.css';


import './scss/bootstrap/scss/bootstrap.scss';
import './scss/bootstrap/scss/bootstrap-utilities.scss';
import './scss/bootstrap/scss/bootstrap-reboot.scss';
import './scss/bootstrap/scss/bootstrap-grid.scss';
import './scss/bootstrap.scss';



import './App.css';
import Login from './component/Login.js';
import Navbar from './component/Navbar.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './component/Footer.js';
import "./css/style.css";
import Hero from './pages/Hero.js';
import About from './pages/About.js';
import Register from './component/Register.js'
import ListDoctors from './api/list.js'
import Details from './api/Details.js'
import Profile from './component/doctor_Profile .js';
import Booking from './pages/Booking.js';
import DoctorProfile from "./component/DoctorProfile";
import PatientProfile from "./component/PatientProfile";
import DoctorAvailability from './pages/DoctorAvailability'; 
import PatientAppointment from './pages/PatientAppointment'; 
import DoctorAppointments from './pages/DoctorAppointments'; 
import Users from './component/Users';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route path="/" component={Hero} exact />
          <Route path="/about" component={About} exact />
          <Route path="/Register" component={Register} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/ListDoctors" component={ListDoctors} exact />
          <Route path="/Details/:id" component={Details} exact />
          <Route path="/booking" component={Booking} exact />
          <Route path="/doctor-profile" component={DoctorProfile} />
          <Route path="/patient-profile" component={PatientProfile} />
          <Route path="/doctor-availability" component={DoctorAvailability} /> 
          <Route path="/patient-appointment" component={PatientAppointment} /> 
          <Route path="/doctor-appointments" component={DoctorAppointments} /> 
          <Route path="/users" component={Users} />
          {/* <Route path="/Details/:id" component={Details} exact /> */}



        </Switch>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
