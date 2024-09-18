"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const router = require("./router.cjs");
function defer(_promise, options) {
  const promise = _promise;
  if (!promise.status) {
    Object.assign(promise, {
      status: "pending"
    });
    promise.then((data) => {
      promise.status = "success";
      promise.data = data;
    }).catch((error) => {
      promise.status = "error";
      promise.error = {
        data: ((options == null ? void 0 : options.serializeError) ?? router.defaultSerializeError)(error),
        __isServerError: true
      };
    });
  }
  return promise;
}
exports.defer = defer;
//# sourceMappingURL=defer.cjs.map
