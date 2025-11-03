import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'npx nx run @fbanking/web:dev',
        production: 'npx nx run @fbanking/web:preview',
      },
      ciWebServerCommand: 'npx nx run @fbanking/web:preview',
      ciBaseUrl: 'http://localhost:42004200',
    }),
    baseUrl: 'http://localhost:42004200',
  },
});
