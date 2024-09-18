import { useMatch } from "./useMatch.js";
function useParams(opts) {
  return useMatch({
    ...opts,
    select: (match) => {
      return opts.select ? opts.select(match.params) : match.params;
    }
  });
}
export {
  useParams
};
//# sourceMappingURL=useParams.js.map
