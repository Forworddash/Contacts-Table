import { RegisteredRouter } from './router.js';
import { AnyRoute } from './route.js';
import { MakeRouteMatch } from './Matches.js';
import { RouteIds } from './routeInfo.js';
import { Constrain, StrictOrFrom } from './utils.js';
export declare function useLoaderDeps<TRouteTree extends AnyRoute = RegisteredRouter['routeTree'], TFrom extends string | undefined = undefined, TRouteMatch extends MakeRouteMatch<TRouteTree, TFrom> = MakeRouteMatch<TRouteTree, TFrom>, TSelected = Required<TRouteMatch>['loaderDeps']>(opts: StrictOrFrom<Constrain<TFrom, RouteIds<TRouteTree>>> & {
    select?: (match: TRouteMatch) => TSelected;
}): TSelected;
