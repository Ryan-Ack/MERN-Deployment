import './App.css';
import Main from './components/Main';
import Create from './components/Create';
import Update from './components/Update';
import Details from './components/Details';
import { Router, Link } from '@reach/router'

function App() {
  return (
    <div className="App">
      <div>
        <h1>Moldy Tomatoes</h1> <button >Logout (does nothing)</button>
      </div>
      <hr />
      <div> Nav Bar:
        <Link to="/movies"> Home </Link>  |  <Link to="/movies/new"> New Movie </Link>
      </div>
      <hr />
      <Router>
        <Main path="/movies" />
        <Create path="/movies/new" />
        <Details path="/movies/:id" />
        <Update path="/movies/edit/:id" />
      </Router>
    </div >
  );
}

export default App;
