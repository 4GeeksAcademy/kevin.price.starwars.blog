import {
    defineConfig
} from 'vite'
 plugins: [react()],
    server: {
        port: 3000
    }
    
    build: {
        outDir: 'dist'
    }