/**
 * @file testing.js
 * @description This file contains the testing store.
 */
import { defineStore } from 'pinia'

/**
 * Store for testing purposes.
 *
 * @typedef {Object} State
 * @typedef {Object} Getters
 * @typedef {Object} Actions
 *
 * State, Getters, and Actions can be used to change the state of the store.
 * But Actions allow for asynchronous operations and more processing.
 * While Getters allow for computed properties, derived from the state, e.g. doubleCount.
 * So avoid using State directly, use Getters and Actions instead.
 *
 */
export const useTestingStore = defineStore('testing', {
    state: () => ({
        count: 0
    }),
    getters: {
        doubleCount() {
            /**
             * @description This getter returns the double of the count.
             * @returns {number} The double of the count.
             */
            console.log('From store/testing | Getting doubleCount');
            return this.count * 2
        }
    },
    actions: {
        increment() {
            console.log('From store/testing | Incrementing count');
            this.count++
        },
        /**
         * Using action allows for processing such as validation, logging, etc.
         *
         * @description This action decrements the count.
         * @returns {void}
         */
        decrement() {
            if (this.count === 0) return
            console.log('From store/testing | Decrementing count');
            this.count--
        },
        reset() {
            if (this.count === 0) return
            console.log('From store/testing | Resetting count');
            this.count = 0
        }
    }
})
