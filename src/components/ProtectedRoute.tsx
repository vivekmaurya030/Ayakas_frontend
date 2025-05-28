import { Navigate } from "react-router";
 import { useAuthContext } from "../hooks/useAuthContext";

 interface ProtectedRouteProps {
    children: JSX.Element
 }

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {isAuthenticated} = useAuthContext();
    if(!isAuthenticated){
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRoute;