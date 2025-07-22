import * as vscode from 'vscode';

export class StatusBarManager {
  private static instance: StatusBarManager;
  private statusBarItem: vscode.StatusBarItem;

  private constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    this.statusBarItem.command = 'graphqlComplexity.analyze';
    this.statusBarItem.tooltip = 'GraphQL Complexity Analysis';
  }

  static getInstance(): StatusBarManager {
    if (!StatusBarManager.instance) {
      StatusBarManager.instance = new StatusBarManager();
    }
    return StatusBarManager.instance;
  }

  updateComplexity(totalCost: number, maxThreshold: number): void {
    let icon: string;
    let color: string | undefined;

    if (totalCost === 0) {
      icon = '$(question)';
      color = '#FFA500'; // Orange
      this.statusBarItem.text = `${icon} GraphQL: Unknown`;
    } else if (totalCost > maxThreshold) {
      icon = '$(warning)';
      color = '#FF6B6B'; // Red
      this.statusBarItem.text = `${icon} GraphQL: ${totalCost}`;
    } else if (totalCost > maxThreshold * 0.8) {
      icon = '$(alert)';
      color = '#FFD93D'; // Yellow
      this.statusBarItem.text = `${icon} GraphQL: ${totalCost}`;
    } else {
      icon = '$(check)';
      color = '#4CAF50'; // Green
      this.statusBarItem.text = `${icon} GraphQL: ${totalCost}`;
    }

    this.statusBarItem.color = color;
    this.statusBarItem.show();
  }

  hide(): void {
    this.statusBarItem.hide();
  }

  dispose(): void {
    this.statusBarItem.dispose();
  }

  getStatusBarItem(): vscode.StatusBarItem {
    return this.statusBarItem;
  }
}
