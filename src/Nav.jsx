import './Nav.css'
import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div className='Nav'>
      <div className='Nav-item'><Link className='secondary-color' to='/'>Home</Link></div>
      <div className='Nav-item'><Link className='secondary-color' to='/about'>About</Link></div>
      <div className='Nav-item'><Link className='secondary-color' to='/projects'>Projects</Link></div>
      <div className='Nav-item'><Link className='secondary-color' to='/contacts'>Contacts</Link></div>
    </div>
  )
}

export default Nav;
