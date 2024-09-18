import { RegisteredRouter } from './router.cjs';
import { AnyRoute } from './route.cjs';
import { MakeRouteMatch } from './Matches.cjs';
import { RouteIds } from './routeInfo.cjs';
import { Constrain, StrictOrFrom } from './utils.cjs';
export type UseMatchOptions<TFrom, TStrict extends boolean, TRouteMatch, TSelected, TThrow extends boolean> = StrictOrFrom<TFrom, TStrict> & {
    select?: (match: TRouteMatch) => TSelected;
    shouldThrow?: TThrow;
};
export declare function useMatch<TRouteTree extends AnyRoute = RegisteredRouter['routeTree'], TFrom extends string | undefined = undefined, TStrict extends boolean = true, TRouteMatch = MakeRouteMatch<TRouteTree, TFrom, TStrict>, TSelected = TRouteMatch, TThrow extends boolean = true>(opts: UseMatchOptions<Constrain<TFrom, RouteIds<TRouteTree>>, TStrict, TRouteMatch, TSelected, TThrow>): TThrow extends true ? TSelected : TSelected | undefined;
