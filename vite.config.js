import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
export default {
    optimizeDeps: {
        include: [ './node_modules/@synapse/utils' ],
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        hmr: {
            host: '192.168.1.3',
            port: 5173
        }
    },
    build: {
        copyPublicDir: true,
        // modulePreload: true,
        target: 'es2015',
        rollupOptions: {
            input: {
                main: resolve( __dirname, 'src/index.ts' ),
            },
            output: {
                compact: false,
                minifyInternalExports: false,
                entryFileNames: 'assets/[name].js', // This sets the output file name pattern without hash
                chunkFileNames: 'assets/[name].js', // For chunk files without hash
                assetFileNames: 'assets/[name][extname]' // For asset files without hash
            }
        },
    },
};