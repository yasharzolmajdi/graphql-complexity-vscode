import * as vscode from 'vscode';
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLSchema,
  IntrospectionQuery,
} from 'graphql';
import { request } from 'graphql-request';
import { ConfigManager } from '../config/manager';

export class SchemaLoader {
  private static instance: SchemaLoader;
  private cachedSchema: GraphQLSchema | null = null;
  private configManager: ConfigManager;

  private constructor() {
    this.configManager = ConfigManager.getInstance();
  }

  public static getInstance(): SchemaLoader {
    if (!SchemaLoader.instance) {
      SchemaLoader.instance = new SchemaLoader();
    }
    return SchemaLoader.instance;
  }

  public async loadSchema(): Promise<GraphQLSchema> {
    if (this.cachedSchema) {
      return this.cachedSchema;
    }

    return this.fetchRemoteSchema();
  }

  public clearCache(): void {
    this.cachedSchema = null;
  }

  private async fetchRemoteSchema(): Promise<GraphQLSchema> {
    const endpoint = this.configManager.getEndpoint();

    try {
      const introspectionQuery = getIntrospectionQuery();
      const result = await request(endpoint, introspectionQuery);

      // Handle both direct result and data property patterns
      const schemaData =
        (result as { data?: IntrospectionQuery }).data || (result as IntrospectionQuery);
      this.cachedSchema = buildClientSchema(schemaData);
      return this.cachedSchema;
    } catch {
      const errorMessage = `Failed to fetch schema from ${endpoint}`;
      vscode.window.showErrorMessage(errorMessage);
      throw new Error(errorMessage);
    }
  }
}
