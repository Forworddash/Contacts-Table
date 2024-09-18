"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const reactStore = require("@tanstack/react-store");
const useRouter = require("./useRouter.cjs");
function useRouterState(opts) {
  const contextRouter = useRouter.useRouter({
    warn: (opts == null ? void 0 : opts.router) === void 0
  });
  return reactStore.useStore(((opts == null ? void 0 : opts.router) || contextRouter).__store, opts == null ? void 0 : opts.select);
}
exports.useRouterState = useRouterState;
//# sourceMappingURL=useRouterState.cjs.map
