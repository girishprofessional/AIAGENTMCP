# AIAgentMCP - Playwright Project

A Playwright test automation project for end-to-end testing.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

Install project dependencies:

```bash
npm install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests with UI mode
```bash
npm run test:ui
```

### Generate test code
```bash
npm run codegen
```

## Project Structure

- `tests/e2e/` - End-to-end test files
- `playwright.config.ts` - Playwright configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies and scripts

## Test Reports

After running tests, an HTML report is generated in the `playwright-report/` directory. Open it with:

```bash
npx playwright show-report
```

## Configuration

Edit `playwright.config.ts` to customize:
- Test directory
- Browser configurations
- Base URL
- Timeouts
- Retries

## Documentation

For more information, visit [Playwright Documentation](https://playwright.dev)
