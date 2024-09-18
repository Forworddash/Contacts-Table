import { RegisteredRouter } from './router.js';
import { AnyRoute } from './route.js';
import { MakeRouteMatch } from './Matches.js';
import { RouteIds } from './routeInfo.js';
import { Constrain, StrictOrFrom } from './utils.js';
export type UseLoaderDataOptions<TRouteTree extends AnyRoute, TFrom, TStrict extends boolean, TRouteMatch extends MakeRouteMatch<TRouteTree, TFrom, TStrict>, TSelected> = StrictOrFrom<Constrain<TFrom, RouteIds<TRouteTree>>, TStrict> & {
    select?: (match: Required<TRouteMatch>['loaderData']) => TSelected;
};
export declare function useLoaderData<TRouteTree extends AnyRoute = RegisteredRouter['routeTree'], TFrom extends string | undefined = undefined, TStrict extends boolean = true, TRouteMatch extends MakeRouteMatch<TRouteTree, TFrom, TStrict> = MakeRouteMatch<TRouteTree, TFrom, TStrict>, TSelected = Required<TRouteMatch>['loaderData']>(opts: UseLoaderDataOptions<TRouteTree, TFrom, TStrict, TRouteMatch, TSelected>): TSelected;
