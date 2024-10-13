<template>
    <div class="page center">
        <form @submit.prevent class="card w-[400px] space-y-3">
            <p class="text-2xl font-bold text-center my-5">Welcome Back</p>
            <p class="input-label">Username</p>
            <x-input v-model="form.username" placeholder="Username" />
            <p class="input-label">Password</p>
            <x-input type="password" v-model="form.password" placeholder="Password" />
            <x-button useLoading @clicked="onSubmit" class="w-full ">Masuk</x-button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            v$: useVuelidate()
        }
    },
    methods: {
        onSubmit(resolveLoading) {
            useAuthStore().login(this.form).then((res) => {
                uptoast(this.$toast).preset('success')
                if (this.$route.query.redirect) {
                    this.$router.replace(this.$route.query.redirect)
                    return
                }
                this.$router.replace({ name: 'home', query: { welcome: true } })
            }).catch((er) => {
                uptoast(this.$toast).preset('error')
            }).finally(() => {
                resolveLoading()
            })
        }
    },
    validations() {
        return {
            form: {
                username: { required, minLength: minLength(3) },
                password: { required, minLength: minLength(8) },
            }
        }
    },
    mounted() {
        this.v$.$touch()
    },
}
</script>
