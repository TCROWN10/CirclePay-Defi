# Circle Agent

This is the AI-powered DeFi agent for CirclePay, built on the ElizaOS framework.

## Features

- AI-powered DeFi assistance and strategy recommendations
- Natural language processing for DeFi operations
- Integration with CirclePay's yield optimization and cross-chain features
- Comprehensive testing setup with component and e2e tests
- Default character configuration with plugin integration
- Example service, action, and provider implementations
- TypeScript configuration for optimal developer experience
- Built-in documentation and examples

## Getting Started

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the Circle agent server
npm start

# OR start development with hot-reloading (recommended)
npm run dev

# Test the project
npm test
```

## Running the Circle Agent

After building the project, you can start the Circle agent server:

```bash
npm start
```

This will start the server on port 3001. The Circle agent provides:

- **Health Check**: `GET http://localhost:3001/health`
- **Chat API**: `POST http://localhost:3001/api/chat`
- **Agent Info**: `GET http://localhost:3001/api/agent`

### Example Chat Request

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is DeFi?"}'
```

## Development

```bash
# Start development with hot-reloading (recommended)
npm run dev

# OR start without hot-reloading
npm start
# Note: When using 'start', you need to rebuild after changes:
# npm run build

# Test the project
npm test
```

## Testing

ElizaOS provides a comprehensive testing structure for projects:

### Test Structure

- **Component Tests** (`__tests__/` directory):

  - **Unit Tests**: Test individual functions and components in isolation
  - **Integration Tests**: Test how components work together
  - Run with: `npm run test:component`

- **End-to-End Tests** (`e2e/` directory):

  - Test the project within a full ElizaOS runtime
  - Run with: `npm run test:e2e`

- **Running All Tests**:
  - `npm test` runs both component and e2e tests

### Writing Tests

Component tests use Vitest:

```typescript
// Unit test example (__tests__/config.test.ts)
describe('Configuration', () => {
  it('should load configuration correctly', () => {
    expect(config.debug).toBeDefined();
  });
});

// Integration test example (__tests__/integration.test.ts)
describe('Integration: Plugin with Character', () => {
  it('should initialize character with plugins', async () => {
    // Test interactions between components
  });
});
```

E2E tests use ElizaOS test interface:

```typescript
// E2E test example (e2e/project.test.ts)
export class ProjectTestSuite implements TestSuite {
  name = 'project_test_suite';
  tests = [
    {
      name: 'project_initialization',
      fn: async (runtime) => {
        // Test project in a real runtime
      },
    },
  ];
}

export default new ProjectTestSuite();
```

The test utilities in `__tests__/utils/` provide helper functions to simplify writing tests.

## Configuration

Customize your project by modifying:

- `src/index.ts` - Main entry point
- `src/character.ts` - Character definition

## CirclePay Integration

This agent is designed to work seamlessly with the CirclePay dapp, providing:

- AI-powered DeFi strategy recommendations
- Natural language interface for complex DeFi operations
- Integration with CirclePay's yield optimization features
- Cross-chain portfolio management assistance
- Risk assessment and educational content
