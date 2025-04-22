import { User } from "@/types/account";
  
  // Authentication State Type
  export interface AuthState {
    user: User | null;
    tokens: {
      access: string | null;
      refresh: string | null;
    };
    isAuthenticated: boolean;
    openLogin: boolean;
    openRegister: boolean;
  }
  

