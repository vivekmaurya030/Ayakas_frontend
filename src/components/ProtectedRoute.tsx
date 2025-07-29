import { Navigate } from "react-router";
 import { useAuthContext } from "../hooks/useAuthContext";
import React from "react";

 interface ProtectedRouteProps {
    children: React.ReactNode
 }

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {isAuthenticated} = useAuthContext();
    if(!isAuthenticated){
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRoute;