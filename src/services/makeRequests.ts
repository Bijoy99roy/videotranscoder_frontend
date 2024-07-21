import axios, { AxiosError, AxiosRequestConfig } from "axios";

interface Error {
    message: string[];
    statusCode: number;
  }
 

const api = axios.create({
baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
withCredentials: true,
headers: {
    Accept: 'application/json'
}
})

export async function makeRequests(url:string, options: AxiosRequestConfig) {
    try {

        const response = await api({
            url: url,
            method: options.method,
            data: options?.data,
            params: options?.params, 
            headers: options?.headers,
            
          });
        return response
    } catch (err) {
        const error = err as AxiosError<Error>;

        throw error;
    }
    
}