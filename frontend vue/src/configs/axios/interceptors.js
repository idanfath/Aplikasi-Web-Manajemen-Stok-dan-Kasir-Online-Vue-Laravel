/**
 * @file interceptors.js
 * @description This file sets up Axios response interceptors to handle HTTP responses globally.
 */
import axios from 'axios';
import router from '@/router';

/**
 * Sets up Axios response interceptors.
 *
 * This function configures Axios to handle HTTP responses globally. In this
 * example, it logs 404 errors and redirects the user to the home page when a
 */
export default function useInterceptors() {
    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            // if (error.response && error.response.status === 404) {
            //     console.log('404, redirecting to home');
            //     router.push({ name: 'home' });
            // }
            return Promise.reject(error);
        }
    );
}
