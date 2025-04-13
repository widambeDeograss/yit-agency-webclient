import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, UserInfo } from '../../types/auth-state';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    tokens: {
      access: null,
      refresh: null
    },
    isAuthenticated: false
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string, user:UserInfo }>
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
    }
  }
});

export const { setCredentials, setLogoutAction } = authSlice.actions;
export default authSlice.reducer;
