  
  export interface Customer {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    timezone: string;
    status: boolean;
    customerType: 'POSTPAID' | 'PREPAID';
  }

  // User Information Type
  export interface UserInfo {
    username: string;
    phone: string;
    email: string;
    roles: string[];
    role: string;
    permissions: string[];
    firstName?: string;
    lastName?: string;
    enabled: boolean;
    customer?: Customer | null;
  }


  
  // Authentication State Type
  export interface AuthState {
    user: UserInfo | null;
    tokens: {
      access: string | null;
      refresh: string | null;
    };
    isAuthenticated: boolean;
  }
  

