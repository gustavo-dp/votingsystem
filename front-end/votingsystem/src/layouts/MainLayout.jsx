import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div>
            <Navbar />

            <main className="container-principal">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout