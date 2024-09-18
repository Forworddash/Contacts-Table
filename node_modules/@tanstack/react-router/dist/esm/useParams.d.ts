import { AnyRoute } from './route.js';
import { AllParams, RouteById, RouteIds } from './routeInfo.js';
import { RegisteredRouter } from './router.js';
import { Constrain, StrictOrFrom } from './utils.js';
export type UseParamsOptions<TFrom, TStrict extends boolean, TParams, TSelected> = StrictOrFrom<TFrom, TStrict> & {
    select?: (params: TParams) => TSelected;
};
export declare function useParams<TRouteTree extends AnyRoute = RegisteredRouter['routeTree'], TFrom extends string | undefined = undefined, TStrict extends boolean = true, TParams = TStrict extends false ? AllParams<TRouteTree> : RouteById<TRouteTree, TFrom>['types']['allParams'], TSelected = TParams>(opts: UseParamsOptions<Constrain<TFrom, RouteIds<TRouteTree>>, TStrict, TParams, TSelected>): TSelected;
