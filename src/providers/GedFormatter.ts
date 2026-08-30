import * as vscode from "vscode";
import * as json from "jsonc-parser";

export class GedDocumentFormattingEditProvider
    implements vscode.DocumentFormattingEditProvider {

    public provideDocumentFormattingEdits(
        document: vscode.TextDocument,
        options: vscode.FormattingOptions,
    ): vscode.TextEdit[] {

        const text = document.getText();

        const edits = json.format(
            text,
            undefined,
            {
                tabSize: options.tabSize,
                insertSpaces: options.insertSpaces,
                eol: "\n",
            },
        );

        return edits.map((edit) =>
            new vscode.TextEdit(
                new vscode.Range(
                    document.positionAt(edit.offset),
                    document.positionAt(edit.offset + edit.length),
                ),
                edit.content,
            ),
        );
    }
}
