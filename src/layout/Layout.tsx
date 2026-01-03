import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Onboarding from '../components/Modals/onboarding/Onboarding'
import Signin from '../components/Modals/Signin'

const Layout = () => {
    return (
        <div className="h-screen max-h-screen flex flex-col overflow-hidden">
            <Header />
            
            <main className="flex-1 pb-5 px-4 overflow-hidden">
                <Outlet />
            </main>

            {/* Modal */}
            <Signin />
            <Onboarding />
        </div>
    )
}

export default Layout