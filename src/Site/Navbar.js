import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () =>
  <div className="h4 pane-header navbar fixed-bottom navbar-dark bg-dark nav-pills nav-fill">
    <Link to="/playtimes" className="navbar-item nav-link text-light text-center"><FontAwesomeIcon icon="running" /></Link>
    <Link to="/profile" className="navbar-item nav-link text-light text-center"><FontAwesomeIcon icon="user" /></Link>
  </div>

export default Navbar