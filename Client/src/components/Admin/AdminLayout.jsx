import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../Admin/Navbar'
import Footer from '../Admin/Footer'

const AdminLayout = () => {
    return (
        <>
            <header>
                <Navbar bgColor='bg-gray-900' />
            </header>
            <Outlet />
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default AdminLayout
