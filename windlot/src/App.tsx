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
import Login from "./pages/Login"
import CreateAccount from "./pages/CreateAccount"
import { Button } from '@material-ui/core';
import Profile from './pages/Profile';
import ListingDetails from './pages/ListingDetails';

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
                <Link to="/listing-details">Listing Details</Link>
              </Button>
              <Button>
                <Link to="/login">Login</Link>
              </Button>
              <Button>
                <Link to="/create-account">Create Account</Link>
              </Button>
              <Button>
                <Link to="/profile">Profile</Link>
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
            <Route path="/listing-details">
              <ListingDetails />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/create-account">
              <CreateAccount />
            </Route>
            <Route path="/profile">
              <Profile />
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
