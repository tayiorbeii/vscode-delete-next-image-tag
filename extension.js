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
		// let imgTagRegex = new RegExp(imgTagStart + '.*' + imgTagEnd, 'g');
		let imgTagRegex = new RegExp(`(?<=${editor.document.getText(editor.selection)})${imgTagStart}.*${imgTagEnd}`, 'g');

		
		// delete the next imgTagRegex match
		editor.edit(editBuilder => {
			let cursorPosition = editor.selection.active;

			// get the entire document text
			let range = new vscode.Range(cursorPosition, editor.document.lineAt(editor.document.lineCount - 1).range.end);

			let text = editor.document.getText(range);

			let match = imgTagRegex.exec(text);
			if (match) {
				// calculate the start and end positions for the match
				let startPos = editor.document.positionAt(editor.document.offsetAt(range.start) + match.index);
				let endPos = editor.document.positionAt(editor.document.offsetAt(range.start) + match.index + match[0].length);

				// delete the img tag
				editBuilder.delete(new vscode.Range(startPos, endPos));
			}
		});
	});

}


function deactivate() {}

module.exports = {
	activate,
	deactivate
}
