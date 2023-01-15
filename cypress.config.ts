import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:8080",
    supportFolder: "src/main/test/cypress/support",
    supportFile: "src/main/test/cypress/support/e2e.ts",
    specPattern: "src/main/test/cypress/integration/**/*.cy.{js,jsx,ts,tsx}",
    experimentalRunAllSpecs: true
  },
  fixturesFolder: "src/main/test/cypress/fixtures",
  screenshotsFolder: "src/main/test/cypress/screenshots",
  videosFolder: "src/main/test/cypress/videos"
});
