import { AnyRoute } from './route.cjs';
import { AllContext, RouteById, RouteIds } from './routeInfo.cjs';
import { RegisteredRouter } from './router.cjs';
import { Constrain, Expand, StrictOrFrom } from './utils.cjs';
export type UseRouteContextOptions<TFrom, TStrict extends boolean, TRouteContext, TSelected> = StrictOrFrom<TFrom, TStrict> & {
    select?: (search: TRouteContext) => TSelected;
};
export declare function useRouteContext<TRouteTree extends AnyRoute = RegisteredRouter['routeTree'], TFrom extends string | undefined = undefined, TStrict extends boolean = true, TRouteContext = TStrict extends false ? AllContext<TRouteTree> : Expand<RouteById<TRouteTree, TFrom>['types']['allContext']>, TSelected = TRouteContext>(opts: UseRouteContextOptions<Constrain<TFrom, RouteIds<TRouteTree>>, TStrict, TRouteContext, TSelected>): TSelected;
