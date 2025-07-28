import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig(({ command }) => {
  const isSSRBuild = command === 'build' && process.argv.includes('--ssr');

  return {
    plugins: [
      react(),
      federation({
        name: 'shell',
        filename: 'remoteEntry.js',
        remotes: {
          dashboard: 'http://localhost:5003/assets/remoteEntry.js',
          profile: 'http://localhost:5001/assets/remoteEntry.js',
        },
        exposes: {
          './store': './src/client/store/index.js',
        },
        shared: isSSRBuild ? [] : ['react'],
      }),
    ],
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
      ssr: isSSRBuild ? true : undefined,
      outDir: isSSRBuild ? 'dist/server' : 'dist',
      rollupOptions: {
        input: isSSRBuild ? {
          'entry-server': 'src/ssr/entry-server.jsx',
          'ServerPage': 'src/server/pages/ServerPage.jsx',
        } : undefined,
        output: {
          format: isSSRBuild ? 'esm' : undefined,
          entryFileNames: isSSRBuild ? `[name].js` : undefined,
        },
        external: isSSRBuild ? ['react-dom/server', 'react-router-dom'] : [],
      },
    },
    ssr: {
      noExternal: [],
    },
    resolve: {
      alias: {
        'react-router-dom/server': 'react-router-dom',
      },
    },
    server: {
      port: 5000,
      host: true,
    },
  };
});
