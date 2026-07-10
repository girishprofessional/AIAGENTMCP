<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Playwright Test Project Instructions

This is a Playwright test automation project. Use these guidelines when assisting with this project:

### Project Structure
- `tests/e2e/` - Contains end-to-end test files
- `playwright.config.ts` - Playwright configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies and scripts

### Testing Best Practices
- Write tests using Playwright's `test` function from `@playwright/test`
- Use meaningful test descriptions and group related tests with `test.describe()`
- Leverage Playwright locators (getByRole, getByLabel, getByPlaceholder, etc.)
- Implement proper wait strategies using Playwright's built-in waits

### Common Commands
- `npm test` - Run all tests
- `npm run test:headed` - Run tests with visible browser
- `npm run test:ui` - Run tests in UI mode
- `npm run test:debug` - Debug tests

### Configuration
- Base URL can be configured in `playwright.config.ts`
- Browser configurations are defined in the projects array
- Test directory is set to `tests/e2e`
