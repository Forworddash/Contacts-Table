import { RegisteredRouter } from './router.cjs';
import { AnyRoute } from './route.cjs';
import { MakeRouteMatch } from './Matches.cjs';
import { RouteIds } from './routeInfo.cjs';
import { Constrain, StrictOrFrom } from './utils.cjs';
export type UseLoaderDataOptions<TRouteTree extends AnyRoute, TFrom, TStrict extends boolean, TRouteMatch extends MakeRouteMatch<TRouteTree, TFrom, TStrict>, TSelected> = StrictOrFrom<Constrain<TFrom, RouteIds<TRouteTree>>, TStrict> & {
    select?: (match: Required<TRouteMatch>['loaderData']) => TSelected;
};
export declare function useLoaderData<TRouteTree extends AnyRoute = RegisteredRouter['routeTree'], TFrom extends string | undefined = undefined, TStrict extends boolean = true, TRouteMatch extends MakeRouteMatch<TRouteTree, TFrom, TStrict> = MakeRouteMatch<TRouteTree, TFrom, TStrict>, TSelected = Required<TRouteMatch>['loaderData']>(opts: UseLoaderDataOptions<TRouteTree, TFrom, TStrict, TRouteMatch, TSelected>): TSelected;
