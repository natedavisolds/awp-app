import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import allPlaytimes from './Data/allPlaytimes'

import PlaytimeContainer from './Playtimes'

const App = () => 
  <div>
    <PlaytimeContainer allPlaytimes={allPlaytimes} />
  </div>

export default App
