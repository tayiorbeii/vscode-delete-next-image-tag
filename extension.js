// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	let disposable = vscode.commands.registerCommand('delete-next-image-tag.main', function () {
		let editor = vscode.window.activeTextEditor;

		let imgTagStart = '<img';
		let imgTagEnd = '>';

		// regex to find the next img tag
		let imgTagRegex = new RegExp(imgTagStart + '.*' + imgTagEnd, 'g');
		
		// delete the next imgTagRegex match
		editor.edit(editBuilder => {
			let cursorPosition = editor.selection.active;
			let text = editor.document.getText();
			let match = imgTagRegex.exec(text);
			if (match) {
				let startPos = editor.document.positionAt(match.index);
				let endPos = editor.document.positionAt(match.index + match[0].length);
				editBuilder.delete(new vscode.Range(startPos, endPos));
			}
		});

	});

	context.subscriptions.push(disposable);
}


function deactivate() {}

module.exports = {
	activate,
	deactivate
}
