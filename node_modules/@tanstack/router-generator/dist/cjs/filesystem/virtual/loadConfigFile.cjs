"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const api = require("tsx/esm/api");
var _documentCurrentScript = typeof document !== "undefined" ? document.currentScript : null;
async function loadConfigFile(filePath) {
  const loaded = await api.tsImport(filePath, typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("cjs/filesystem/virtual/loadConfigFile.cjs", document.baseURI).href);
  return loaded;
}
exports.loadConfigFile = loadConfigFile;
//# sourceMappingURL=loadConfigFile.cjs.map
