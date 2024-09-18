import { tsImport } from "tsx/esm/api";
async function loadConfigFile(filePath) {
  const loaded = await tsImport(filePath, import.meta.url);
  return loaded;
}
export {
  loadConfigFile
};
//# sourceMappingURL=loadConfigFile.js.map
