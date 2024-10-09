import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
export default {
    optimizeDeps: {
        include: [ './node_modules/@synapse/utils' ],
    },
    build: {
        commonjsOptions: {
            include: [ './node_modules/@synapse/utils' ]
        }
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        hmr: {
            host: '192.168.1.3',
            port: 5173
        }
    },
};