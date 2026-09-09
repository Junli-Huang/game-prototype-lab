import { defineConfig } from 'vite';

export default defineConfig({
  // Relative assets work both at / and at /game-prototype-lab/.
  base: './',
  appType: 'mpa',
  build: {
    rollupOptions: {
      // Add each prototype HTML entry here manually; no automatic discovery.
      input: ['index.html'],
    },
  },
});
