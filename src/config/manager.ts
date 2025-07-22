import * as vscode from 'vscode';
import { GraphQLComplexityConfig } from '../types/config';

export class ConfigManager {
  private static instance: ConfigManager;

  private constructor() {}

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public getConfig(): GraphQLComplexityConfig {
    const config = vscode.workspace.getConfiguration('graphqlComplexity');
    return {
      endpoint: config.get<string>('endpoint', 'http://localhost:4000/graphql'),
      maxThreshold: config.get<number>('maxThreshold', 1_000),
      scalarCost: config.get<number>('scalarCost', 1),
      fragmentsPath: config.get<string>('fragmentsPath', '.'),
    };
  }

  public getEndpoint(): string {
    return this.getConfig().endpoint;
  }

  public getMaxThreshold(): number {
    return this.getConfig().maxThreshold;
  }

  public getScalarCost(): number {
    return this.getConfig().scalarCost;
  }

  public getFragmentsPath(): string {
    return this.getConfig().fragmentsPath;
  }
}
