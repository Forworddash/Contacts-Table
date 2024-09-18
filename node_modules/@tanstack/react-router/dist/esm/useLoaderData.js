import { useMatch } from "./useMatch.js";
function useLoaderData(opts) {
  return useMatch({
    ...opts,
    select: (s) => {
      return typeof opts.select === "function" ? opts.select(s.loaderData) : s.loaderData;
    }
  });
}
export {
  useLoaderData
};
//# sourceMappingURL=useLoaderData.js.map
