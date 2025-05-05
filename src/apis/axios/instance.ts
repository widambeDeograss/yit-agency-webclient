import axios, { AxiosInstance } from 'axios';
import { setupInterceptors } from './interceptor';

const microservicesUrls = {
    baseService: 'https://api.yit-agency.com/api/v1',
  };
  
export type ServiceType = keyof typeof microservicesUrls;

// Create axios instances for each service
const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    },
  
  });

  // Setup interceptors for this instance
  setupInterceptors(instance);

  return instance;
};

// Create and export service-specific instances
export const serviceInstances: Record<ServiceType, AxiosInstance> =
  Object.entries(microservicesUrls).reduce(
    (acc, [key, url]) => ({
      ...acc,
      [key]: createAxiosInstance(url)
    }),
    {} as Record<ServiceType, AxiosInstance>
  );

// Base API client class
export class APIClient {
  private instance: AxiosInstance;

  constructor(service: ServiceType) {
    this.instance = serviceInstances[service];
  }

  protected get axiosInstance() {
    return this.instance;
  }

  async get<T>(url: string, params?: Record<string, any>, config?: any): Promise<T> {
    const queryParams = new URLSearchParams();

    // Add parameters to the query string
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        console.log('Key:', key, 'Value:', value);
        
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
  
    const queryString = queryParams.toString();
      
    return this.instance.get(`${url}${queryString ? `?${queryString}` : ''}`, config);
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.instance.post(url, data, config);
  }

  async put<T>(url: string, data?: any): Promise<T> {
    return this.instance.put(url, data);
  }

  async patch<T>(
    url: string,
    data?: any,
    //@ts-ignore
    p0?: { headers: { 'Content-Type': string } }
  ): Promise<T> {
    return this.instance.patch(url, data);
  }

  async delete<T>(url: string, p0?: { id: number; }): Promise<T> {
    const queryParams = new URLSearchParams();

    // Add parameters to the query string
    if (p0) {
      Object.entries(p0).forEach(([key, value]) => {
        console.log('Key:', key, 'Value:', value);
        
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const queryString = queryParams.toString();
  
    return this.instance.delete(`${url}${queryString ? `?${queryString}` : ''}`);
  }
}