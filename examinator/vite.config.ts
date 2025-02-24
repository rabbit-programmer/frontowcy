import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env.API_URL': JSON.stringify(env.API_URL)
        },
        plugins: [react()],
        css: {
            devSourcemap: true
        },
        build: {
            outDir: 'build'
        },
        server: {
            port: 3000
        },
    }
})
