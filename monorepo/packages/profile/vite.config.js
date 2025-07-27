import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(),
  federation({
    name: 'profile',
    filename: 'remoteEntry.js',
    exposes: {
      './ProfileApp': './src/main.jsx'
    },
    remotes: {
      shell: 'http://localhost:5000/assets/remoteEntry.js',
    },
    shared: ['react', 'react-dom', 'react-router-dom', 'zustand', 'antd']
  })
  ],
  server: {
    port: 5001,
    host: true
  }
})