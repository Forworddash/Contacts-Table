const pushStateEvent = "pushstate";
const popStateEvent = "popstate";
const beforeUnloadEvent = "beforeunload";
const beforeUnloadListener = (event) => {
  event.preventDefault();
  return event.returnValue = "";
};
const stopBlocking = () => {
  removeEventListener(beforeUnloadEvent, beforeUnloadListener, {
    capture: true
  });
};
function createHistory(opts) {
  let location = opts.getLocation();
  const subscribers = /* @__PURE__ */ new Set();
  let blockers = [];
  const notify = () => {
    location = opts.getLocation();
    subscribers.forEach((subscriber) => subscriber());
  };
  const tryNavigation = async (task, navigateOpts) => {
    var _a;
    const ignoreBlocker = (navigateOpts == null ? void 0 : navigateOpts.ignoreBlocker) ?? false;
    if (!ignoreBlocker && typeof document !== "undefined" && blockers.length) {
      for (const blocker of blockers) {
        const allowed = await blocker();
        if (!allowed) {
          (_a = opts.onBlocked) == null ? void 0 : _a.call(opts, notify);
          return;
        }
      }
    }
    task();
  };
  return {
    get location() {
      return location;
    },
    subscribers,
    subscribe: (cb) => {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },
    push: (path, state, navigateOpts) => {
      state = assignKey(state);
      tryNavigation(() => {
        opts.pushState(path, state);
        notify();
      }, navigateOpts);
    },
    replace: (path, state, navigateOpts) => {
      state = assignKey(state);
      tryNavigation(() => {
        opts.replaceState(path, state);
        notify();
      }, navigateOpts);
    },
    go: (index, navigateOpts) => {
      tryNavigation(() => {
        opts.go(index);
        notify();
      }, navigateOpts);
    },
    back: (navigateOpts) => {
      tryNavigation(() => {
        opts.back();
        notify();
      }, navigateOpts);
    },
    forward: (navigateOpts) => {
      tryNavigation(() => {
        opts.forward();
        notify();
      }, navigateOpts);
    },
    createHref: (str) => opts.createHref(str),
    block: (blocker) => {
      blockers.push(blocker);
      if (blockers.length === 1) {
        addEventListener(beforeUnloadEvent, beforeUnloadListener, {
          capture: true
        });
      }
      return () => {
        blockers = blockers.filter((b) => b !== blocker);
        if (!blockers.length) {
          stopBlocking();
        }
      };
    },
    flush: () => {
      var _a;
      return (_a = opts.flush) == null ? void 0 : _a.call(opts);
    },
    destroy: () => {
      var _a;
      return (_a = opts.destroy) == null ? void 0 : _a.call(opts);
    },
    notify
  };
}
function assignKey(state) {
  if (!state) {
    state = {};
  }
  return {
    ...state,
    key: createRandomKey()
  };
}
function createBrowserHistory(opts) {
  const win = (opts == null ? void 0 : opts.window) ?? (typeof document !== "undefined" ? window : void 0);
  const originalPushState = win.history.pushState;
  const originalReplaceState = win.history.replaceState;
  const createHref = (opts == null ? void 0 : opts.createHref) ?? ((path) => path);
  const parseLocation = (opts == null ? void 0 : opts.parseLocation) ?? (() => parseHref(
    `${win.location.pathname}${win.location.search}${win.location.hash}`,
    win.history.state
  ));
  let currentLocation = parseLocation();
  let rollbackLocation;
  const getLocation = () => currentLocation;
  let next;
  let scheduled;
  const flush = () => {
    if (!next) {
      return;
    }
    history._ignoreSubscribers = true;
    (next.isPush ? win.history.pushState : win.history.replaceState)(
      next.state,
      "",
      next.href
    );
    history._ignoreSubscribers = false;
    next = void 0;
    scheduled = void 0;
    rollbackLocation = void 0;
  };
  const queueHistoryAction = (type, destHref, state) => {
    const href = createHref(destHref);
    if (!scheduled) {
      rollbackLocation = currentLocation;
    }
    currentLocation = parseHref(destHref, state);
    next = {
      href,
      state,
      isPush: (next == null ? void 0 : next.isPush) || type === "push"
    };
    if (!scheduled) {
      scheduled = Promise.resolve().then(() => flush());
    }
  };
  const onPushPop = () => {
    currentLocation = parseLocation();
    history.notify();
  };
  const history = createHistory({
    getLocation,
    pushState: (href, state) => queueHistoryAction("push", href, state),
    replaceState: (href, state) => queueHistoryAction("replace", href, state),
    back: () => win.history.back(),
    forward: () => win.history.forward(),
    go: (n) => win.history.go(n),
    createHref: (href) => createHref(href),
    flush,
    destroy: () => {
      win.history.pushState = originalPushState;
      win.history.replaceState = originalReplaceState;
      win.removeEventListener(pushStateEvent, onPushPop);
      win.removeEventListener(popStateEvent, onPushPop);
    },
    onBlocked: (onUpdate) => {
      if (rollbackLocation && currentLocation !== rollbackLocation) {
        currentLocation = rollbackLocation;
        onUpdate();
      }
    }
  });
  win.addEventListener(pushStateEvent, onPushPop);
  win.addEventListener(popStateEvent, onPushPop);
  win.history.pushState = function(...args) {
    const res = originalPushState.apply(win.history, args);
    if (!history._ignoreSubscribers) onPushPop();
    return res;
  };
  win.history.replaceState = function(...args) {
    const res = originalReplaceState.apply(win.history, args);
    if (!history._ignoreSubscribers) onPushPop();
    return res;
  };
  return history;
}
function createHashHistory(opts) {
  const win = (opts == null ? void 0 : opts.window) ?? (typeof document !== "undefined" ? window : void 0);
  return createBrowserHistory({
    window: win,
    parseLocation: () => {
      const hashHref = win.location.hash.split("#").slice(1).join("#") ?? "/";
      return parseHref(hashHref, win.history.state);
    },
    createHref: (href) => `${win.location.pathname}${win.location.search}#${href}`
  });
}
function createMemoryHistory(opts = {
  initialEntries: ["/"]
}) {
  const entries = opts.initialEntries;
  let index = opts.initialIndex ?? entries.length - 1;
  let currentState = {
    key: createRandomKey()
  };
  const getLocation = () => parseHref(entries[index], currentState);
  return createHistory({
    getLocation,
    pushState: (path, state) => {
      currentState = state;
      entries.splice;
      if (index < entries.length - 1) {
        entries.splice(index + 1);
      }
      entries.push(path);
      index = Math.max(entries.length - 1, 0);
    },
    replaceState: (path, state) => {
      currentState = state;
      entries[index] = path;
    },
    back: () => {
      currentState = assignKey(currentState);
      index = Math.max(index - 1, 0);
    },
    forward: () => {
      currentState = assignKey(currentState);
      index = Math.min(index + 1, entries.length - 1);
    },
    go: (n) => {
      currentState = assignKey(currentState);
      index = Math.min(Math.max(index + n, 0), entries.length - 1);
    },
    createHref: (path) => path
  });
}
function parseHref(href, state) {
  const hashIndex = href.indexOf("#");
  const searchIndex = href.indexOf("?");
  return {
    href,
    pathname: href.substring(
      0,
      hashIndex > 0 ? searchIndex > 0 ? Math.min(hashIndex, searchIndex) : hashIndex : searchIndex > 0 ? searchIndex : href.length
    ),
    hash: hashIndex > -1 ? href.substring(hashIndex) : "",
    search: searchIndex > -1 ? href.slice(searchIndex, hashIndex === -1 ? void 0 : hashIndex) : "",
    state: state || {}
  };
}
function createRandomKey() {
  return (Math.random() + 1).toString(36).substring(7);
}
export {
  createBrowserHistory,
  createHashHistory,
  createHistory,
  createMemoryHistory,
  parseHref
};
//# sourceMappingURL=index.js.map
