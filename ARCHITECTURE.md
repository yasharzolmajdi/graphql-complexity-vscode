# GraphQL Complexity VS Code Extension - Code Structure

This extension has been refactored into a clean, modular architecture with the following structure:

## Project Structure

```
src/
├── extension.ts                 # Main extension entry point
├── config/                      # Configuration management
│   ├── index.ts                # Exports
│   └── manager.ts              # Configuration manager singleton
├── schema/                      # GraphQL schema and complexity handling
│   ├── index.ts                # Exports
│   ├── loader.ts               # Schema loading and caching
│   └── complexity-calculator.ts # Complexity calculation logic
├── diagnostics/                 # VS Code diagnostics management
│   ├── index.ts                # Exports
│   └── manager.ts              # Diagnostics manager singleton
├── providers/                   # VS Code providers and document management
│   ├── index.ts                # Exports
│   ├── code-lens.ts            # Code lens provider
│   └── document-manager.ts     # Document change handling
└── types/                       # Type definitions
    ├── index.ts                # Exports
    └── config.ts               # Configuration types

# Configuration Files
├── .gitignore                  # Git ignore patterns
├── .vscodeignore              # VS Code packaging ignore patterns
├── .eslintignore              # ESLint ignore patterns
├── .prettierignore            # Prettier ignore patterns
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── pnpm-lock.yaml            # Package manager lock file

# Documentation
├── README.md                  # Main project documentation
├── ARCHITECTURE.md            # Architecture and design decisions
├── CONTRIBUTING.md            # Contribution guidelines
├── CHANGELOG.md              # Version history
└── LICENSE                   # MIT license
```

## Architecture Overview

### Single Responsibility Principle

Each module has a clear, single responsibility:

- **ConfigManager**: Manages VS Code configuration settings
- **SchemaLoader**: Handles GraphQL schema loading and caching
- **ComplexityCalculator**: Calculates GraphQL query complexity
- **DiagnosticsManager**: Manages VS Code diagnostics (error/warning messages)
- **GraphQLComplexityLensProvider**: Provides code lens functionality
- **DocumentManager**: Handles document change events and updates

### Singleton Pattern

Key services use the singleton pattern to ensure single instances:

- `ConfigManager`
- `SchemaLoader`
- `DiagnosticsManager`

### Clean Dependencies

- Each module imports only what it needs
- Clear separation of concerns
- Easy to test individual components
- Index files provide clean public APIs

### Benefits of This Structure

1. **Maintability**: Easy to locate and modify specific functionality
2. **Testability**: Each module can be tested in isolation
3. **Reusability**: Modules can be reused across different parts of the extension
4. **Scalability**: Easy to add new features without affecting existing code
5. **Debugging**: Issues can be quickly traced to specific modules

## Development Tools & Code Quality

### TypeScript Configuration

- Strict type checking enabled
- Modern ES2020 target for VS Code compatibility
- Path mapping for clean imports
- Declaration files generated for better IntelliSense

### Code Quality Tools

- **ESLint**: Linting with TypeScript-specific rules
- **Prettier**: Consistent code formatting
- **Git Hooks**: Pre-commit validation (planned)
- **VS Code**: Built-in debugging and testing support

### Ignore Files

- `.gitignore`: Version control exclusions
- `.vscodeignore`: Extension packaging exclusions
- `.eslintignore`: Linting exclusions
- `.prettierignore`: Formatting exclusions

### Build Process

1. TypeScript compilation (`tsc`)
2. Code validation (ESLint)
3. Format checking (Prettier)
4. Extension packaging (`vsce package`)

## Usage

The main `extension.ts` file orchestrates all the modules:

```typescript
import { GraphQLComplexityLensProvider, DocumentManager } from './providers';
import { DiagnosticsManager } from './diagnostics';

export function activate(context: vscode.ExtensionContext) {
  const diagnosticsManager = DiagnosticsManager.getInstance();
  const documentManager = new DocumentManager();
  const codeLensProvider = new GraphQLComplexityLensProvider();
  // ... rest of activation logic
}
```

Each service is responsible for its own lifecycle and dependencies.
