"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const React = require("react");
const utils = require("./utils.cjs");
const useRouter = require("./useRouter.cjs");
const useRouterState = require("./useRouterState.cjs");
const path = require("./path.cjs");
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
function Transitioner() {
  const router = useRouter.useRouter();
  const mountLoadForRouter = React__namespace.useRef({ router, mounted: false });
  const routerState = useRouterState.useRouterState({
    select: (s) => utils.pick(s, ["isLoading", "location", "resolvedLocation", "isTransitioning"])
  });
  const [isTransitioning, startReactTransition_] = React__namespace.useTransition();
  const hasPendingMatches = useRouterState.useRouterState({
    select: (s) => s.matches.some((d) => d.status === "pending")
  });
  const previousIsLoading = utils.usePrevious(routerState.isLoading);
  const isAnyPending = routerState.isLoading || isTransitioning || hasPendingMatches;
  const previousIsAnyPending = utils.usePrevious(isAnyPending);
  if (!router.isServer) {
    router.startReactTransition = startReactTransition_;
  }
  React__namespace.useEffect(() => {
    const unsub = router.history.subscribe(router.load);
    const nextLocation = router.buildLocation({
      to: router.latestLocation.pathname,
      search: true,
      params: true,
      hash: true,
      state: true
    });
    if (path.trimPathRight(router.latestLocation.href) !== path.trimPathRight(nextLocation.href)) {
      router.commitLocation({ ...nextLocation, replace: true });
    }
    return () => {
      unsub();
    };
  }, [router, router.history]);
  utils.useLayoutEffect(() => {
    var _a;
    if (typeof window !== "undefined" && ((_a = window.__TSR__) == null ? void 0 : _a.dehydrated) || mountLoadForRouter.current.router === router && mountLoadForRouter.current.mounted) {
      return;
    }
    mountLoadForRouter.current = { router, mounted: true };
    const tryLoad = async () => {
      try {
        await router.load();
      } catch (err) {
        console.error(err);
      }
    };
    tryLoad();
  }, [router]);
  utils.useLayoutEffect(() => {
    if (previousIsLoading && !routerState.isLoading) {
      const toLocation = router.state.location;
      const fromLocation = router.state.resolvedLocation;
      const pathChanged = fromLocation.href !== toLocation.href;
      router.emit({
        type: "onLoad",
        // When the new URL has committed, when the new matches have been loaded into state.matches
        fromLocation,
        toLocation,
        pathChanged
      });
    }
  }, [previousIsLoading, router, routerState.isLoading]);
  utils.useLayoutEffect(() => {
    if (previousIsAnyPending && !isAnyPending) {
      const toLocation = router.state.location;
      const fromLocation = router.state.resolvedLocation;
      const pathChanged = fromLocation.href !== toLocation.href;
      router.emit({
        type: "onResolved",
        fromLocation,
        toLocation,
        pathChanged
      });
      router.__store.setState((s) => ({
        ...s,
        status: "idle",
        resolvedLocation: s.location
      }));
      if (typeof document !== "undefined" && document.querySelector) {
        if (router.state.location.hash !== "") {
          const el = document.getElementById(router.state.location.hash);
          if (el) {
            el.scrollIntoView();
          }
        }
      }
    }
  }, [isAnyPending, previousIsAnyPending, router]);
  return null;
}
exports.Transitioner = Transitioner;
//# sourceMappingURL=Transitioner.cjs.map
