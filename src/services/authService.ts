import axios from "axios";
import { LoginFormData, User } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const registerUser = async(UserData: User) =>{
  try {
    const response = await axios.post(`${API_URL}/auth/register`, UserData,{
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration Failed");  
  }
};

export const loginUser = async(loginData: LoginFormData) =>{
    try {
        const response = await axios.post(`${API_URL}/auth/login`, loginData,{
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login Failed");
        
    }
}