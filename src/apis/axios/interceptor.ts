import { store } from '@/store/Store';
import {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios';
import { setCredentials } from '@/store/slices/auth/auth.slice';
import { displaySessionExpiredModal } from './session-expired';


export const setupInterceptors = (instance: AxiosInstance): void => {
  let isRefreshing = false;
  let failedQueue: any[] = [];

  const processQueue = (error: any = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve();
      }
    });
    failedQueue = [];
  };

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const state = store.getState();
      const accessToken = state.auth.tokens.access;
      
      if (accessToken) {
        // Add token expiration check here if using JWT
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    response => response.data,
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => instance(originalRequest))
            .catch(err => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const state = store.getState();
          const refreshToken = state.auth.tokens.refresh;

          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await instance.post<any>('/auth/refresh', {
            refreshToken
          });

          store.dispatch(
            setCredentials({
              accessToken: response.data.access,
              refreshToken: response.data.refresh,
              //@ts-ignore
              user: state.auth.user
            })
          );

          //@ts-ignore
          originalRequest.headers.Authorization = `Bearer ${response.access}`;
          
          processQueue();
          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError);
          
          // Only clear and reload for actual auth failures
          if (refreshError) {
            localStorage.clear();
            setTimeout(() => {
           displaySessionExpiredModal(); 
         }, 100);

         window.location.reload();
            return Promise.reject(refreshError);
          }
          
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};


