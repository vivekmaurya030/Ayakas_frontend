// types/auth.d.ts

export interface Preferences {
    cuisine?: string[];
    diet?: "vegan" | "keto" | "vegetarian" | "non-vegetarian" | "none";
    tasteProfile?: string[]; // e.g., ["Spicy", "Sweet"]
    allergies?: string[];
    skillLevel?: "beginner" | "intermediate" | "expert";
  }
  
  export interface User {
    _id?: string;
    name: string;
    email: string;
    role: "Admin" | "User" | "Guest" | "Chef";
    preferences?: Preferences;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }
  
  export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
  }
  
  export interface LoginFormData {
    email: string;
    password: string;
  }
  

  export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
  }