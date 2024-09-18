import * as React from "react";
import { useRouter } from "./useRouter.js";
function useBlocker(blockerFnOrOpts, condition) {
  const { blockerFn, blockerCondition } = blockerFnOrOpts ? typeof blockerFnOrOpts === "function" ? { blockerFn: blockerFnOrOpts, blockerCondition: condition ?? true } : {
    blockerFn: blockerFnOrOpts.blockerFn,
    blockerCondition: blockerFnOrOpts.condition ?? true
  } : { blockerFn: void 0, blockerCondition: condition ?? true };
  const { history } = useRouter();
  const [resolver, setResolver] = React.useState({
    status: "idle",
    proceed: () => {
    },
    reset: () => {
    }
  });
  React.useEffect(() => {
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
export {
  Block,
  useBlocker
};
//# sourceMappingURL=useBlocker.js.map
