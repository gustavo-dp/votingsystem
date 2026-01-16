import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import BlueButton from '../blueButton/BlueButton'
import './navbar.css'


const Navbar = ({ onOpenCreate }) => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-left">
                    <Link to="/" className="logo">VotaSystem.</Link>
                    <div className="nav-links">
                        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                            Feed
                        </NavLink>
                    </div>
                    <div className="nav-left">
                        <Link to="/login" className={({ isActive }) => isActive ? "active" : ""}>
                            Login
                        </Link>
                    </div>
                </div>
                <div className="nav-actions">
                    <BlueButton onClick={onOpenCreate}>
                        Nova Enquete
                    </BlueButton>
                </div>

            </div>
        </nav>
    )
}

export default Navbar