<template>
    <Drawer :visible="drawer_visible" header="Drawer" class="overflow-y-scroll hiddenscrollbar">
        <template #container>
            <div class="flex flex-col h-full">
                <div class="flex justify-between items-center px-6 py-4 shrink-0">
                    <div>
                        <p class="font-bold text-3xl">{{ appdata.title }}</p>
                        <p v-if="authStore.isAuth">{{ authStore.getUser.username }} <Tag severity="success"
                                class="text-xs p-0.5 px-1.5 ml-1" rounded>
                                {{
                                    authStore.getUser.role
                                }}
                            </Tag>
                        </p>
                    </div>
                    <div>
                        <Button icon="pi pi-times" @click="toggleDrawer" />
                    </div>
                </div>
                <div>
                    <PanelMenu :model="computed_sidebar_item" class=" my-4 px-4 w-full select-none ">
                        <template #item="{ item }">
                            <p v-if="item.to" @click="sidebarPushTo(item.to)" class="p-3 py-1 ">
                                <span :class="[item.icon, 'text-primary group-hover:text-inherit']" />
                                <span :class="['ml-2', { 'font-semibold': item.to === $route.name }]">{{ item.label }}
                                </span>
                            </p>
                            <p v-else @click="item.method" class="p-3 py-1">
                                <span :class="[item.icon, 'text-primary group-hover:text-inherit']" />
                                <span class="ml-2">{{ item.label }} </span>
                            </p>
                        </template>
                    </PanelMenu>
                </div>
            </div>
        </template>
    </Drawer>
    <main class="flex h-screen overflow-hidden">
        <div class="side-panel hiddenscrollbar">
            <div class="side-header">
                <p class="font-bold text-3xl">{{ appdata.title }}</p>
                <p v-if="authStore.isAuth">{{ authStore.getUser.username }} <Tag severity="success"
                        class="text-xs p-0.5 px-1.5 ml-1" rounded>
                        {{ authStore.getUser.role }}
                    </Tag>
                </p>
            </div>
            <PanelMenu :model="computed_sidebar_item" class=" my-4 px-4 w-full select-none ">
                <template #item="{ item }">
                    <p v-if="item.to" @click="$router.push({ name: item.to })" class="p-3 py-1 ">
                        <span :class="[item.icon, 'text-primary group-hover:text-inherit']" />
                        <span :class="['ml-2', { 'font-semibold': item.to === $route.name }]">{{ item.label }}
                        </span>
                    </p>
                    <p v-if="item.method" @click="item.method" class="p-3 py-1">
                        <span :class="[item.icon, 'text-primary group-hover:text-inherit']" />
                        <span class="ml-2">{{ item.label }} </span>
                    </p>
                </template>
            </PanelMenu>
        </div>
        <div class="content">
            <div class="border-b-2 w-full">
                <Toolbar class="px-7 border-none select-none rounded-none">
                    <template #start>
                        <div class="center-vertical gap-2">
                            <img src="@/assets/logo.svg" alt="logo" class="size-7 lg:hidden" />
                            <p class="font-semibold text-2xl">
                                {{ pageTitle }}
                            </p>
                        </div>
                    </template>

                    <template #center>
                    </template>

                    <template #end>
                        <div class="flex justify-between items-center gap-2 *:h-full">
                            <Button class="lg:hidden" severity="secondary">
                                <i class="pi pi-bars" @click="toggleDrawer" />
                            </Button>
                            <Button severity="secondary" icon="pi pi-home" @click="$router.push({ name: 'home' })">
                            </Button>
                            <Button class="mr-1" icon="pi pi-user" severity="secondary" @click="toggelProfileModal">
                            </Button>
                        </div>
                    </template>
                </Toolbar>
            </div>

            <div class="p-5">
                <router-view></router-view>
            </div>
        </div>
    </main>

    <comp-modal title="update profile" :isOpen="modal.show" @close="toggelProfileModal" @confirm="commitProfileChange"
        :disabledConfirm="v$.modal.data.$invalid">
        <div class="flex flex-col ">
            <div>
                <label for="name" class="font-semibold">Username</label>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-user" />
                    </InputGroupAddon>
                    <InputText id="name" v-model="modal.data.username" />
                </InputGroup>
            </div>
            <div>
                <label for="old_password" class="font-semibold">Current Password</label>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-lock" />
                    </InputGroupAddon>
                    <Password id="old_password" v-model="modal.data.old_password" placeholder="Current Password"
                        toggleMask :feedback="false" />
                </InputGroup>
            </div>
            <FieldSet legend="Change Password" :toggleable="true" collapsed class="mt-2">
                <p class="text-sm mb-2">Leave it blank if you don't want to change the password</p>
                <div>
                    <label for="password" class="font-semibold">Password</label>
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-lock" />
                        </InputGroupAddon>
                        <Password id="password" v-model="modal.data.password" placeholder="New Password" toggleMask />
                    </InputGroup>
                </div>
                <div>
                    <label for="password_confirmation" class="font-semibold">Password Confirmation</label>
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-lock
                        " />
                        </InputGroupAddon>
                        <Password id="password_confirmation" v-model="modal.data.password_confirmation" toggleMask
                            :feedback="false" placeholder="Confirm Password" />
                    </InputGroup>
                </div>
            </FieldSet>
        </div>
    </comp-modal>
</template>

<script>
import { useAuthStore } from '@/stores/auth';


export default {
    computed: {
        pageTitle() {
            return mstr(this.$route.name).capitalize(true)
        },
        computed_sidebar_item() {
            return this.sidebar_item.filter((item) => {
                if (item.admin) {
                    try {
                        return this.authStore.getUser.role === 'admin'
                    } catch (error) {
                        return false
                    }
                }
                return true
            })
        }
    },
    data() {
        return {
            modal: {
                show: false,
                data: {
                    username: '',
                    password: '',
                    password_confirmation: '',
                    old_password: '',
                }
            },
            appdata,
            drawer_visible: false,
            authStore: useAuthStore(),
            visibleSidebar: false,
            sidebar_item: [
                {
                    label: 'Dashboard',
                    icon: 'pi pi-table',
                    to: 'home',
                },
                {
                    label: 'Products',
                    icon: 'pi pi-warehouse',
                    to: 'products',
                },
                {
                    label: 'History',
                    icon: 'pi pi-history',
                    to: 'transaction',
                },
                {
                    label: 'Transaction',
                    icon: 'pi pi-plus',
                    to: 'add transaction',
                },
                {
                    label: 'Promo',
                    icon: 'pi pi-tags',
                    to: 'promo',
                    admin: true,
                },
                {
                    label: 'Accounts',
                    icon: 'pi pi-user',
                    to: 'users',
                    admin: true,
                },
                {
                    label: 'Sign Out',
                    icon: 'pi pi-sign-out',
                    method: this.onLogout,
                },
            ],
            v$: useVuelidate()
        }
    },
    validations() {
        return {
            modal: {
                data: {
                    username: { required },
                    old_password: { required, minLength: minLength(8) },
                    password: { minLength: minLength(8) },
                    password_confirmation: { sameAs: sameAs(this.modal.data.password) }
                }
            }
        }
    },
    mounted() {
        this.v$.$touch()
    },
    methods: {
        commitProfileChange() {
            const data = { ...this.modal.data }
            // remove password and password_confirmation if it's empty
            if (!data.password) {
                delete data.password
                delete data.password_confirmation
            }

            useAuthStore().updateProfile(data).then(() => {
                uptoast(this.$toast).preset('success')
            }).catch((er) => {
                uptoast(this.$toast, 'error', er.response.data.message)
            })
        },
        async onLogout() {
            await useAuthStore().logout()
            this.$router.push({ name: 'login' })
        },
        toggleDrawer() {
            this.drawer_visible = !this.drawer_visible
        },
        sidebarPushTo(to) {
            this.$router.push({ name: to })
            this.toggleDrawer()
        },
        toggelProfileModal() {
            if (this.modal.show) {
                this.modal.show = false
                this.modal.data = {
                    username: '',
                    password: '',
                    password_confirmation: '',
                    old_password: '',
                }
                return
            }
            this.modal.show = true
            this.modal.data.username = this.authStore.getUser.username
        }
    },
}
</script>

<style scoped>
.side-header {
    @apply bg-white px-4 py-5 select-none;
}

.side-panel {
    @apply max-lg:hidden bg-gray-100 border-r-2 w-[300px] overflow-y-scroll;
}

.content {
    @apply flex flex-col w-full max-h-screen overflow-scroll;
}
</style>
