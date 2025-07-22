import * as vscode from 'vscode';

export class CommandHandler {
  static registerCommands(context: vscode.ExtensionContext): void {
    // Register analyze command
    const analyzeCommand = vscode.commands.registerCommand(
      'graphqlComplexity.analyze',
      (totalCost?: number, maxThreshold?: number) => {
        CommandHandler.showComplexityAnalysis(totalCost, maxThreshold);
      },
    );

    // Register refresh command
    const refreshCommand = vscode.commands.registerCommand('graphqlComplexity.refresh', () => {
      CommandHandler.refreshSchema();
    });

    // Register configure command
    const configureCommand = vscode.commands.registerCommand('graphqlComplexity.configure', () => {
      CommandHandler.openConfiguration();
    });

    context.subscriptions.push(analyzeCommand, refreshCommand, configureCommand);
  }

  private static showComplexityAnalysis(totalCost?: number, maxThreshold?: number): void {
    if (totalCost === undefined) {
      vscode.window.showInformationMessage(
        '$(pulse) GraphQL Complexity Analysis',
        'To see complexity analysis, open a GraphQL file (.graphql or .gql)',
      );
      return;
    }

    const config = vscode.workspace.getConfiguration('graphqlComplexity');
    const threshold = maxThreshold || config.get<number>('maxThreshold', 1000);

    let icon: string;
    let message: string;
    let messageType: 'info' | 'warning' | 'error';

    if (totalCost === 0) {
      icon = '$(question)';
      message = `${icon} Unable to calculate complexity. Check your GraphQL schema configuration.`;
      messageType = 'warning';
    } else if (totalCost > threshold) {
      icon = '$(warning)';
      message = `${icon} High complexity detected! Current: ${totalCost}, Threshold: ${threshold}`;
      messageType = 'error';
    } else if (totalCost > threshold * 0.8) {
      icon = '$(alert)';
      message = `${icon} Moderate complexity: ${totalCost}/${threshold}. Consider optimizing your query.`;
      messageType = 'warning';
    } else {
      icon = '$(check)';
      message = `${icon} Good complexity level: ${totalCost}/${threshold}`;
      messageType = 'info';
    }

    switch (messageType) {
      case 'error':
        vscode.window.showErrorMessage(message, 'Configure', 'Learn More').then((selection) => {
          if (selection === 'Configure') {
            CommandHandler.openConfiguration();
          } else if (selection === 'Learn More') {
            vscode.env.openExternal(
              vscode.Uri.parse(
                'https://github.com/yasharzolmajdi/graphql-complexity-vscode#readme',
              ),
            );
          }
        });
        break;
      case 'warning':
        vscode.window.showWarningMessage(message, 'Configure').then((selection) => {
          if (selection === 'Configure') {
            CommandHandler.openConfiguration();
          }
        });
        break;
      default:
        vscode.window.showInformationMessage(message);
    }
  }

  private static refreshSchema(): void {
    vscode.window.showInformationMessage('$(refresh) Refreshing GraphQL schema...');

    // Trigger a refresh by reloading the active document if it's GraphQL
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor && activeEditor.document.languageId === 'graphql') {
      // Force CodeLens refresh
      vscode.commands.executeCommand(
        'vscode.executeCodeLensProvider',
        activeEditor.document.uri,
        activeEditor.document.version,
      );
    }

    vscode.window.showInformationMessage('$(check) Schema refreshed successfully!');
  }

  private static openConfiguration(): void {
    vscode.commands.executeCommand('workbench.action.openSettings', 'graphqlComplexity');
  }
}
