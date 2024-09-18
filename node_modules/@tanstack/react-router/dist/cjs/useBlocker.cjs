"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const React = require("react");
const useRouter = require("./useRouter.cjs");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const React__namespace = /* @__PURE__ */ _interopNamespaceDefault(React);
function useBlocker(blockerFnOrOpts, condition) {
  const { blockerFn, blockerCondition } = blockerFnOrOpts ? typeof blockerFnOrOpts === "function" ? { blockerFn: blockerFnOrOpts, blockerCondition: condition ?? true } : {
    blockerFn: blockerFnOrOpts.blockerFn,
    blockerCondition: blockerFnOrOpts.condition ?? true
  } : { blockerFn: void 0, blockerCondition: condition ?? true };
  const { history } = useRouter.useRouter();
  const [resolver, setResolver] = React__namespace.useState({
    status: "idle",
    proceed: () => {
    },
    reset: () => {
    }
  });
  React__namespace.useEffect(() => {
    const blockerFnComposed = async () => {
      if (blockerFn) {
        return await blockerFn();
      }
      const promise = new Promise((resolve) => {
        setResolver({
          status: "blocked",
          proceed: () => resolve(true),
          reset: () => resolve(false)
        });
      });
      const canNavigateAsync = await promise;
      setResolver({
        status: "idle",
        proceed: () => {
        },
        reset: () => {
        }
      });
      return canNavigateAsync;
    };
    return !blockerCondition ? void 0 : history.block(blockerFnComposed);
  }, [blockerFn, blockerCondition, history]);
  return resolver;
}
function Block({ blockerFn, condition, children }) {
  const resolver = useBlocker({ blockerFn, condition });
  return children ? typeof children === "function" ? children(resolver) : children : null;
}
exports.Block = Block;
exports.useBlocker = useBlocker;
//# sourceMappingURL=useBlocker.cjs.map
