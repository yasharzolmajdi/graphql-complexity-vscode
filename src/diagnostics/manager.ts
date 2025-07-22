import * as vscode from 'vscode';
import { ConfigManager } from '../config/manager';

export class DiagnosticsManager {
  private static instance: DiagnosticsManager;
  private diagnosticCollection: vscode.DiagnosticCollection;
  private configManager: ConfigManager;

  private constructor() {
    this.diagnosticCollection = vscode.languages.createDiagnosticCollection('graphqlComplexity');
    this.configManager = ConfigManager.getInstance();
  }

  public static getInstance(): DiagnosticsManager {
    if (!DiagnosticsManager.instance) {
      DiagnosticsManager.instance = new DiagnosticsManager();
    }
    return DiagnosticsManager.instance;
  }

  public getDiagnosticCollection(): vscode.DiagnosticCollection {
    return this.diagnosticCollection;
  }

  public updateDiagnostics(document: vscode.TextDocument, complexity: number): void {
    const maxThreshold = this.configManager.getMaxThreshold();

    if (complexity > maxThreshold) {
      const diagnostic = this.createComplexityDiagnostic(document, complexity, maxThreshold);
      this.diagnosticCollection.set(document.uri, [diagnostic]);
    } else {
      this.clearDiagnostics(document.uri);
    }
  }

  public clearDiagnostics(uri: vscode.Uri): void {
    this.diagnosticCollection.delete(uri);
  }

  public dispose(): void {
    this.diagnosticCollection.dispose();
  }

  private createComplexityDiagnostic(
    document: vscode.TextDocument,
    complexity: number,
    maxThreshold: number,
  ): vscode.Diagnostic {
    const range = this.getFullDocumentRange(document);
    const message = `⚠️ Query complexity is ${complexity}, which exceeds the maximum of ${maxThreshold}.`;

    return new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Warning);
  }

  private getFullDocumentRange(document: vscode.TextDocument): vscode.Range {
    const firstLine = 0;
    const lastLine = document.lineCount - 1;
    const lastChar = document.lineAt(lastLine).range.end.character;

    return new vscode.Range(
      new vscode.Position(firstLine, 0),
      new vscode.Position(lastLine, lastChar),
    );
  }
}
