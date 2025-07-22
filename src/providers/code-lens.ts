import * as vscode from 'vscode';
import { SchemaLoader } from '../schema/loader';
import { ComplexityCalculator } from '../schema/complexity-calculator';
import { DiagnosticsManager } from '../diagnostics/manager';
import { StatusBarManager } from '../statusbar';

export class GraphQLComplexityLensProvider implements vscode.CodeLensProvider {
  private schemaLoader: SchemaLoader;
  private complexityCalculator: ComplexityCalculator;
  private diagnosticsManager: DiagnosticsManager;
  private statusBarManager: StatusBarManager;

  constructor() {
    this.schemaLoader = SchemaLoader.getInstance();
    this.complexityCalculator = new ComplexityCalculator();
    this.diagnosticsManager = DiagnosticsManager.getInstance();
    this.statusBarManager = StatusBarManager.getInstance();
  }

  public async provideCodeLenses(
    document: vscode.TextDocument,
    _token: vscode.CancellationToken,
  ): Promise<vscode.CodeLens[]> {
    const query = document.getText();
    const codeLenses: vscode.CodeLens[] = [];

    try {
      const schema = await this.schemaLoader.loadSchema();
      const complexityResult = this.complexityCalculator.calculateComplexity(schema, query);

      if (complexityResult.isValid || complexityResult.totalCost > 0) {
        const config = vscode.workspace.getConfiguration('graphqlComplexity');
        const maxThreshold = config.get<number>('maxThreshold', 1000);

        const lens = this.createComplexityCodeLens(complexityResult.totalCost);
        codeLenses.push(lens);

        this.diagnosticsManager.updateDiagnostics(document, complexityResult.totalCost);
        this.statusBarManager.updateComplexity(complexityResult.totalCost, maxThreshold);
      } else {
        this.statusBarManager.hide();
      }
    } catch (error) {
      console.error('GraphQL Complexity Error:', error);
    }

    return codeLenses;
  }

  private createComplexityCodeLens(totalCost: number): vscode.CodeLens {
    const firstLineRange = new vscode.Range(0, 0, 0, 0);
    const config = vscode.workspace.getConfiguration('graphqlComplexity');
    const maxThreshold = config.get<number>('maxThreshold', 1000);

    // Choose icon and color based on complexity level
    let icon: string;
    let title: string;

    if (totalCost === 0) {
      icon = '$(question)';
      title = `${icon} Complexity: Unable to calculate`;
    } else if (totalCost > maxThreshold) {
      icon = '$(warning)';
      title = `${icon} High Complexity: ${totalCost} (exceeds ${maxThreshold})`;
    } else if (totalCost > maxThreshold * 0.8) {
      icon = '$(alert)';
      title = `${icon} Moderate Complexity: ${totalCost}`;
    } else {
      icon = '$(check)';
      title = `${icon} Low Complexity: ${totalCost}`;
    }

    return new vscode.CodeLens(firstLineRange, {
      title,
      command: 'graphqlComplexity.analyze',
      arguments: [totalCost, maxThreshold],
    });
  }
}
