import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () =>
  <div className="pane-header navbar fixed-bottom navbar-dark bg-dark nav-pills nav-fill">
    <ul className="nav nav-fill nav-pills nav-justify">
      <li className="nav-item">
        <Link to="/playtimes" className="nav-link text-light text-center"><FontAwesomeIcon icon="running" /></Link>
      </li>
      <li className="nav-item">
        <Link to="/profile" className="nav-link text-light text-center"><FontAwesomeIcon icon="user" /></Link>
      </li>
    </ul>
  </div>

export default Navbar