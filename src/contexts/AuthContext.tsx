import {createContext, useState, useEffect, ReactNode, useContext} from "react";
import {AuthContextType, User} from '../types/auth'

interface Props{

    children: ReactNode
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: Props) => {
    const [user, setUser] = useState<User | null>(null);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        const token  = localStorage.getItem('token');

        if(storedUser && token){
            setUser(JSON.parse(storedUser));
            // setIsAuthenticated(true);
        }
    },[]);

    const login = (UserData: User, token: string)=> {
        setUser(UserData);
        // setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(UserData));
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        // setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const value : AuthContextType = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
    };  

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider> 
    );
};


export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context; 
}