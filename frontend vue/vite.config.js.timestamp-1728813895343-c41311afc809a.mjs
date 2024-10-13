// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/Erik/Downloads/sertifikasi/main/fullstack-2/vue-template-pinia/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Erik/Downloads/sertifikasi/main/fullstack-2/vue-template-pinia/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Components from "file:///C:/Users/Erik/Downloads/sertifikasi/main/fullstack-2/vue-template-pinia/node_modules/unplugin-vue-components/dist/vite.js";
import AutoImport from "file:///C:/Users/Erik/Downloads/sertifikasi/main/fullstack-2/vue-template-pinia/node_modules/unplugin-auto-import/dist/vite.js";
import { PrimeVueResolver } from "file:///C:/Users/Erik/Downloads/sertifikasi/main/fullstack-2/vue-template-pinia/node_modules/@primevue/auto-import-resolver/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Erik/Downloads/sertifikasi/main/fullstack-2/vue-template-pinia/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    Components({
      include: [/\.vue$/, /\.vue\?vue/],
      dirs: ["./src/components"],
      resolvers: [PrimeVueResolver()],
      directoryAsNamespace: true
    }),
    AutoImport({
      include: [
        /\.vue$/,
        /\.vue\?vue/,
        // .vue
        /\.js$/
      ],
      imports: [
        "vue",
        "vue-router",
        "pinia",
        {
          "axios": [["default", "axios"]],
          "@/modules/core": ["uptoast", "mstr", "upconfirm", "coreTesting"],
          "@/configs/appdata": [["default", "appdata"]],
          "@/stores/testing": ["useTestingStore"],
          "@/stores/auth": ["useAuthStore"],
          "@vueuse/core": [""],
          "@vuelidate/core": [["default", "useVuelidate"]],
          "@vuelidate/validators": ["email", "required", "sameAs", "minLength", "maxLength", "numeric", "minValue", "maxValue", "between", "requiredIf"]
        }
      ]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxFcmlrXFxcXERvd25sb2Fkc1xcXFxzZXJ0aWZpa2FzaVxcXFxtYWluXFxcXGZ1bGxzdGFjay0yXFxcXHZ1ZS10ZW1wbGF0ZS1waW5pYVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcRXJpa1xcXFxEb3dubG9hZHNcXFxcc2VydGlmaWthc2lcXFxcbWFpblxcXFxmdWxsc3RhY2stMlxcXFx2dWUtdGVtcGxhdGUtcGluaWFcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0VyaWsvRG93bmxvYWRzL3NlcnRpZmlrYXNpL21haW4vZnVsbHN0YWNrLTIvdnVlLXRlbXBsYXRlLXBpbmlhL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5cclxuLy8gYXV0b2ltcG9ydHNcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuXHJcbi8vIHByaW1ldnVlXHJcbmltcG9ydCB7IFByaW1lVnVlUmVzb2x2ZXIgfSBmcm9tICdAcHJpbWV2dWUvYXV0by1pbXBvcnQtcmVzb2x2ZXInXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHZ1ZSgpLFxyXG4gICAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlL10sXHJcbiAgICAgICAgICAgIGRpcnM6IFsnLi9zcmMvY29tcG9uZW50cyddLFxyXG4gICAgICAgICAgICByZXNvbHZlcnM6IFtQcmltZVZ1ZVJlc29sdmVyKCldLFxyXG4gICAgICAgICAgICBkaXJlY3RvcnlBc05hbWVzcGFjZTogdHJ1ZSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAgICAgICAgL1xcLnZ1ZSQvLFxyXG4gICAgICAgICAgICAgICAgL1xcLnZ1ZVxcP3Z1ZS8sIC8vIC52dWVcclxuICAgICAgICAgICAgICAgIC9cXC5qcyQvLFxyXG4gICAgICAgICAgICBdLFxyXG5cclxuICAgICAgICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgICAgICAgICAndnVlLXJvdXRlcicsXHJcbiAgICAgICAgICAgICAgICAncGluaWEnLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICdheGlvcyc6IFtbJ2RlZmF1bHQnLCAnYXhpb3MnXV0sXHJcbiAgICAgICAgICAgICAgICAgICAgJ0AvbW9kdWxlcy9jb3JlJzogWyd1cHRvYXN0JywgJ21zdHInLCAndXBjb25maXJtJywgJ2NvcmVUZXN0aW5nJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgJ0AvY29uZmlncy9hcHBkYXRhJzogW1snZGVmYXVsdCcsICdhcHBkYXRhJ11dLFxyXG4gICAgICAgICAgICAgICAgICAgICdAL3N0b3Jlcy90ZXN0aW5nJzogWyd1c2VUZXN0aW5nU3RvcmUnXSxcclxuICAgICAgICAgICAgICAgICAgICAnQC9zdG9yZXMvYXV0aCc6IFsndXNlQXV0aFN0b3JlJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgJ0B2dWV1c2UvY29yZSc6IFsnJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgJ0B2dWVsaWRhdGUvY29yZSc6IFtbJ2RlZmF1bHQnLCAndXNlVnVlbGlkYXRlJ11dLFxyXG4gICAgICAgICAgICAgICAgICAgICdAdnVlbGlkYXRlL3ZhbGlkYXRvcnMnOiBbJ2VtYWlsJywgJ3JlcXVpcmVkJywgJ3NhbWVBcycsICdtaW5MZW5ndGgnLCAnbWF4TGVuZ3RoJywgJ251bWVyaWMnLCAnbWluVmFsdWUnLCAnbWF4VmFsdWUnLCAnYmV0d2VlbicsICdyZXF1aXJlZElmJ10sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgICBhbGlhczoge1xyXG4gICAgICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1WixTQUFTLGVBQWUsV0FBVztBQUMxYixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFHaEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFHdkIsU0FBUyx3QkFBd0I7QUFUb08sSUFBTSwyQ0FBMkM7QUFZdFQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1AsU0FBUyxDQUFDLFVBQVUsWUFBWTtBQUFBLE1BQ2hDLE1BQU0sQ0FBQyxrQkFBa0I7QUFBQSxNQUN6QixXQUFXLENBQUMsaUJBQWlCLENBQUM7QUFBQSxNQUM5QixzQkFBc0I7QUFBQSxJQUMxQixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDUCxTQUFTO0FBQUEsUUFDTDtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQSxNQUNKO0FBQUEsTUFFQSxTQUFTO0FBQUEsUUFDTDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFVBQ0ksU0FBUyxDQUFDLENBQUMsV0FBVyxPQUFPLENBQUM7QUFBQSxVQUM5QixrQkFBa0IsQ0FBQyxXQUFXLFFBQVEsYUFBYSxhQUFhO0FBQUEsVUFDaEUscUJBQXFCLENBQUMsQ0FBQyxXQUFXLFNBQVMsQ0FBQztBQUFBLFVBQzVDLG9CQUFvQixDQUFDLGlCQUFpQjtBQUFBLFVBQ3RDLGlCQUFpQixDQUFDLGNBQWM7QUFBQSxVQUNoQyxnQkFBZ0IsQ0FBQyxFQUFFO0FBQUEsVUFDbkIsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLGNBQWMsQ0FBQztBQUFBLFVBQy9DLHlCQUF5QixDQUFDLFNBQVMsWUFBWSxVQUFVLGFBQWEsYUFBYSxXQUFXLFlBQVksWUFBWSxXQUFXLFlBQVk7QUFBQSxRQUNqSjtBQUFBLE1BQ0o7QUFBQSxJQUNKLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3hEO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
