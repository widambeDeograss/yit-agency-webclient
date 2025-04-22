import { APIClient } from '../../axios/instance';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
}

interface UserInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: 'male' | 'female';
  address: string;
  date_of_birth: string;
  profile: string;
}

class AuthService extends APIClient {
  constructor() {
    super('baseService');
  }

  login(credentials: LoginCredentials) {
    return this.post<LoginResponse>('/accounts/auth/login/', credentials);
  }

  
  regieter(credentials: any) {
    return this.post<any>('/auth/register', credentials, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  currentUserProfile() {
    return this.get<UserInfo>('/user/profile/');
  }

  updateCurrentUserProfile(data: any) {
    return this.put<UserInfo>('/user/profile/', data);
  }

  logout() {
    return this.post<void>('/auth/logout');
  }
 

  forgetReset(data:any) {
    return this.post<void>('/auth/password-reset/', data);
  }


  forgetPassword(data:any) {
    return this.post<void>('/auth/forgot-password', data);
  }


}

export const authService = new AuthService();