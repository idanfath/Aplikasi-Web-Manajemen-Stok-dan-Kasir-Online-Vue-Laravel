/* eslint-env node */
module.exports = {
    root: true,
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        'vue/multi-word-component-names': 'off',
        // disable not defined error
        // 'no-undef': 'off',
        // disable unused vars error
        'no-unused-vars': 'off',
        // undefined error
        'no-undef': 'off',
    }
}
