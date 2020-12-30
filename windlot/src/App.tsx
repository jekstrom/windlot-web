import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import CreateListing from "./pages/CreateListing"
import Home from "./pages/Home"
import { Button } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <Button>
                <Link to="/create-listing">Create Listing</Link>
              </Button>
              <Button>
                <Link to="/">Home</Link>
              </Button>
            </ul>
          </nav>
          <Switch>
            <Route path="/create-listing">
              <CreateListing />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
