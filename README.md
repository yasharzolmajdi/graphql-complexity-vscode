# GraphQL Complexity Analyzer for VS Code

[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue)](https://marketplace.visualstudio.com/items?itemName=yashar-zolmajdi.graphql-complexity-vscode)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A powerful VS Code extension that analyzes GraphQL query complexity in real-time, helping developers write efficient queries and prevent expensive operations from reaching production.

![GraphQL Complexity Demo](https://via.placeholder.com/800x400/2d3748/ffffff?text=GraphQL+Complexity+Demo)

## ✨ Features

- **🔍 Real-time Complexity Analysis**: See complexity scores as you type GraphQL queries
- **⚠️ Intelligent Warnings**: Get notified when queries exceed complexity thresholds
- **📊 Code Lens Integration**: Complexity scores displayed directly in the editor
- **🎯 Configurable Thresholds**: Customize complexity limits for your specific needs
- **🚀 Schema Auto-loading**: Automatically fetches and caches your GraphQL schema
- **🔧 Zero Configuration**: Works out of the box with sensible defaults
- **🏗️ Clean Architecture**: Modular codebase with separation of concerns
- **🔒 Type Safety**: Built with TypeScript for reliability and maintainability
- **⚡ Performance Optimized**: Efficient caching and minimal resource usage
- **🛠️ Developer Friendly**: Comprehensive error handling and debugging support

## 🚀 Quick Start

1. **Install the Extension**

   ```bash
   # From VS Code Marketplace
   code --install-extension yashar-zolmajdi.graphql-complexity-vscode
   ```

2. **Open a GraphQL File**
   - Create or open any `.graphql` file
   - The extension activates automatically

3. **Configure Your GraphQL Endpoint** (Optional)

   ```json
   {
     "graphqlComplexity.endpoint": "https://api.example.com/graphql",
     "graphqlComplexity.maxThreshold": 1000,
     "graphqlComplexity.scalarCost": 1
   }
   ```

4. **Start Writing Queries**
   - Complexity scores appear above your queries
   - Warnings show when thresholds are exceeded

## 📋 Requirements

- **VS Code**: Version 1.80.0 or higher
- **GraphQL Endpoint**: A running GraphQL server with introspection enabled
- **Network Access**: To fetch schema introspection (can be configured for local development)

## ⚙️ Configuration

Configure the extension through VS Code settings:

### Basic Settings

| Setting                          | Default                         | Description                                   |
| -------------------------------- | ------------------------------- | --------------------------------------------- |
| `graphqlComplexity.endpoint`     | `http://localhost:4000/graphql` | GraphQL endpoint URL for schema introspection |
| `graphqlComplexity.maxThreshold` | `1000`                          | Maximum allowed complexity score              |
| `graphqlComplexity.scalarCost`   | `1`                             | Cost assigned to scalar fields                |

### Example Configuration

```json
{
  "graphqlComplexity.endpoint": "https://api.github.com/graphql",
  "graphqlComplexity.maxThreshold": 500,
  "graphqlComplexity.scalarCost": 2
}
```

## 🎯 How It Works

The extension calculates query complexity using a depth-first approach:

1. **Schema Introspection**: Fetches your GraphQL schema automatically
2. **AST Analysis**: Parses queries into Abstract Syntax Trees
3. **Complexity Calculation**: Assigns costs based on field depth and types
4. **Real-time Feedback**: Updates complexity scores as you type

### Complexity Calculation Example

```graphql
query GetUser {
  user(id: "123") {
    # Cost: 1
    name # Cost: 1
    posts {
      # Cost: 1 * number of posts
      title # Cost: 1 per post
      comments {
        # Cost: 1 * posts * comments
        content # Cost: 1 per comment
      }
    }
  }
}
# Total complexity varies based on data size
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- VS Code

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yasharzolmajdi/graphql-complexity-vscode.git
   cd graphql-complexity-vscode
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Build the Extension**

   ```bash
   pnpm build
   # or
   npm run build
   ```

4. **Run in Development Mode**
   - Press `F5` in VS Code to open a new Extension Development Host window
   - Or use the "Run Extension" launch configuration

### Project Structure

```
src/
├── extension.ts                 # Main extension entry point
├── config/                      # Configuration management
│   ├── index.ts
│   └── manager.ts
├── schema/                      # GraphQL schema handling
│   ├── index.ts
│   ├── loader.ts
│   └── complexity-calculator.ts
├── diagnostics/                 # VS Code diagnostics
│   ├── index.ts
│   └── manager.ts
├── providers/                   # VS Code providers
│   ├── index.ts
│   ├── code-lens.ts
│   └── document-manager.ts
└── types/                       # Type definitions
    ├── index.ts
    └── config.ts
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

### Available Scripts

```bash
# Build the extension
pnpm build

# Watch for changes during development
pnpm watch

# Lint the code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format the code
pnpm format

# Check formatting
pnpm format:check

# Run all checks (lint + format + build)
pnpm check

# Package for distribution
vsce package
```

### Code Quality

This project uses modern development tools:

- **TypeScript 5.8+**: Strong typing and latest language features
- **ESLint 9+**: Modern flat config with TypeScript rules
- **Prettier 3+**: Consistent code formatting
- **esbuild**: Fast TypeScript compilation and bundling
- **Husky**: Git hooks for code quality
- **lint-staged**: Pre-commit linting and formatting
- **VS Code**: Built-in debugging and testing support

### Testing

Testing framework setup is planned for future releases. The extension currently uses:

- Manual testing in Extension Development Host
- Real GraphQL endpoints for integration testing
- TypeScript compiler for static analysis

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Ways to Contribute

- 🐛 **Report Bugs**: Open an issue with reproduction steps
- 💡 **Suggest Features**: Share your ideas for improvements
- 📝 **Improve Documentation**: Help make our docs clearer
- 🔧 **Submit Code**: Fix bugs or implement new features
- 🧪 **Write Tests**: Help us maintain code quality

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to your branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

### Latest Version (0.0.1) - July 2025

- ✨ Initial release with modern ES modules architecture
- 🔍 Real-time complexity analysis using graphql-validation-complexity
- ⚠️ Configurable warning thresholds (default: 10)
- 📊 Code lens integration for inline complexity display
- 🎯 Schema auto-loading with introspection caching
- 🛠️ Modern TypeScript 5.8+ with ESLint flat config
- ⚡ Fast esbuild compilation and bundling

## 🐛 Known Issues

- **Schema Caching**: Schema is cached until VS Code restart (manual refresh command planned)
- **Large Schemas**: Performance may be impacted with very large schemas (optimization planned)
- **Authentication**: Currently no support for authenticated endpoints (headers support planned)
- **Custom Directives**: Limited support for custom GraphQL directives
- **Error Recovery**: Schema errors may require extension reload

See our [Issues](https://github.com/yasharzolmajdi/graphql-complexity-vscode/issues) page for the latest status and planned improvements.

## 📚 Related Projects

- [graphql-validation-complexity](https://github.com/4Catalyzer/graphql-validation-complexity) - Core complexity analysis library
- [GraphQL Request](https://github.com/jasonkuhrt/graphql-request) - GraphQL client library
- [VS Code GraphQL](https://github.com/graphql/vscode-graphql) - GraphQL language support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GraphQL Foundation](https://graphql.org/) for the amazing GraphQL ecosystem
- [VS Code Team](https://code.visualstudio.com/) for the excellent extension API
- [graphql-validation-complexity](https://github.com/4Catalyzer/graphql-validation-complexity) for the complexity calculation engine

---

**Made with ❤️ by [Yashar Zolmajdi](https://github.com/yasharzolmajdi)**

If you find this extension helpful, please consider:

- ⭐ Starring the repository
- 📝 Leaving a review on the VS Code Marketplace
- 🐛 Reporting issues or suggesting improvements
- 🤝 Contributing to the project

---

_Have questions or need help? [Open an issue](https://github.com/yasharzolmajdi/graphql-complexity-vscode/issues) or reach out on [Twitter](https://twitter.com/yasharzolmajdi)._
