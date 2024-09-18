import { jsx } from "react/jsx-runtime";
import * as React from "react";
import warning from "tiny-warning";
import { useRouter } from "./useRouter.js";
import { defaultSerializeError } from "./router.js";
import { defer } from "./defer.js";
import { isServerSideError, defaultDeserializeError } from "./isServerSideError.js";
function useAwaited({
  promise: _promise
}) {
  var _a, _b;
  const router = useRouter();
  const promise = _promise;
  defer(promise);
  if (promise.status === "pending") {
    throw promise;
  }
  if (promise.status === "error") {
    if (typeof document !== "undefined") {
      if (isServerSideError(promise.error)) {
        throw (((_a = router.options.errorSerializer) == null ? void 0 : _a.deserialize) ?? defaultDeserializeError)(promise.error.data);
      } else {
        warning(
          false,
          "Encountered a server-side error that doesn't fit the expected shape"
        );
        throw promise.error;
      }
    } else {
      throw {
        data: (((_b = router.options.errorSerializer) == null ? void 0 : _b.serialize) ?? defaultSerializeError)(promise.error),
        __isServerError: true
      };
    }
  }
  return [promise.data, promise];
}
function Await(props) {
  const inner = /* @__PURE__ */ jsx(AwaitInner, { ...props });
  if (props.fallback) {
    return /* @__PURE__ */ jsx(React.Suspense, { fallback: props.fallback, children: inner });
  }
  return inner;
}
function AwaitInner(props) {
  const [data] = useAwaited(props);
  return props.children(data);
}
export {
  Await,
  useAwaited
};
//# sourceMappingURL=awaited.js.map
