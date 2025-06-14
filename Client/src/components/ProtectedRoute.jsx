import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

import PageLoader from "./PageLoader.jsx";

const ProtectedRoutes = () => {
    const { user, loading } = useAuth();
    return (
        !loading ? (
            user ? (
                <Outlet />
            ) : (
                <Navigate to="/login" replace />
            )
        ) : (
            <PageLoader />
        )
    );
};

export default ProtectedRoutes;
