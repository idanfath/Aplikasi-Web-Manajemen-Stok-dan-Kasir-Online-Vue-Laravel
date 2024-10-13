/* eslint-disable no-unused-vars */

/**
 * Main entry point for the Vue application.
 *
 * @file main.js
 * @description This file sets up and initializes the Vue application, including global styles, plugins, and configurations.
 */

// styles
import './assets/main.css'
import 'primeicons/primeicons.css'

/**
 * Main entry point for the Vue application.
 * @module main
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

/**
 * Configures Axios with the specified mode settings.
 * @module config
 * @param {string} mode - The mode to configure Axios with. Must be a key in the `modes` object.
 * @throws {Error} Throws an error if the specified mode is not defined in `modes`.
 */
import config from './configs/axios/config'
config(import.meta.env.VITE_API_MODE)
import useInterceptors from './configs/axios/interceptors'
useInterceptors()

// primevue
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';
import { MotionPlugin } from '@vueuse/motion';

/**
 * Initializes the Vue application.
 *
 * @function createApp
 * @description Creates a new Vue application instance and sets up global plugins.
 */
const app = createApp(App)
app.use(createPinia())
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.dark',
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    }
})
app.use(ConfirmationService)
app.use(ToastService)
app.use(MotionPlugin)

import useSubscriber from './stores/subscriber'
/**
 * Sets up the subscriber for the Vue application.
 *
 * @function useSubscriber
 * @description Initializes the subscriber for the Vue application.
 */
useSubscriber()

import getLocalData from './stores/subscriber/onrefresh'
/**
 * Mounts the Vue application after getting local data.
 *
 * @function getLocalData
 * @description Fetches local data before mounting the Vue application.
 * @returns {Promise} A promise that resolves when local data is fetched.
 */
getLocalData().then(() => {
    app.use(router) //.TERNAYTA HARUS TARO SINI COKKK BIAR GAK ERROR AOWKDOAWKDOAWKDOAWKDOAWKDA
    app.mount('#app')
})
