import * as vscode from 'vscode';
import { GraphQLComplexityLensProvider, DocumentManager } from './providers';
import { DiagnosticsManager } from './diagnostics';
import { CommandHandler } from './commands';
import { StatusBarManager } from './statusbar';

export function activate(context: vscode.ExtensionContext) {
  // Initialize services
  const diagnosticsManager = DiagnosticsManager.getInstance();
  const statusBarManager = StatusBarManager.getInstance();
  const documentManager = new DocumentManager();
  const codeLensProvider = new GraphQLComplexityLensProvider();

  // Register commands
  CommandHandler.registerCommands(context);

  // Register code lens provider
  const codeLensDisposable = vscode.languages.registerCodeLensProvider(
    { language: 'graphql' },
    codeLensProvider,
  );

  // Set up event listeners
  const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument(async (event) => {
    if (vscode.window.activeTextEditor?.document === event.document) {
      await documentManager.updateDecorations(vscode.window.activeTextEditor);
    }
  });

  const onDidChangeActiveTextEditor = vscode.window.onDidChangeActiveTextEditor(async (editor) => {
    if (editor) {
      if (editor.document.languageId === 'graphql') {
        await documentManager.updateDecorations(editor);
      } else {
        statusBarManager.hide();
      }
    } else {
      statusBarManager.hide();
    }
  });

  const onDidCloseTextDocument = vscode.workspace.onDidCloseTextDocument((document) => {
    documentManager.handleDocumentClose(document);
  });

  // Add subscriptions
  context.subscriptions.push(
    codeLensDisposable,
    onDidChangeTextDocument,
    onDidChangeActiveTextEditor,
    onDidCloseTextDocument,
    diagnosticsManager.getDiagnosticCollection(),
    statusBarManager.getStatusBarItem(),
  );

  // Initial update for the active editor
  documentManager.updateDecorations(vscode.window.activeTextEditor);
}

export function deactivate() {
  // Cleanup is handled by VS Code disposing the subscriptions
}
