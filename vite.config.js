import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Check if the module is coming from node_modules
          if (id.includes('node_modules')) {
            // Group framer-motion into its own chunk
            if (id.includes('framer-motion')) {
              return 'motion';
            }
            
            // Group React dependencies into the vendor chunk
            if (
              id.includes('react') || 
              id.includes('react-dom') || 
              id.includes('react-router-dom')
            ) {
              return 'vendor';
            }
          }
        }
      }
    },
    minify: 'terser',
    cssMinify: true,
  }
})
