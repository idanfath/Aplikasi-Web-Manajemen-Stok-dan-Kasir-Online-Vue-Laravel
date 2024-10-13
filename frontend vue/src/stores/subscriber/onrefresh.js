/**
 * @file onrefresh.js
 * @description This file is used to restore local storage data
 * when the app is refreshed.
 */
import { useAuthStore } from "../auth";
import { useTestingStore } from "../testing";

/**
 * Gets local data. We're returning a promise because we're
 * actually using .then in main.js
 *
 * @returns {Promise}
 * @example
 * getLocalData().then(() => {
 *  console.log('Local data has been restored');
 *  app.mount('#app')
 * }
 */
export default async function getLocalData() {
    // useTestingStore().count = JSON.parse(localStorage.getItem('useTestingStore')) || 0;
    const token = localStorage.getItem("TOKEN")
    await useAuthStore().attempt(token)
    console.log('From store/subscriber/onrefresh | Getting local data');
}
