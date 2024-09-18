import { RegisteredRouter } from './router.cjs';
import { AnyRoute } from './route.cjs';
import { MakeRouteMatch } from './Matches.cjs';
import { RouteIds } from './routeInfo.cjs';
import { Constrain, StrictOrFrom } from './utils.cjs';
export declare function useLoaderDeps<TRouteTree extends AnyRoute = RegisteredRouter['routeTree'], TFrom extends string | undefined = undefined, TRouteMatch extends MakeRouteMatch<TRouteTree, TFrom> = MakeRouteMatch<TRouteTree, TFrom>, TSelected = Required<TRouteMatch>['loaderDeps']>(opts: StrictOrFrom<Constrain<TFrom, RouteIds<TRouteTree>>> & {
    select?: (match: TRouteMatch) => TSelected;
}): TSelected;
