import * as vscode from "vscode";
import * as json from "jsonc-parser";

/**
 * Restores "Format Document" for .ged files. The built-in JSON language
 * server used to provide this for free while .ged files were mapped to
 * the "json" language id — now that they have their own "ged" id (to
 * stop that same built-in server from also contributing unrelated
 * completions, see GedCompletionProvider.ts), formatting has to be
 * supplied explicitly. jsonc-parser's format() is the same formatting
 * engine the built-in server used internally, so output should look
 * identical to before.
 */
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
