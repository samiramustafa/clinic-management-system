import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

import './scss/bootstrap/scss/bootstrap.scss';
import './scss/bootstrap/scss/bootstrap-utilities.scss';
import './scss/bootstrap/scss/bootstrap-reboot.scss';
import './scss/bootstrap/scss/bootstrap-grid.scss';

import './scss/bootstrap.scss';
import Details from './api/Details';
import ListDoctors from './api/list';


function App() {
  return (
    <div >
      <header >
       <ListDoctors/>
       <Details/>
      </header>
    </div>
  );
}

export default App;
