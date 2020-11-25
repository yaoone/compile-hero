"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessLoader = void 0;
const util_1 = require("../util");
const vscode = require("vscode");
const cssmin = require("gulp-minify-css");
const { src, dest } = require("gulp");
const less = require("less");
const rename = require("gulp-rename");
exports.lessLoader = ({ fileName, outputPath, notificationStatus, compileOptions, selectedText }) => {
    try {
        let css = "";
        const lessText = util_1.readFileContext(fileName);
        less.render(selectedText || lessText).then((output) => {
            css = output.css;
            src(fileName)
                .pipe(util_1.empty(css))
                .pipe(rename({ extname: ".css" }))
                .pipe(dest(outputPath))
                .on("end", () => {
                vscode.window.setStatusBarMessage(util_1.successMessage);
            });
            if (compileOptions.generateMinifiedCss) {
                src(fileName)
                    .pipe(util_1.empty(css))
                    .pipe(cssmin({ compatibility: "ie7" }))
                    .pipe(rename({ suffix: ".min", extname: ".css" }))
                    .pipe(dest(outputPath))
                    .on("end", () => {
                    vscode.window.setStatusBarMessage(util_1.successMessage);
                });
            }
        }).catch((error) => {
            const message = error.message + ' in file ' + error.filename + ' line no. ' + error.line;
            notificationStatus && vscode.window.showErrorMessage(message);
            vscode.window.setStatusBarMessage(util_1.errorMessage);
        });
    }
    catch (error) {
        notificationStatus && vscode.window.showErrorMessage(error.message);
        vscode.window.setStatusBarMessage(util_1.errorMessage);
    }
};
//# sourceMappingURL=less.js.map