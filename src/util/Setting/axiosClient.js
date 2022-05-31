import axios from 'axios';
import { TOKEN } from './config';

const config = {
    
}

export const axiosClient = axios.create();

axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    if (error.response.status === 401) {
        console.log(error)
        localStorage.removeItem(TOKEN)
        window.location.replace("/login");
    } else {
        return Promise.reject(error);
    }
});