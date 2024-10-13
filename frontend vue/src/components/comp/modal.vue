<template>
    <transition name="modal-fade">
        <div v-if="isOpen" class="modal-overlay" @click="closeModal('backdrop')">
            <div class="modal-container flex flex-col" :class="[{ 'modal-glass': glassMode }, modalClass]" @click.stop>
                <div class="modal-header">
                    <slot name="header">
                        <h2 class="modal-title">{{ title }}</h2>
                        <x-button secondary class="!px-2" v-if="!hideClose" @click="closeModal">
                            <X class="close-icon" />
                        </x-button>
                    </slot>
                </div>
                <div class="modal-content overflow-hidden overflow-y-scroll">
                    <slot>
                        <!-- Default content, override by placing content here -->
                    </slot>
                </div>
                <div class="modal-footer flex gap-1" :class="{ 'flex-row-reverse': alignLeft }">
                    <x-button v-if="!hideCancel" secondary @clicked="closeModal('cancel')"
                        :class="{ 'order-2': swapButtons }">{{ closeLabel }}</x-button>
                    <x-button v-if="!hideConfirm" :useLoading="useLoading" :disabled="disabledConfirm"
                        @clicked="confirmAction">{{ confirmLabel
                        }}</x-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

import { X } from 'lucide-vue-next';

export default {
    name: 'Modal',
    components: {
        X
    },
    props: {
        modalClass: {
            type: String,
            default: ''
        },
        isOpen: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            default: 'Modal Title'
        },
        swapButtons: {
            type: Boolean,
            default: false
        },
        alignLeft: {
            type: Boolean,
            default: false
        },
        hideCancel: {
            type: Boolean,
            default: false
        },
        hideConfirm: {
            type: Boolean,
            default: false
        },
        confirmLabel: {
            type: String,
            default: 'Confirm'
        },
        hideClose: {
            type: Boolean,
            default: false
        },
        closeLabel: {
            type: String,
            default: 'Close'
        },
        persistent: {
            type: Boolean,
            default: false
        },
        disabledConfirm: {
            type: Boolean,
            default: false
        },
        useLoading: {
            type: Boolean,
            default: false
        },
        glassMode: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        closeModal(from) {
            if (this.persistent && from === 'backdrop') {
                return;
            }
            this.$emit('close')
        },
        confirmAction(resolveLoading) {
            if (this.useLoading) {
                this.$emit('confirm', resolveLoading)
            } else {
                this.$emit('confirm')
            }
            this.closeModal()
        }
    }
}
</script>

<style scoped>
.close-icon {
    @apply w-5 h-5 text-gray-500;
}

.modal-overlay {
    @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50;
}

.modal-container {
    @apply bg-white lg:rounded-lg py-5 px-3 shadow-xl lg:max-w-[50vw] lg:max-h-[90vh] max-h-screen transform transition-all duration-300 ease-out;
}

.modal-glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
}

.modal-header {
    @apply flex items-center justify-between p-4 border-b border-gray-300;
}

.modal-title {
    @apply text-xl font-semibold text-gray-800;
}


.modal-content {
    @apply py-3 px-4 text-gray-700;
}

.modal-footer {
    @apply flex justify-end p-4 border-t border-gray-300 space-x-3;
}


.cancel {
    @apply bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500;
}


.modal-fade-enter-active,
.modal-fade-leave-active {
    @apply lg:transition-opacity lg:duration-300 lg:ease-out;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    @apply lg:opacity-0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
    @apply lg:opacity-100;
}

.modal-fade-enter-active .modal-container,
.modal-fade-leave-active .modal-container {
    @apply lg:transition-all lg:duration-300 lg:ease-out;
}

.modal-fade-enter-from .modal-container,
.modal-fade-leave-to .modal-container {
    @apply lg:opacity-0 lg:scale-95;
}

.modal-fade-enter-to .modal-container,
.modal-fade-leave-from .modal-container {
    @apply lg:opacity-100 lg:scale-100;
}
</style>
