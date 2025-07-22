import {
  parse,
  validate,
  DocumentNode,
  GraphQLSchema,
  visit,
  FragmentDefinitionNode,
} from 'graphql';
import { createComplexityLimitRule } from 'graphql-validation-complexity';
import { ConfigManager } from '../config/manager';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export interface ComplexityResult {
  totalCost: number;
  isValid: boolean;
  errors?: string[];
}

export class ComplexityCalculator {
  private configManager: ConfigManager;

  constructor() {
    this.configManager = ConfigManager.getInstance();
  }

  private loadExternalFragments(workspaceRoot: string): Map<string, FragmentDefinitionNode> {
    const fragmentMap = new Map<string, FragmentDefinitionNode>();

    // Recursively find all .graphql files in the workspace
    const findGraphQLFiles = (dir: string): string[] => {
      const files: string[] = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      console.log(`Searching for GraphQL files in: ${dir}`);

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && entry.name !== 'node_modules' && !entry.name.startsWith('.')) {
          files.push(...findGraphQLFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.graphql')) {
          files.push(fullPath);
        }
      }
      return files;
    };

    const graphqlFiles = findGraphQLFiles(workspaceRoot);

    for (const filePath of graphqlFiles) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const ast = parse(content);

        // Collect fragments from the file
        visit(ast, {
          FragmentDefinition(node) {
            fragmentMap.set(node.name.value, node);
          },
        });
      } catch (error) {
        // Skip files that can't be parsed
        console.warn(`Could not parse GraphQL file: ${filePath}`, error);
      }
    }

    return fragmentMap;
  }

  private addFragmentsToQuery(ast: DocumentNode, workspaceRoot?: string): DocumentNode {
    const fragmentDefinitions: FragmentDefinitionNode[] = [];

    // Collect fragments from external files if workspace root is provided
    if (workspaceRoot) {
      console.log('Loading external fragments from workspace:', workspaceRoot);
      const externalFragments = this.loadExternalFragments(workspaceRoot);
      console.log(`Found ${externalFragments.size} external fragments`);
      externalFragments.forEach((fragment) => fragmentDefinitions.push(fragment));
    }

    // If we found external fragments, add them to the document
    if (fragmentDefinitions.length > 0) {
      return {
        ...ast,
        definitions: [...ast.definitions, ...fragmentDefinitions],
      };
    }

    return ast;
  }

  public calculateComplexity(schema: GraphQLSchema, query: string): ComplexityResult {
    try {
      const ast = parse(query);

      // Get fragments path from config, resolve relative to workspace folder
      const fragmentsPath = this.configManager.getFragmentsPath();
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
      const resolvedFragmentsPath = workspaceFolder
        ? path.resolve(workspaceFolder, fragmentsPath)
        : fragmentsPath;

      // Add external fragments to the query document
      const queryWithFragments = this.addFragmentsToQuery(ast, resolvedFragmentsPath);

      return this.calculateComplexityFromAST(schema, queryWithFragments);
    } catch (error) {
      return {
        totalCost: 0,
        isValid: false,
        errors: [error instanceof Error ? error.message : 'Parse error'],
      };
    }
  }

  public calculateComplexityFromAST(schema: GraphQLSchema, ast: DocumentNode): ComplexityResult {
    const { maxThreshold, scalarCost } = this.configManager.getConfig();
    let totalCost = 0;

    try {
      const rule = createComplexityLimitRule(maxThreshold, {
        onCost: (cost) => {
          totalCost = cost;
        },
        scalarCost,
      });

      const validationErrors = validate(schema, ast, [rule]);

      return {
        totalCost,
        isValid: validationErrors.length === 0,
        errors: validationErrors.map((error) => error.message),
      };
    } catch (error) {
      return {
        totalCost: 0,
        isValid: false,
        errors: [error instanceof Error ? error.message : 'Validation error'],
      };
    }
  }
}
