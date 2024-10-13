/**
 * @file subscriber/index.js
 * @description This file contains a custom hook that subscribes to changes in the `useTestingStore` store.
 */
import { useTestingStore } from '../testing';

/**
 * Subscribes to changes in the `useTestingStore` store.
 */
export default function useSubscriber() {
    useTestingStore().$subscribe((mutation) => {
        const newVal = mutation.events.newValue
        if (newVal % 2 === 0 && newVal !== 0) {
            console.log('From store/subscriber | Even number detected:', mutation.events.newValue);
        }
        localStorage.setItem('useTestingStore', JSON.stringify(mutation.events.newValue));
    })
}
