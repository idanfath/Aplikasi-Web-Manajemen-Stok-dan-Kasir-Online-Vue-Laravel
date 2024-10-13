<template>
    <ConfirmPopup class="max-lg:hidden" group="popup" />
    <ConfirmDialog class="lg:hidden" group="dialog" />
    <Toast />
    <RouterView />

</template>

<script>
// import Editor from 'primevue/editor';
// // patch for quill editor to fix rendering issue
// Editor.methods.renderValue = function renderValue(value) {
//     if (this.quill) {
//         if (value) {
//             const delta = this.quill.clipboard.convert({ html: value });
//             this.quill.setContents(delta, 'silent');
//         } else {
//             this.quill.setText('');
//         }
//     }
// };

export default {
    name: 'App',
    methods: {

    },
};

</script>

<style scoped></style>
