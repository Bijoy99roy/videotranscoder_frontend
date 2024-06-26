import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface Error {
    message: string[];
    statusCode: number;
  }
 
interface Config {
    url: string;
    method: string;
    data?: any
}
console.log(import.meta.env.VITE_SERVER_URL) 
const api = axios.create({
baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
withCredentials: true,
headers: {
    Accept: 'application/json'
}
})

export async function makeRequests(url:string, options: AxiosRequestConfig) {
    try {
        console.log(options) 
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
        console.log(error)
        console.log(error.response)
        throw error;
    }
    
}