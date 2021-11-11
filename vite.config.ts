import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    sourcemap: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import 'src/components/bosons/colors.scss';
        `
      }
    }
  },
  plugins: [tsconfigPaths({ root: '.' }), vue()]
})
