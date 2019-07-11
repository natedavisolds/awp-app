import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import {PlaytimeProvider} from './PlaytimeContext'

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';



import PlaytimeContainer from './Playtimes'
import Navbar from './Site/Navbar'

const BlankContainer = () => <div><h1>Blank</h1></div>

const App = () => 
  <PlaytimeProvider>
    <Router>
      <Route component={Navbar} />
      <Route  exact default path={["/playtimes","/play"]} component={PlaytimeContainer} />
      <Route  path="/playtimes/:playtimeId" component={PlaytimeContainer} />
    </Router>
  </PlaytimeProvider>


export default App
