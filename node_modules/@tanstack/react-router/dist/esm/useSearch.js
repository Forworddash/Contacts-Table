import { useMatch } from "./useMatch.js";
function useSearch(opts) {
  return useMatch({
    ...opts,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}
export {
  useSearch
};
//# sourceMappingURL=useSearch.js.map
