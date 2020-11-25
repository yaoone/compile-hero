"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pugLoader = void 0;
const util_1 = require("../util");
const vscode = require("vscode");
const pug = require("pug");
const { src, dest } = require("gulp");
const rename = require("gulp-rename");
exports.pugLoader = ({ fileName, outputPath, notificationStatus, compileOptions, selectedText }) => {
    let html = "";
    try {
        html = pug.renderFile(fileName, { pretty: true });
        const fn = pug.compile(selectedText, { pretty: true });
        html = selectedText ? fn() : html;
    }
    catch (error) {
        notificationStatus && vscode.window.showErrorMessage(error.message);
        vscode.window.setStatusBarMessage(util_1.errorMessage);
    }
    src(fileName)
        .pipe(util_1.empty(html))
        .pipe(rename({ extname: ".html" }))
        .pipe(dest(outputPath));
    if (compileOptions.generateMinifiedHtml) {
        html = pug.renderFile(fileName);
        const fn = pug.compile(selectedText);
        html = selectedText ? fn() : html;
        src(fileName)
            .pipe(util_1.empty(html))
            .pipe(rename({ suffix: ".min", extname: ".html" }))
            .pipe(dest(outputPath));
    }
    vscode.window.setStatusBarMessage(util_1.successMessage);
};
//# sourceMappingURL=pug.js.map