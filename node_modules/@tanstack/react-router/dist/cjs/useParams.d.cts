import { AnyRoute } from './route.cjs';
import { AllParams, RouteById, RouteIds } from './routeInfo.cjs';
import { RegisteredRouter } from './router.cjs';
import { Constrain, StrictOrFrom } from './utils.cjs';
export type UseParamsOptions<TFrom, TStrict extends boolean, TParams, TSelected> = StrictOrFrom<TFrom, TStrict> & {
    select?: (params: TParams) => TSelected;
};
export declare function useParams<TRouteTree extends AnyRoute = RegisteredRouter['routeTree'], TFrom extends string | undefined = undefined, TStrict extends boolean = true, TParams = TStrict extends false ? AllParams<TRouteTree> : RouteById<TRouteTree, TFrom>['types']['allParams'], TSelected = TParams>(opts: UseParamsOptions<Constrain<TFrom, RouteIds<TRouteTree>>, TStrict, TParams, TSelected>): TSelected;
