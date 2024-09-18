import { RegisteredRouter } from './router.js';
import { AnyRoute } from './route.js';
import { MakeRouteMatch } from './Matches.js';
import { RouteIds } from './routeInfo.js';
import { Constrain, StrictOrFrom } from './utils.js';
export type UseMatchOptions<TFrom, TStrict extends boolean, TRouteMatch, TSelected, TThrow extends boolean> = StrictOrFrom<TFrom, TStrict> & {
    select?: (match: TRouteMatch) => TSelected;
    shouldThrow?: TThrow;
};
export declare function useMatch<TRouteTree extends AnyRoute = RegisteredRouter['routeTree'], TFrom extends string | undefined = undefined, TStrict extends boolean = true, TRouteMatch = MakeRouteMatch<TRouteTree, TFrom, TStrict>, TSelected = TRouteMatch, TThrow extends boolean = true>(opts: UseMatchOptions<Constrain<TFrom, RouteIds<TRouteTree>>, TStrict, TRouteMatch, TSelected, TThrow>): TThrow extends true ? TSelected : TSelected | undefined;
