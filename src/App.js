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
import Register from './pages/Register.js'
import ListDoctors from './api/list.js'
import Details from './api/Details.js'
import FeedbackList from './feedback/feedbacklist.jsx';
import DoctorProfile from './pages/DoctorProfile.js';
import PatientProfile from './pages/PatientProfile'
// import DoctorAvailability from './pages/DoctorAvailability';
// import PatientAppointment from './pages/PatientAppointment';
// import DoctorAppointments from './pages/DoctorAppointments';
// import Profile from './component/doctor_Profile .js';

import feedback from './feedback/feedback.jsx'

import Appoint from './appointment/Appoint.js'
// import DoctorAvailability from './pages/DoctorAvailability'; 
import PatientAppointment from './appointment/PatientAppointment.js'; 
import DoctorAppointments from './appointment/DoctorAppointment.jsx';

import NotFound from './pages/NotFound.jsx'
import  ChatBot from './component/ChatBot.js'

// import Profile from './component/doctor_Profile .js';

// import feedback from './feedback/feedback.jsx'
// import NotFound from './pages/NotFound.jsx';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <ChatBot/>

        <Switch>
          <Route path="/" component={Hero} exact />
          <Route path="/about" component={About} exact />
          <Route path="/apoint" component={Appoint} exact />
          <Route path="/Register" component={Register} exact />
          <Route path="/DoctorProfile" component={DoctorProfile} exact />

          {/* <Route path="/booking" component={Booking} exact /> */}
          <Route path="/PatientProfile" component={PatientProfile} exact />
          {/* <Route path="/doctor-availability" component={DoctorAvailability} />  */}
          <Route path="/patient-appointment" component={PatientAppointment} />
          {/* <Route path="/doctor-appointments" component={DoctorAppointments} /> */}
          {/* <Route path="/feedback" component={feedback} exact /> */}
          <Route path="/login" component={Login} exact />
          <Route path="/ListDoctors" component={ListDoctors} exact />
          <Route path="/Details/:id" component={Details} exact />
          <Route path="/Details/:id?feedback=feedbackId" component={FeedbackList} exact />
          {/* <Route path="/feedbacklist" component={FeedbackList} exact /> */}
          <Route path="/doctor-profile" component={DoctorProfile} />
          <Route path="/patient-profile" component={PatientProfile} />


          {/* will delite it */}
          <Route path="/clinic" component={DoctorAppointments} exact />

          <Route path="*" component={NotFound} />

        </Switch>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
