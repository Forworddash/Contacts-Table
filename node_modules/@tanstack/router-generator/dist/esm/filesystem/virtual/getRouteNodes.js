import { resolve, join } from "node:path";
import { routePathToVariable, removeExt, removeTrailingSlash, removeLeadingSlash } from "../../utils.js";
import { getRouteNodes as getRouteNodes$1 } from "../physical/getRouteNodes.js";
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
  const fullDir = resolve(tsrConfig.routesDirectory);
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
    fullPath: join(fullDir, tsrConfig.virtualRouteConfig.file),
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
        const { routeNodes } = await getRouteNodes$1({
          ...tsrConfig,
          routesDirectory: resolve(fullDir, node.directory)
        });
        routeNodes.forEach((subtreeNode) => {
          subtreeNode.variableName = routePathToVariable(
            `${node.pathPrefix}/${removeExt(subtreeNode.filePath)}`
          );
          subtreeNode.routePath = `${(parent == null ? void 0 : parent.routePath) ?? ""}${node.pathPrefix}${subtreeNode.routePath}`;
          subtreeNode.filePath = `${node.directory}/${subtreeNode.filePath}`;
        });
        return routeNodes;
      }
      const filePath = node.file;
      const variableName = routePathToVariable(removeExt(filePath));
      const fullPath = join(fullDir, filePath);
      const parentRoutePath = removeTrailingSlash((parent == null ? void 0 : parent.routePath) ?? "/");
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
          const routePath = `${parentRoutePath}/${removeLeadingSlash(lastSegment)}`;
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
export {
  getRouteNodes,
  getRouteNodesRecursive
};
//# sourceMappingURL=getRouteNodes.js.map
