import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig(({ command }) => {
  // eslint-disable-next-line no-undef
  const isSSRBuild = command === 'build' && process.argv.includes('--ssr'); // Check for --ssr flag

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
          './store': './src/store/index.js',
        },
        shared: isSSRBuild ? [] : ['react'], // Conditional sharing based on --ssr flag
      }),
    ],
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
      ssr: isSSRBuild ? 'src/entry-server.jsx' : undefined, // Specify entry for SSR build
      outDir: isSSRBuild ? 'dist/server' : 'dist',
      rollupOptions: {
        output: {
          format: isSSRBuild ? 'esm' : undefined, // Output format for SSR build
        },
        external: isSSRBuild ? ['react-dom/server'] : [], // Mark react-dom/server as external for SSR
      },
    },
    ssr: {
      noExternal: ['react-router-dom'], // Ensure react-router-dom/server is bundled
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