## [1.0.0] - 2025-07-22

### Changes
- refactor: Refactor release workflow: update CHANGELOG dynamically and remove obsolete release.yml

## [0.1.1] - 2025-07-22

### Added
- New features and improvements

### Changed
- Updates and modifications

### Fixed
- Bug fixes and patches

## [0.1.0] - 2025-07-22

### Added
- New features and improvements

### Changed
- Updates and modifications

### Fixed
- Bug fixes and patches

# Changelog

All notable changes to the GraphQL Complexity Analyzer extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- Authentication support for GraphQL endpoints
- Performance improvements for large schemas
- Test coverage and automated testing
- Schema caching improvements
- Custom complexity calculation rules

## [0.0.1] - 2025-07-17

### Added

- 🎉 Initial release of GraphQL Complexity Analyzer
- 🔍 Real-time GraphQL query complexity analysis
- 📊 Code lens integration showing complexity scores
- ⚠️ Diagnostic warnings when complexity exceeds thresholds
- 🎯 Configurable complexity thresholds and scalar costs
- 🚀 Automatic GraphQL schema loading and caching
- 🏗️ Clean modular architecture with separation of concerns
- 📝 Comprehensive documentation and contribution guidelines

### Technical Details

- Built with TypeScript for type safety
- Modular architecture with singleton patterns
- VS Code CodeLens provider for real-time feedback
- GraphQL schema introspection and caching
- Complexity calculation using graphql-validation-complexity
- Error handling and user-friendly diagnostics

### Configuration Options

- `graphqlComplexity.endpoint` - GraphQL endpoint URL
- `graphqlComplexity.maxThreshold` - Maximum complexity threshold
- `graphqlComplexity.scalarCost` - Cost for scalar fields

[Unreleased]: https://github.com/yasharzolmajdi/graphql-complexity-vscode/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/yasharzolmajdi/graphql-complexity-vscode/releases/tag/v0.0.1
