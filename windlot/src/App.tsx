import React from 'react';
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import CreateListing from "./pages/CreateListing"
import { store } from './store/index'
import { Button } from '@material-ui/core';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

import Index from "./landing/Home"
import Home from "./pages/Home"
import Login from "./pages/Login"
import CreateAccount from "./pages/CreateAccount"
import Profile from './pages/Profile';
import ListingDetails from './pages/ListingDetails';
Amplify.configure(awsconfig);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <div>
            {/* <nav>
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
            </nav> */}
            <Switch>
              <Route path="/create-listing">
                <CreateListing />
              </Route>
              <Route path="/listing-details/:id" render={(props) => {
                  return (<ListingDetails ListingId={props.match.params.id} />)
                }}>
              </Route>
              <Route path="/login" render={(routerProps) => {
                  return (
                    <Login routerProps={routerProps}/>
                  )
                }}>
              </Route>
              <Route path="/create-account">
                <CreateAccount />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/home" render={(routerProps) => {
                  return (
                    <Home routerProps={routerProps}/>
                  )
                }}>
              </Route>  
              <Route path="/">
                <Index />
              </Route>            
              
            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
