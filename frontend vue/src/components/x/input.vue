<script setup>
/**
 * use this to define the model
 * only when using one model
 */
const model = defineModel()

/**
 * use this to define the model
 * only when using multiple models
 *
 * const firstName = defineModel('firstName')
 * const lastName = defineModel('lastName')
 */


/**
 * use this to define the props, as using options API somehow not working
 */
const props = defineProps(
    {
        disablePasswordToggle: {
            type: Boolean,
            default: false
        }
    }
)
</script>

<template>
    <div class="input-container">
        <input v-model="model" ref="inputEl" class="custom-input" v-bind="$attrs" />
        <x-button v-if="inputType === 'password' && !props.disablePasswordToggle"
            :class="passworded ? 'passworded' : ''" @clicked="onTogglePasswordClicked($event)"
            class="toggle-button my-bezier" type="button" tabindex="-1">
            <component :is="passworded ? 'EyeOff' : 'Eye'" />
        </x-button>
    </div>
</template>

<script>
import { Eye, EyeOff } from 'lucide-vue-next';

export default {
    name: 'x-input',
    components: {
        Eye,
        EyeOff
    },
    data() {
        return {
            passworded: false
        }
    },
    computed: {
        inputType() {
            return this.$attrs.type;
        }
    },
    methods: {
        onTogglePasswordClicked(event) {
            this.$refs.inputEl.focus();
            this.$refs.inputEl.type = this.$refs.inputEl.type === 'password' ? 'text' : 'password';
            this.passworded = !this.passworded;
        }
    },
}
</script>

<style scoped>
.input-container {
    @apply bg-white w-full flex items-center border rounded-md border-gray-300 transition-colors duration-300 ease-in-out;
}

.input-container:focus-within {
    @apply border-neutral-700;
}

.custom-input {
    @apply flex-1 text-base bg-transparent outline-none py-2 px-3;
}

.toggle-button {
    @apply text-xs py-1 px-0 w-[50px] mr-1 flex justify-center rounded-sm bg-transparent text-neutral-600 font-medium tracking-tight hover:bg-transparent;
    transition: font-weight 0s, background-color 0.3s;
}
</style>
