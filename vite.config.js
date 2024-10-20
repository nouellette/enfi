import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
    root: 'ui',
    plugins: [svelte()],
    build: {
        outDir: '../dist',
        emptyOutDir: true
    },
    server: {
        open: true
    }
})