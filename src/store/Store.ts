import {configureStore, combineReducers} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authSlice from './slices/auth/auth.slice';
import { AuthState, UserInfo } from "./types/auth-state";
import { decryptData, encryptData } from "./slices/auth/encript-data";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import accauntSlice from "./slices/account.slice";

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['tokens', 'auth', "accaunt"],
  transforms: [
    {
      in: (state: AuthState) => ({
        ...state,
        tokens: {
          access: state?.tokens?.access
            ? encryptData(state?.tokens?.access)
            : null,
          refresh: state?.tokens?.refresh
            ? encryptData(state?.tokens?.refresh)
            : null
        },
        user: state.user ? encryptData(state?.user) : null
      }),
      out: (state: any) => ({
        ...state,
        tokens: {
          access: state?.tokens?.access
            ? decryptData<string>(state?.tokens?.access)
            : null,
          refresh: state?.tokens?.refresh
            ? decryptData<string>(state?.tokens?.refresh)
            : null
        },
        user: state.user ? decryptData<UserInfo>(state?.user) : null
      })
    }
  ]
};

const rootReducer = combineReducers({
     auth:authSlice,
     accaunt: accauntSlice
}); 
  
const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
          }
        }),
    devTools:true,
  });

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatcher = typeof store.dispatch;
  export const persistor = persistStore(store);
