import * as vscode from "vscode";
import { VersionString } from "./Version";

/**
 * The configured .ged language version, e.g. "3.5" or "4.0". Elements,
 * properties, parameters, allowed-children entries, and enum values that
 * declare a `since`/`until` outside this version are treated as if they
 * didn't exist.
 */
export function getConfiguredVersion(): VersionString {

    const config = vscode.workspace.getConfiguration("gedLanguageTools");

    return config.get<string>("libraryVersion", "4.0");
}
