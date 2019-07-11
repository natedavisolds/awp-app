import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import {PlaytimeProvider} from './PlaytimeContext'

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import PlaytimesContainer from './Playtimes'
import PlaytimeContainer from './Playtimes/PlaytimeContainer'
import Navbar from './Site/Navbar'
  
const App = () => 
  <PlaytimeProvider>
    <Router>
      <Route component={Navbar} />
      <Route exact default path={["/playtimes","/play"]} component={PlaytimesContainer} />
      <Route path="/playtimes/:playtimeId" component={PlaytimeContainer} />
    </Router>
  </PlaytimeProvider>

export default App
