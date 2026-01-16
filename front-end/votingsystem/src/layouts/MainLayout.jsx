import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import CreatePollModal from '../components/createPollModal/CreatePollModal' // Importe o Modal aqui

const MainLayout = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <div>
            <Navbar onOpenCreate={() => setIsCreateModalOpen(true)} />

            <main className="container-principal">
                <Outlet />
            </main>
            {isCreateModalOpen && (
                <CreatePollModal
                    onClose={() => setIsCreateModalOpen(false)}
                    onSuccess={() => {
                        window.location.reload();
                    }}
                />
            )}
        </div>
    )
}

export default MainLayout