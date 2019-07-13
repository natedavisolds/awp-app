import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import {PlaytimeProvider} from './PlaytimeContext'
import {UserProvider} from './UserContext'

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import PlaytimesContainer from './Playtimes'
import PlaytimeContainer from './Playtimes/PlaytimeContainer'
import ProfileContainer from './Profile'

import Navbar from './Site/Navbar'

import {loadIconLibrary} from './IconLibrary'

loadIconLibrary()
  
const App = () => 
  <UserProvider>
    <PlaytimeProvider>
      <Router>
        <Route component={Navbar} />
        <Route exact default path={["/playtimes","/play"]} component={PlaytimesContainer} />
        <Route exact path="/profile" component={ProfileContainer} />
        <Route path="/playtimes/:playtimeId" component={PlaytimeContainer} />
      </Router>
    </PlaytimeProvider>
  </UserProvider>

export default App
