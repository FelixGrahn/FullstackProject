import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Start from "./components/Home/Start";
import Gallery from "./components/gallery/Gallery";
import Battle from "./components/battle/Battle";

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <nav>
          <Link to="/"> Start </Link>
          <Link to="/Battle"> Battle </Link>
          <Link to="/Gallery"> Gallery </Link>
        </nav>
      </header>
      <main>
        <Switch>
					<Route path="/Gallery"> {<Gallery />} </Route>
					<Route path="/Battle"> {<Battle />} </Route>
					<Route path="/"> {<Start />} </Route>
					
				</Switch>
      </main>
    </div>
    </Router>
  );
}

/* function App() {
	return (
		<Router>
		<div className="App">
			<header className="App-header">
				<nav>
					<Link to="/"> starting </Link>
					<Link to="/battle"> kamp </Link>
					<Link to="/Gallery"> Gallery </Link>
				</nav>
			</header>
			<main>
				<Switch>
					<Route path="/Gallery"> {<Gallery />} </Route>
					<Route path="/"> {<Start />} </Route>
				</Switch>
			</main>
		</div>
		</Router>
	);
} */

export default App;
