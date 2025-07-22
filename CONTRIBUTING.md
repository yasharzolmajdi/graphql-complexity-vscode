# Contributing to GraphQL Complexity Analyzer

Thank you for considering contributing to the GraphQL Complexity Analyzer! 🎉

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or pnpm
- VS Code
- Git

### Development Setup

1. **Fork and Clone**

   ```bash
   git clone https://github.com/your-username/graphql-complexity-vscode.git
   cd graphql-complexity-vscode
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Open in VS Code**

   ```bash
   code .
   ```

4. **Start Development**
   - Press `F5` to launch the Extension Development Host
   - Make changes and test them in the development window

## How to Contribute

### 🐛 Reporting Bugs

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce the problem
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: VS Code version, OS, extension version
- **GraphQL Query**: Sample query that causes the issue (if applicable)

### 💡 Suggesting Features

For feature requests:

- **Use Case**: Describe why this feature would be useful
- **Proposed Solution**: How you envision the feature working
- **Alternatives**: Other solutions you've considered
- **Examples**: Screenshots, mockups, or examples if applicable

### 🔧 Code Contributions

#### Before You Start

1. Check existing issues and PRs to avoid duplication
2. For large changes, open an issue first to discuss the approach
3. Follow the existing code style and architecture

#### Making Changes

1. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Follow the Architecture**
   - Keep the modular structure (see `ARCHITECTURE.md`)
   - Use TypeScript with proper types
   - Follow the singleton pattern for shared services
   - Maintain separation of concerns

3. **Code Style**
   - Use meaningful variable and function names
   - Add JSDoc comments for public APIs
   - Keep functions small and focused
   - Use async/await for promises

4. **Testing**
   - Test your changes manually in the Extension Development Host
   - Ensure existing functionality still works
   - Test with various GraphQL queries and schemas

#### Pull Request Process

1. **Update Documentation**
   - Update README.md if you've added features
   - Update CHANGELOG.md with your changes
   - Add JSDoc comments for new public methods

2. **Create Pull Request**
   - Use a clear, descriptive title
   - Fill out the PR template completely
   - Reference any related issues
   - Include screenshots for UI changes

3. **Review Process**
   - Maintainers will review your PR
   - Address any requested changes
   - Keep the PR updated with the main branch

## Code Style Guidelines

### TypeScript

```typescript
// ✅ Good
interface GraphQLComplexityConfig {
  endpoint: string;
  maxThreshold: number;
  scalarCost: number;
}

class ConfigManager {
  private static instance: ConfigManager;

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }
}

// ❌ Avoid
let config = vscode.workspace.getConfiguration('graphqlComplexity');
```

### Error Handling

```typescript
// ✅ Good
try {
  const schema = await this.fetchRemoteSchema();
  return schema;
} catch (error) {
  const errorMessage = `Failed to fetch schema: ${error.message}`;
  vscode.window.showErrorMessage(errorMessage);
  throw new Error(errorMessage);
}

// ❌ Avoid
const schema = await this.fetchRemoteSchema(); // No error handling
```

### Naming Conventions

- **Classes**: PascalCase (`ConfigManager`)
- **Methods/Functions**: camelCase (`getInstance`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_THRESHOLD`)
- **Files**: kebab-case (`complexity-calculator.ts`)

## Project Structure

When adding new features:

- **Configuration**: Add to `src/config/`
- **GraphQL Logic**: Add to `src/schema/`
- **VS Code Integration**: Add to `src/providers/`
- **Error Handling**: Add to `src/diagnostics/`
- **Types**: Add to `src/types/`

## Commit Messages

Use conventional commit format:

```
type(scope): description

feat(complexity): add support for custom scalar costs
fix(schema): handle authentication errors gracefully
docs(readme): update installation instructions
refactor(config): improve configuration validation
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Questions?

- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Issues**: Use GitHub Issues for bugs and feature requests
- 📧 **Email**: yashar.zolmajdi@gmail.com for security issues

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🙏
