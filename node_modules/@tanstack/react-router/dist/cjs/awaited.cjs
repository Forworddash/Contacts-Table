"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const warning = require("tiny-warning");
const useRouter = require("./useRouter.cjs");
const router = require("./router.cjs");
const defer = require("./defer.cjs");
const isServerSideError = require("./isServerSideError.cjs");
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
function useAwaited({
  promise: _promise
}) {
  var _a, _b;
  const router$1 = useRouter.useRouter();
  const promise = _promise;
  defer.defer(promise);
  if (promise.status === "pending") {
    throw promise;
  }
  if (promise.status === "error") {
    if (typeof document !== "undefined") {
      if (isServerSideError.isServerSideError(promise.error)) {
        throw (((_a = router$1.options.errorSerializer) == null ? void 0 : _a.deserialize) ?? isServerSideError.defaultDeserializeError)(promise.error.data);
      } else {
        warning(
          false,
          "Encountered a server-side error that doesn't fit the expected shape"
        );
        throw promise.error;
      }
    } else {
      throw {
        data: (((_b = router$1.options.errorSerializer) == null ? void 0 : _b.serialize) ?? router.defaultSerializeError)(promise.error),
        __isServerError: true
      };
    }
  }
  return [promise.data, promise];
}
function Await(props) {
  const inner = /* @__PURE__ */ jsxRuntime.jsx(AwaitInner, { ...props });
  if (props.fallback) {
    return /* @__PURE__ */ jsxRuntime.jsx(React__namespace.Suspense, { fallback: props.fallback, children: inner });
  }
  return inner;
}
function AwaitInner(props) {
  const [data] = useAwaited(props);
  return props.children(data);
}
exports.Await = Await;
exports.useAwaited = useAwaited;
//# sourceMappingURL=awaited.cjs.map
