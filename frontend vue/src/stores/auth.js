/**
 * @file testing.js
 * @description This file contains the testing store.
 */
import axios from 'axios';
import { defineStore } from 'pinia'

function setAxiosAuth(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('TOKEN', token)
        return
    }
    delete axios.defaults.headers.common['Authorization']
    localStorage.removeItem('TOKEN')
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        TOKEN: null,
        USER: null,
    }),
    getters: {
        // isAdmin() {
        //     return !!this.USER.role === "admin" || undefined
        // },
        isAdmin: (state) => state.USER?.role === 'admin',
        isAuth: (state) => !!state.TOKEN,
        getUser: (state) => state.USER,
    },
    actions: {
        resetAll() {
            this.TOKEN = null
            this.USER = null
            setAxiosAuth()
        },
        async login(credentials) {
            const response = await axios.post('auth/login', credentials)
            await this.attempt(response.data.token)
            return response
        },
        async attempt(token) {
            console.log('attempting')
            if (token) this.TOKEN = token
            if (!this.TOKEN) {
                this.resetAll()
                return
            }
            setAxiosAuth(token)
            try {
                const response = await axios.get('auth/info')
                this.USER = response.data.user
            } catch (error) {
                this.resetAll()
            }
        },
        async logout() {
            axios.post('auth/logout').catch((e) => { })
            this.resetAll()
            return
        },
        register(credentials) {
            return axios.post('admin/register', credentials)
        },
        async updateProfile(data) {
            const response = await axios.put(`user/${this.USER.id}`, data)
            this.USER = response.data.data
            return response
        }
    }
})
