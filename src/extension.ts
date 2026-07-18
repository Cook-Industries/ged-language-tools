import * as vscode from "vscode";
import { validateDocument } from "./providers/GedValidator";
import { GedCompletionProvider } from "./providers/GedCompletionProvider";

export function activate(context: vscode.ExtensionContext) {
    console.log('"ged-language-tools" loaded.');

    const completionProvider = vscode.languages.registerCompletionItemProvider(
        {
            language: "json",
            pattern: "**/*.ged",
        },
        new GedCompletionProvider(),
        '"',
    );

    const diagnostics = vscode.languages.createDiagnosticCollection("ged");

    context.subscriptions.push(completionProvider, diagnostics);

    //
    // Validate opened documents
    //
    vscode.workspace.textDocuments
        .filter((document) => document.fileName.endsWith(".ged"))
        .forEach((document) => validateDocument(document, diagnostics));

    //
    // Validate on changes
    //
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument((event) => {
            if (event.document.fileName.endsWith(".ged")) {
                validateDocument(event.document, diagnostics);
            }
        }),
    );

    //
    // Validate newly opened files
    //
    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument((document) => {
            if (document.fileName.endsWith(".ged")) {
                validateDocument(document, diagnostics);
            }
        }),
    );
}

export function deactivate() { }
