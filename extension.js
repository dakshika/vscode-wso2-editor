// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    class wso2Editor{
        constructor(){
            this._onChange = new vscode.EventEmitter();        
        }

        provideTextDocumentContent(uri, token){

            return `<!DOCTYPE html>
            <html>
            <head></head>
            <body>
            <div class="wso2-editor">
            </div>
                <h1> Test </h1>
            </body>
            </html>
            `;
        }


    }

      const registerCommand = vscode.commands.registerCommand;
      let previewUri = vscode.Uri.parse('wso2-editor://authority/wso2-editor');
      let provider = new wso2Editor();
     let registration = vscode.workspace.registerTextDocumentContentProvider('wso2-editor', provider);

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vscode-wso2-editor" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = registerCommand('extension.wso2Editor', () => {
        return vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two).then((success) => {
        }, (reason) => {
            vscode.window.showErrorMessage(reason);
        });
    });

   context.subscriptions.push(disposable, registration);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;