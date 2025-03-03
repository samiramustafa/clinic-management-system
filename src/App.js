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
import FeedbackList from './feedback/FeedbackList.js';
import DoctorProfile from './pages/DoctorProfile.js';
// import PatientProfile from './pages/PatientProfile'
import PatientProfile from './pages/PatientProfile'
 import AppointmentForm from './pages/AppointmentForm'
 import ClinicSchedule from './component/ClinicSchedule.js'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route path="/" component={Hero} exact />
          <Route path="/about" component={About} exact />
          <Route path="/Register" component={Register} exact />
          <Route path="/DoctorProfile" component={DoctorProfile} exact />

          <Route path="/PatientProfile" component={PatientProfile} exact />
          <Route path="/AppointmentForm" component={AppointmentForm} exact />
          <Route path="/Appointment" component={ClinicSchedule} exact />



          

          <Route path="/login" component={Login} exact />
          <Route path="/ListDoctors" component={ListDoctors} exact />
          <Route path="/Details/:id" component={Details} exact />

          <Route path="/Details/:id?feedback=feedbackId" component={FeedbackList} exact />






        </Switch>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
