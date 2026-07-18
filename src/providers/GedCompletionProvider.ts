import * as vscode from "vscode";

export class GedCompletionProvider
    implements vscode.CompletionItemProvider {

    public provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext,
    ): vscode.ProviderResult<vscode.CompletionItem[]> {

        // TODO: Implement GED completions later

        void document;
        void position;
        void token;
        void context;


        return [];
    }
}