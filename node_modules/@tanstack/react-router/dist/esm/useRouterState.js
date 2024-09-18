import { useStore } from "@tanstack/react-store";
import { useRouter } from "./useRouter.js";
function useRouterState(opts) {
  const contextRouter = useRouter({
    warn: (opts == null ? void 0 : opts.router) === void 0
  });
  return useStore(((opts == null ? void 0 : opts.router) || contextRouter).__store, opts == null ? void 0 : opts.select);
}
export {
  useRouterState
};
//# sourceMappingURL=useRouterState.js.map
