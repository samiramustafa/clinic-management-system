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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route path="/" component={Hero} exact />
          <Route path="/about" component={About} exact />
          <Route path="/Register" component={Register} exact />


          <Route path="/login" component={Login} exact />
          <Route path="/ListDoctors" component={ListDoctors} exact />
          <Route path="/Details" component={Details} exact />



        </Switch>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
