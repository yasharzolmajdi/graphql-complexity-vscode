import * as vscode from 'vscode';
import { SchemaLoader } from '../schema/loader';
import { ComplexityCalculator } from '../schema/complexity-calculator';
import { DiagnosticsManager } from '../diagnostics/manager';

export class DocumentManager {
  private schemaLoader: SchemaLoader;
  private complexityCalculator: ComplexityCalculator;
  private diagnosticsManager: DiagnosticsManager;

  constructor() {
    this.schemaLoader = SchemaLoader.getInstance();
    this.complexityCalculator = new ComplexityCalculator();
    this.diagnosticsManager = DiagnosticsManager.getInstance();
  }

  public async updateDecorations(editor: vscode.TextEditor | undefined): Promise<void> {
    if (!editor || editor.document.languageId !== 'graphql') {
      return;
    }

    const document = editor.document;
    const text = document.getText();

    if (!text.trim()) {
      this.diagnosticsManager.clearDiagnostics(document.uri);
      return;
    }

    try {
      const schema = await this.schemaLoader.loadSchema();
      const complexityResult = this.complexityCalculator.calculateComplexity(schema, text);

      this.diagnosticsManager.updateDiagnostics(document, complexityResult.totalCost);
    } catch (error) {
      console.error('Error updating decorations:', error);
      this.diagnosticsManager.clearDiagnostics(document.uri);
    }
  }

  public handleDocumentClose(document: vscode.TextDocument): void {
    this.diagnosticsManager.clearDiagnostics(document.uri);
  }
}
