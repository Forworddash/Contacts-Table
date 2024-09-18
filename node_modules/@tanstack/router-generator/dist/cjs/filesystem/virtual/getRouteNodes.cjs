"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const path = require("node:path");
const utils = require("../../utils.cjs");
const getRouteNodes$1 = require("../physical/getRouteNodes.cjs");
function ensureLeadingUnderScore(id) {
  if (id.startsWith("_")) {
    return id;
  }
  return `_${id}`;
}
function flattenTree(node) {
  const result = [node];
  if (node.children) {
    for (const child of node.children) {
      result.push(...flattenTree(child));
    }
  }
  delete node.children;
  return result;
}
async function getRouteNodes(tsrConfig) {
  const fullDir = path.resolve(tsrConfig.routesDirectory);
  if (tsrConfig.virtualRouteConfig === void 0) {
    throw new Error(`virtualRouteConfig is undefined`);
  }
  const children = await getRouteNodesRecursive(
    tsrConfig,
    fullDir,
    tsrConfig.virtualRouteConfig.children
  );
  const allNodes = flattenTree({
    children,
    filePath: tsrConfig.virtualRouteConfig.file,
    fullPath: path.join(fullDir, tsrConfig.virtualRouteConfig.file),
    variableName: "rootRoute",
    routePath: "/",
    isRoot: true
  });
  const rootRouteNode = allNodes[0];
  const routeNodes = allNodes.slice(1);
  return { rootRouteNode, routeNodes };
}
async function getRouteNodesRecursive(tsrConfig, fullDir, nodes, parent) {
  if (nodes === void 0) {
    return [];
  }
  const children = await Promise.all(
    nodes.map(async (node) => {
      if (node.type === "physical") {
        const { routeNodes } = await getRouteNodes$1.getRouteNodes({
          ...tsrConfig,
          routesDirectory: path.resolve(fullDir, node.directory)
        });
        routeNodes.forEach((subtreeNode) => {
          subtreeNode.variableName = utils.routePathToVariable(
            `${node.pathPrefix}/${utils.removeExt(subtreeNode.filePath)}`
          );
          subtreeNode.routePath = `${(parent == null ? void 0 : parent.routePath) ?? ""}${node.pathPrefix}${subtreeNode.routePath}`;
          subtreeNode.filePath = `${node.directory}/${subtreeNode.filePath}`;
        });
        return routeNodes;
      }
      const filePath = node.file;
      const variableName = utils.routePathToVariable(utils.removeExt(filePath));
      const fullPath = path.join(fullDir, filePath);
      const parentRoutePath = utils.removeTrailingSlash((parent == null ? void 0 : parent.routePath) ?? "/");
      const isLayout = node.type === "layout";
      switch (node.type) {
        case "index": {
          const routePath = `${parentRoutePath}/`;
          return {
            filePath,
            fullPath,
            variableName,
            routePath,
            isLayout
          };
        }
        case "route":
        case "layout": {
          let lastSegment;
          if (node.type === "layout") {
            if (node.id !== void 0) {
              node.id = ensureLeadingUnderScore(node.id);
            } else {
              node.id = "_layout";
            }
            lastSegment = node.id;
          } else {
            lastSegment = node.path;
          }
          const routePath = `${parentRoutePath}/${utils.removeLeadingSlash(lastSegment)}`;
          const routeNode = {
            fullPath,
            isLayout,
            filePath,
            variableName,
            routePath
          };
          if (node.children !== void 0) {
            const children2 = await getRouteNodesRecursive(
              tsrConfig,
              fullDir,
              node.children,
              routeNode
            );
            routeNode.children = children2;
          }
          return routeNode;
        }
      }
    })
  );
  return children.flat();
}
exports.getRouteNodes = getRouteNodes;
exports.getRouteNodesRecursive = getRouteNodesRecursive;
//# sourceMappingURL=getRouteNodes.cjs.map
