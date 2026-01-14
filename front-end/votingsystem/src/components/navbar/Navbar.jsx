import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import BlueButton from '../blueButton/BlueButton'
import './navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-left">
                    <Link to="/" className="logo">VotaSystem.</Link>

                    <div className="nav-links">
                        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                            Feed
                        </NavLink>
                        <NavLink to="/meus-votos" className={({ isActive }) => isActive ? "active" : ""}>
                            Meus Votos
                        </NavLink>
                    </div>
                </div>

                <div className="nav-actions">
                    <NavLink to="/create" style={{ textDecoration: 'none' }}>
                        <BlueButton>Nova Enquete</BlueButton>
                    </NavLink>
                </div>

            </div>
        </nav>
    )
}

export default Navbar