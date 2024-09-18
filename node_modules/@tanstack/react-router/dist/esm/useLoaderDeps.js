import { useMatch } from "./useMatch.js";
function useLoaderDeps(opts) {
  return useMatch({
    ...opts,
    select: (s) => {
      return typeof opts.select === "function" ? opts.select(s.loaderDeps) : s.loaderDeps;
    }
  });
}
export {
  useLoaderDeps
};
//# sourceMappingURL=useLoaderDeps.js.map
