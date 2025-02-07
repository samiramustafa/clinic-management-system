
import './App.css';
import Navbar from './component/Navbar.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './component/Footer.js';
import "./component/style.css";
import Hero from './component/Hero.js';
import About from './pages/About.js';
import Register from './component/Register.js'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        
        <Switch>
          <Route path="/" component={Hero} exact />
          <Route path="/about" component={About} exact />
          <Route path="/Register" component={Register} exact />
   
        </Switch>
        
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
