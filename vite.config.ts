import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    outDir:"build"
  },
  base:"https://gokul1630.github.io/calendar",
  plugins: [react()],
})
