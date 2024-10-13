/**
 * @file router/index.js
 * @description This file contains the router configuration.
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import appdata from '@/configs/appdata'
import mainShell from '@/shell/mainShell.vue'
import ItemView from '@/views/ItemView.vue'
import { useAuthStore } from '@/stores/auth'
import TransactionView from '@/views/TransactionView.vue'
import AddtransactionView from '@/views/addtransactionView.vue'
import { mstr } from '@/modules/core'
import UsersView from '@/views/usersView.vue'
import CouponsView from '@/views/couponsView.vue'
/**
 * Create a new router instance.
 */
export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/coupons",
            name: "coupons",
            component: () => import('../views/couponsView.vue')
        },

        {
            path: '/',
            meta: { shell: true, auth: true },
            component: mainShell,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: HomeView
                },
                {
                    path: "item",
                    name: "products",
                    component: ItemView
                },
                {
                    path: "transaction",
                    name: "transaction",
                    component: TransactionView
                },
                {
                    path: "transaction/add",
                    name: "add transaction",
                    component: AddtransactionView
                },
                {
                    path: "users",
                    name: "users",
                    meta: { admin: true },
                    component: UsersView
                },
                {
                    path: "promo",
                    name: "promo",
                    meta: { admin: true },
                    component: CouponsView
                },
            ]
        },
        {
            path: "/login",
            name: "login",
            meta: { noAuth: true },
            component: () => import('../views/loginView.vue')
        },
        {
            path: "/:pathMatch(.*)*",
            name: "notfound",
            component: () => import('../views/notfoundView.vue')
        }
    ]
})

/**
 * This function is called before every route change.
 */


router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    console.log(authStore)
    document.title = `${mstr(to.name).capitalize(true)} - ${appdata.title}`
    console.log('From router/index.js | Navigating to:', to.name)

    if (to.meta.auth && !authStore.isAuth) {
        next({ name: 'login', query: { redirect: to.fullPath } })
        return
    }
    if (to.meta.noAuth && authStore.isAuth) {
        next({ name: 'home' })
        return
    }
    if (to.meta.admin && !authStore.isAdmin) {
        next({ name: 'home' })
        return
    }
    next()
})

export default router
