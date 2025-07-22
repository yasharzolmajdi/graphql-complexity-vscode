import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',

      // General JavaScript/TypeScript rules
      'no-console': 'off', // VS Code extensions often use console for debugging
      'no-debugger': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',

      // Code style
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'curly': ['error', 'all'],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'comma-dangle': ['error', 'always-multiline'],

      // Best practices for VS Code extensions
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      // TypeScript files can be more strict
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
    },
  },
  {
    files: ['src/extension.ts'],
    rules: {
      // Main extension file might need looser rules
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  {
    ignores: [
      // Compiled output
      'dist/**',
      'out/**',
      '*.js',
      '*.js.map',
      '*.d.ts',
      
      // Dependencies
      'node_modules/**',
      '.pnpm-store/**',
      
      // VS Code test directories
      '.vscode-test/**',
      '.vscode-test-web/**',
      
      // Test files
      '**/*.test.ts',
      '**/*.spec.ts',
      'test/**',
      'tests/**',
      
      // Build and cache artifacts
      '*.tsbuildinfo',
      'coverage/**',
      'test-results/**',
      'playwright-report/**',
      '.cache/**',
      '.parcel-cache/**',
      
      // Configuration files that don't need linting
      '*.config.js',
      '*.config.ts',
      
      // OS and editor files
      '.DS_Store',
      'Thumbs.db',
      '.vscode/**',
      
      // Documentation that might have code blocks
      'CHANGELOG.md',
    ],
  }
);
