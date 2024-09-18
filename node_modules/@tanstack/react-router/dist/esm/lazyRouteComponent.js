import * as React from "react";
function isModuleNotFoundError(error) {
  return typeof (error == null ? void 0 : error.message) === "string" && /Failed to fetch dynamically imported module/.test(error.message);
}
function lazyRouteComponent(importer, exportName) {
  let loadPromise;
  let comp;
  let error;
  const load = () => {
    if (!loadPromise) {
      loadPromise = importer().then((res) => {
        loadPromise = void 0;
        comp = res[exportName ?? "default"];
      }).catch((err) => {
        error = err;
      });
    }
    return loadPromise;
  };
  const lazyComp = function Lazy(props) {
    if (error) {
      if (isModuleNotFoundError(error)) {
        if (error instanceof Error && typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
          const storageKey = `tanstack_router_reload:${error.message}`;
          if (!sessionStorage.getItem(storageKey)) {
            sessionStorage.setItem(storageKey, "1");
            window.location.reload();
            return {
              default: () => null
            };
          }
        }
      }
      throw error;
    }
    if (!comp) {
      throw load();
    }
    return React.createElement(comp, props);
  };
  lazyComp.preload = load;
  return lazyComp;
}
export {
  lazyRouteComponent
};
//# sourceMappingURL=lazyRouteComponent.js.map
