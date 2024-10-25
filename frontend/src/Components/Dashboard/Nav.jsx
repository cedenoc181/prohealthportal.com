
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom"
import './Nav.css'
import logo from '../../images/prohealth-logo.png'

export const Nav = (props) => {
  return (
    <div id='nav' className="col">
        <div className="nav-header">
            <img className="logo" src={logo} alt="proHealth and Fitness logo"/>
            <h2 className="nave-title">_ProHealth Portal_</h2>
        </div>
        
        <div className="nav-slot">
        <NavLink
        className="nav-link"
        to="/overview"
        style={({ isActive }) => ({
            color: isActive
                ? "orange"
                : "white",
        })}>
            
        </NavLink>
        </div>

        <NavLink>
        </NavLink>

        <NavLink>
        </NavLink>

        <NavLink>
        </NavLink>

        <NavLink>
        </NavLink>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)