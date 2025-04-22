import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth-state';
import { User } from '@/types/account';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    tokens: {
      access: null,
      refresh: null
    },
    isAuthenticated: false,
    openLogin: false,
    openRegister: false
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string, user:User }>
    ) => {
      const { accessToken, refreshToken, user } = action.payload;
      console.log('user', user);
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      

      state.tokens.access = accessToken;
      state.tokens.refresh = refreshToken;
      state.user = user;
      state.isAuthenticated = !!user;
    },
    setLogoutAction: state => {
      state.user = null;
      state.tokens = { access: null, refresh: null };
      state.isAuthenticated = false;
    },
    SetOpenLogin: (state, action: PayloadAction<boolean>) => {
      console.log('action.payload', action.payload);
      
      state.openLogin = action.payload;
    },
    SetOpenRegister: (state, action: PayloadAction<boolean>) => {
      state.openRegister = action.payload;
  }
  }
});

export const { setCredentials, setLogoutAction, SetOpenLogin } = authSlice.actions;
export default authSlice.reducer;
