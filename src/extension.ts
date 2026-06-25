import * as vscode from "vscode";
import { GedCompletionProvider } from "./providers/completionProvider";

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "ged-language-tools" is now active!');

    const completionProvider = vscode.languages.registerCompletionItemProvider(
        {
            language: "json",
            pattern: "**/*.ged",
        },
        new GedCompletionProvider(),
        '"',
    );

    context.subscriptions.push(completionProvider);
}

export function deactivate() {}
