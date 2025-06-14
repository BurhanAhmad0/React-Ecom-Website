import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import PageLoader from '../PageLoader'

const AdminRoutes = () => {

    const { user, loading } = useAuth()

    return !loading ? (
        user && user.user_role === "admin" ? (
            <Outlet />
        ) : (
            <Navigate to="/UnauthorizedAccess" replace />
        )
    ) : (
        <PageLoader />
    );
}

export default AdminRoutes
