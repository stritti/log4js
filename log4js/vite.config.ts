import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      include: ['src/main/ts/**/*'],
      outDir: 'dist/types'
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main/ts/index.ts'),
      name: 'Log4js',
      formats: ['es', 'umd', 'iife'],
      fileName: (format) => {
        if (format === 'es') return 'log4js.js'
        if (format === 'umd') return 'log4js.umd.js'
        return 'log4js.iife.js'
      }
    },
    rollupOptions: {
      output: {
        exports: 'named',
        assetFileNames: 'assets/[name][extname]',
        globals: {}
      }
    },
    sourcemap: true,
    target: 'es2022',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false
      }
    }
  }
})
