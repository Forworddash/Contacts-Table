import { AnyRoute } from './route.js';
import { FullSearchSchema, RouteById, RouteIds } from './routeInfo.js';
import { RegisteredRouter } from './router.js';
import { Constrain, Expand, StrictOrFrom } from './utils.js';
export type UseSearchOptions<TFrom, TStrict extends boolean, TSearch, TSelected> = StrictOrFrom<TFrom, TStrict> & {
    select?: (search: TSearch) => TSelected;
};
export declare function useSearch<TRouteTree extends AnyRoute = RegisteredRouter['routeTree'], TFrom extends string | undefined = undefined, TStrict extends boolean = true, TSearch = TStrict extends false ? FullSearchSchema<TRouteTree> : Expand<RouteById<TRouteTree, TFrom>['types']['fullSearchSchema']>, TSelected = TSearch>(opts: UseSearchOptions<Constrain<TFrom, RouteIds<TRouteTree>>, TStrict, TSearch, TSelected>): TSelected;
