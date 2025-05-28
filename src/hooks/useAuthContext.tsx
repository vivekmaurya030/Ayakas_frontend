import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";

export const useAuthContext = () =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;

}