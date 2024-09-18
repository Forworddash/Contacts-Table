"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const useMatch = require("./useMatch.cjs");
function useLoaderData(opts) {
  return useMatch.useMatch({
    ...opts,
    select: (s) => {
      return typeof opts.select === "function" ? opts.select(s.loaderData) : s.loaderData;
    }
  });
}
exports.useLoaderData = useLoaderData;
//# sourceMappingURL=useLoaderData.cjs.map
