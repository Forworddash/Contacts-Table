import { AnyRouter, RegisteredRouter, RouterState } from './router.cjs';
export declare function useLocation<TRouter extends AnyRouter = RegisteredRouter, TLocationState = RouterState<TRouter['routeTree']>['location'], TSelected = TLocationState>(opts?: {
    select?: (state: TLocationState) => TSelected;
}): TSelected;
