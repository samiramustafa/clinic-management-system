import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/style.css';

import './scss/bootstrap/scss/bootstrap.scss';
import './scss/bootstrap/scss/bootstrap-utilities.scss';
import './scss/bootstrap/scss/bootstrap-reboot.scss';
import './scss/bootstrap/scss/bootstrap-grid.scss';
import './scss/bootstrap.scss';

import Details from './api/Details';
import ListDoctors from './api/list';

import './App.css';
import Login from './pages/Login';
import Navbar from './component/Navbar.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './component/Footer.js';
import "./component/style.css";
import Hero from './component/Hero.js';
import About from './pages/About.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        
        <Switch>
          <Route path="/" component={Hero} exact />
          <Route path="/about" component={About} exact />
          <Route path="/login" component={Login} exact />
          {/* Add more routes if needed */}
        </Switch>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
