import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () =>
  <div className="pane-header navbar fixed-bottom navbar-dark bg-dark">
    <Link to="/playtimes" className="navbar-item text-light">Playtimes</Link>
    <Link to="/profile" className="navbar-item text-light">Profile</Link>
  </div>

export default Navbar