import * as vscode from "vscode";
import { validateDocument, validateDocumentContentOnly } from "./providers/GedValidator";
import { GedCompletionProvider } from "./providers/GedCompletionProvider";
import { GedDocumentFormattingEditProvider } from "./providers/GedFormatter";

export function activate(context: vscode.ExtensionContext) {
    console.log('"ged-language-tools" loaded.');

    const completionProvider = vscode.languages.registerCompletionItemProvider(
        { language: "ged" },
        new GedCompletionProvider(),
        '"',
    );

    const formattingProvider = vscode.languages.registerDocumentFormattingEditProvider(
        { language: "ged" },
        new GedDocumentFormattingEditProvider(),
    );

    const diagnostics = vscode.languages.createDiagnosticCollection("ged");

    context.subscriptions.push(completionProvider, formattingProvider, diagnostics);

    //
    // Validate already-open documents on activation
    //
    vscode.workspace.textDocuments
        .filter((document) => document.fileName.endsWith(".ged"))
        .forEach((document) => validateDocument(document, diagnostics));

    //
    // Validate on every edit
    //
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument((event) => {
            if (event.document.fileName.endsWith(".ged")) {
                validateDocumentContentOnly(event.document, diagnostics);
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

    //
    // Re-check content/location live when the user toggles the location
    // checkbox, edits the ignore list, or changes the configured library
    // version, without needing to reopen files
    //
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration((event) => {
            if (
                event.affectsConfiguration("gedLanguageTools.enableLocationCheck") ||
                event.affectsConfiguration("gedLanguageTools.ignoredLocationPaths") ||
                event.affectsConfiguration("gedLanguageTools.libraryVersion")
            ) {
                vscode.workspace.textDocuments
                    .filter((document) => document.fileName.endsWith(".ged"))
                    .forEach((document) => validateDocument(document, diagnostics));
            }
        }),
    );

    //
    // Handle renames/moves done through VS Code's own UI
    // (Explorer sidebar, drag-and-drop, workspace.fs API)
    //
    context.subscriptions.push(
        vscode.workspace.onDidRenameFiles((event) => {
            for (const { oldUri, newUri } of event.files) {

                diagnostics.delete(oldUri);

                if (!newUri.fsPath.endsWith(".ged")) {
                    continue;
                }

                const document = vscode.workspace.textDocuments.find(
                    (doc) => doc.uri.toString() === newUri.toString()
                );

                if (document) {
                    validateDocument(document, diagnostics);
                }
            }
        }),
    );

    //
    // Catch file moves/creates done OUTSIDE VS Code
    // (terminal, git, external tools) that onDidRenameFiles can't see
    //
    const watcher = vscode.workspace.createFileSystemWatcher("**/*.ged");

    watcher.onDidCreate((uri) => {
        const document = vscode.workspace.textDocuments.find(
            (doc) => doc.uri.toString() === uri.toString()
        );
        if (document) {
            validateDocument(document, diagnostics);
        }
    });

    watcher.onDidDelete((uri) => {
        diagnostics.delete(uri);
    });

    context.subscriptions.push(watcher);
}

export function deactivate() { }
