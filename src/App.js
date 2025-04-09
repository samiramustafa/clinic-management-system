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
import Register from './pages/Register.js';
import ListDoctors from './api/list.js';
import Details from './api/Details.js';
import FeedbackList from './feedback/feedbacklist.jsx';
import DoctorProfile from './pages/DoctorProfile.js';
import PatientProfile from './pages/PatientProfile';
import Feedback from './feedback/feedback.jsx';
import Appoint from './appointment/Appoint.js';
import PatientAppointment from './appointment/PatientAppointment.js';
import DoctorAppointments from './appointment/DoctorAppointment.jsx';
import NotFound from './pages/NotFound.jsx';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import the Scroll-To-Top Button
import ScrollToTopButton from './component/ScrollToTopButton';
import AdminLogin from './pages/AdminLogin.js';
import ChatBot from './component/ChatBot.js';
import AdminDashboard from './pages/AdminDashboard';
import AdminProtectedRoute from './component/AdminProtectedRoute';
import { FeedbackProvider } from './feedback/feedbackcontext.js';
import AppointmentStatus  from './appointment/AppointmentStatus.js'


function App() {
  return (
    <div id="root">
      <BrowserRouter>
        <FeedbackProvider> {/* Wrap the entire app */}
          <Navbar />
          <div className="main-content">
            <Switch>
              <Route path="/" component={Hero} exact />
              <Route path="/about" component={About} exact />
              <Route path="/apoint" component={Appoint} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/doctor-profile" component={DoctorProfile} exact />
              <Route path="/patient-profile" component={PatientProfile} exact />
              <Route path="/patient-appointment" component={PatientAppointment} />
              <Route path="/login" component={Login} exact />
              <Route path="/list-doctors" component={ListDoctors} exact />
              <Route path="/details/:id" component={Details} exact />
              <Route path="/details/:id/feedback/:feedbackId" component={FeedbackList} exact />
              <Route path="/feedbacklist" component={FeedbackList} exact />
              <Route path="/clinic" component={DoctorAppointments} exact />
               <Route path="/appointmentstatus" component={AppointmentStatus} exact />


              <Route path="/admin/login" component={AdminLogin} exact />
              <AdminProtectedRoute path="/admin/dashboard">
                <AdminDashboard />
              </AdminProtectedRoute>
              <Route path="*" component={NotFound} />
            </Switch>
              {/* abdelrjman 2:40 */}
          </div>
          <ChatBot />
          <Footer />
          {/* Scroll-To-Top Button */}
          <ScrollToTopButton />
        </FeedbackProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;