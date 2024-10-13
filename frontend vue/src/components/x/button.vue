<!--

make sure to have (resolvedLoading)

-->
<template>
    <button @click="handleClick" :disabled="isLoading" class="button"
        :class="secondary ? 'button-secondary' : 'button-primary'">
        <span :class="{ 'opacity-0': isLoading }" class="button-label">
            <slot>Label</slot>
        </span>
        <span v-if="isLoading" class="button-spinner">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
        </span>
    </button>
</template>

<script>
export default {
    props: {
        useLoading: {
            type: Boolean,
            default: false
        },
        useSubmit: {
            type: Boolean,
            default: false
        },
        secondary: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isLoading: false
        }
    },
    methods: {
        async handleClick() {
            if (this.useSubmit && !this.useLoading) {
                this.$emit('submit');
                return;
            }

            if (!this.useLoading) {
                this.$emit('clicked');
                return;
            }

            this.isLoading = true;
            const resolveLoading = () => {
                this.isLoading = false;
            };

            if (this.useSubmit) {
                console.log('submitting');
                await this.$emit('submit', resolveLoading);
                return;
            }

            this.$emit('clicked', resolveLoading);
        }
    }
}
</script>

<style scoped>
.button {
    @apply relative overflow-hidden px-5 py-1.5 rounded-md transition-all duration-300 ease-in-out transform;
}

.button:disabled {
    @apply cursor-not-allowed;
}

.button-label {
    @apply relative z-10 transition-opacity duration-300;
}

.button-spinner {
    @apply absolute inset-0 flex items-center justify-center;
}

.button-primary {
    @apply bg-neutral-900 text-white hover:bg-neutral-700 disabled:bg-neutral-800 disabled:text-neutral-500;
}

.button-secondary {
    @apply bg-white text-neutral-900 hover:bg-neutral-300 disabled:bg-white disabled:text-neutral-500;
}
</style>
