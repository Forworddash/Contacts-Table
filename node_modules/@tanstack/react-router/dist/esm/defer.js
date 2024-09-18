import { defaultSerializeError } from "./router.js";
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
        data: ((options == null ? void 0 : options.serializeError) ?? defaultSerializeError)(error),
        __isServerError: true
      };
    });
  }
  return promise;
}
export {
  defer
};
//# sourceMappingURL=defer.js.map
