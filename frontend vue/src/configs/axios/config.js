/**
 * Axios configuration
 * @file config.js
 * @description This file sets up Axios configuration based on the environment.
 */
import axios from 'axios';

const modes = {
    local: {
        baseURL: import.meta.env.VITE_API_URL_LOCAL,
    },
    ngrok: {
        baseURL: import.meta.env.VITE_API_URL_NGROK,
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    },
    production: {
        baseURL: import.meta.env.VITE_API_URL_PRODUCTION,
    },
}

export const storageLink = modes[import.meta.env.VITE_API_MODE].baseURL + '/storage/'

/**
 * Configures Axios with the specified mode settings.
 *
 * @param {string} mode - The mode to configure Axios with. Must be a key in the `modes` object.
 * @throws {Error} Throws an error if the specified mode is not defined in `modes`.
 */
export default function useAxiosConfig(mode) {
    const selectedMode = modes[mode];
    if (!selectedMode) {
        throw new Error(`Mode ${mode} is not defined in modes`);
    }
    axios.defaults.baseURL = selectedMode.baseURL + '/api/v1';
    axios.defaults.headers = {
        ...axios.defaults.headers,
        ...selectedMode.headers || {},
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
}
