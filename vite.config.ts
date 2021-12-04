import { defineConfig } from 'vite'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: { sourcemap: true },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import 'src/components/bosons/colors.scss';
        `
      }
    }
  },
  plugins: [tsconfigPaths({ root: '.' }), vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
