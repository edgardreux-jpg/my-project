import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Mode "single" : un seul fichier HTML autonome (aperçu, partage rapide).
// Par défaut : build classique pour un hébergement statique.
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: { chunkSizeWarningLimit: 2000 },
}))
