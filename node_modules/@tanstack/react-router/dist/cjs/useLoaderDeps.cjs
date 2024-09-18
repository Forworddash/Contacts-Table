"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const useMatch = require("./useMatch.cjs");
function useLoaderDeps(opts) {
  return useMatch.useMatch({
    ...opts,
    select: (s) => {
      return typeof opts.select === "function" ? opts.select(s.loaderDeps) : s.loaderDeps;
    }
  });
}
exports.useLoaderDeps = useLoaderDeps;
//# sourceMappingURL=useLoaderDeps.cjs.map
