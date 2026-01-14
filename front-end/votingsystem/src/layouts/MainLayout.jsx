import React from 'react'
import Navbar from '../components/navbar/Navbar' // ou o caminho da sua navbar
import { Outlet } from 'react-router-dom' // <--- IMPORTANTE

const MainLayout = () => {
    return (
        <div>
            <Navbar />

            <main className="container-principal">
                {/* O Outlet é o buraco onde a rota filha (Home) vai aparecer */}
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout