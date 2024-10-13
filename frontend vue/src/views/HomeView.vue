<!-- dont put @blur on every input find another way -->

<template>
    <Message v-if="$route.query.welcome" v-motion-fade icon="pi pi-info-circle" severity="info" :life="5000">
        Selamat datang, {{ authStore.USER.username }}!
    </Message>
</template>

<style scoped></style>

<script>

export default {
    data() {
        return {
            appdata,
            authStore: useAuthStore()
        }
    },
}

</script>
