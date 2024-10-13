import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// autoimports
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// primevue
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            include: [/\.vue$/, /\.vue\?vue/],
            dirs: ['./src/components'],
            resolvers: [PrimeVueResolver()],
            directoryAsNamespace: true,
        }),
        AutoImport({
            include: [
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.js$/,
            ],

            imports: [
                'vue',
                'vue-router',
                'pinia',
                {
                    'axios': [['default', 'axios']],
                    '@/modules/core': ['uptoast', 'mstr', 'upconfirm', 'coreTesting'],
                    '@/configs/appdata': [['default', 'appdata']],
                    '@/stores/testing': ['useTestingStore'],
                    '@/stores/auth': ['useAuthStore'],
                    '@vueuse/core': [''],
                    '@vuelidate/core': [['default', 'useVuelidate']],
                    '@vuelidate/validators': ['email', 'required', 'sameAs', 'minLength', 'maxLength', 'numeric', 'minValue', 'maxValue', 'between', 'requiredIf'],
                }
            ]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
