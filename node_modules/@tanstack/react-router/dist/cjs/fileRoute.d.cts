import { Constrain } from './utils.cjs';
import { AnyContext, AnyPathParams, AnyRoute, AnySearchValidator, FileBaseRouteOptions, ResolveParams, RootRoute, Route, RouteConstraints, RouteLoaderFn, UpdatableRouteOptions } from './route.cjs';
import { MakeRouteMatch } from './Matches.cjs';
import { RegisteredRouter } from './router.cjs';
import { RouteById, RouteIds } from './routeInfo.cjs';
export interface FileRoutesByPath {
}
export interface FileRouteTypes {
    fileRoutesByFullPath: any;
    fullPaths: any;
    to: any;
    fileRoutesByTo: any;
    id: any;
    fileRoutesById: any;
}
export type InferFileRouteTypes<TRouteTree extends AnyRoute> = TRouteTree extends RootRoute<any, any, any, any, any, any, any, infer TFileRouteTypes extends FileRouteTypes> ? TFileRouteTypes : never;
export declare function createFileRoute<TFilePath extends keyof FileRoutesByPath, TParentRoute extends AnyRoute = FileRoutesByPath[TFilePath]['parentRoute'], TId extends RouteConstraints['TId'] = FileRoutesByPath[TFilePath]['id'], TPath extends RouteConstraints['TPath'] = FileRoutesByPath[TFilePath]['path'], TFullPath extends RouteConstraints['TFullPath'] = FileRoutesByPath[TFilePath]['fullPath']>(path: TFilePath): FileRoute<TFilePath, TParentRoute, TId, TPath, TFullPath>['createRoute'];
/**
  @deprecated It's no longer recommended to use the `FileRoute` class directly.
  Instead, use `createFileRoute('/path/to/file')(options)` to create a file route.
*/
export declare class FileRoute<TFilePath extends keyof FileRoutesByPath, TParentRoute extends AnyRoute = FileRoutesByPath[TFilePath]['parentRoute'], TId extends RouteConstraints['TId'] = FileRoutesByPath[TFilePath]['id'], TPath extends RouteConstraints['TPath'] = FileRoutesByPath[TFilePath]['path'], TFullPath extends RouteConstraints['TFullPath'] = FileRoutesByPath[TFilePath]['fullPath']> {
    path: TFilePath;
    silent?: boolean;
    constructor(path: TFilePath, _opts?: {
        silent: boolean;
    });
    createRoute: <TSearchValidator = undefined, TParams = ResolveParams<TPath>, TRouteContextFn = AnyContext, TBeforeLoadFn = AnyContext, TLoaderDeps extends Record<string, any> = {}, TLoaderFn = undefined, TChildren = unknown>(options?: FileBaseRouteOptions<TParentRoute, TPath, TSearchValidator, TParams, TLoaderDeps, TLoaderFn, AnyContext, TRouteContextFn, TBeforeLoadFn> & UpdatableRouteOptions<TParentRoute, TId, TFullPath, TParams, TSearchValidator, TLoaderFn, TLoaderDeps, AnyContext, TRouteContextFn, TBeforeLoadFn>) => Route<TParentRoute, TPath, TFullPath, TFilePath, TId, TSearchValidator, TParams, AnyContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TChildren>;
}
/**
  @deprecated It's recommended not to split loaders into separate files.
  Instead, place the loader function in the the main route file, inside the
  `createFileRoute('/path/to/file)(options)` options.
*/
export declare function FileRouteLoader<TFilePath extends keyof FileRoutesByPath, TRoute extends FileRoutesByPath[TFilePath]['preLoaderRoute']>(_path: TFilePath): <TLoaderFn>(loaderFn: Constrain<TLoaderFn, RouteLoaderFn<TRoute['parentRoute'], TRoute['types']['params'], TRoute['types']['loaderDeps'], TRoute['types']['routerContext'], TRoute['types']['routeContextFn'], TRoute['types']['beforeLoadFn']>>) => TLoaderFn;
export type LazyRouteOptions = Pick<UpdatableRouteOptions<AnyRoute, string, string, AnyPathParams, AnySearchValidator, {}, AnyContext, AnyContext, AnyContext, AnyContext>, 'component' | 'errorComponent' | 'pendingComponent' | 'notFoundComponent'>;
export declare class LazyRoute<TRoute extends AnyRoute> {
    options: {
        id: string;
    } & LazyRouteOptions;
    constructor(opts: {
        id: string;
    } & LazyRouteOptions);
    useMatch: <TRouteMatch = MakeRouteMatch<any, TRoute["types"]["id"]>, TSelected = TRouteMatch>(opts?: {
        select?: (match: TRouteMatch) => TSelected;
    }) => TSelected;
    useRouteContext: <TSelected = TRoute["types"]["allContext"]>(opts?: {
        select?: (s: TRoute["types"]["allContext"]) => TSelected;
    }) => TSelected;
    useSearch: <TSelected = TRoute["types"]["fullSearchSchema"]>(opts?: {
        select?: (s: TRoute["types"]["fullSearchSchema"]) => TSelected;
    }) => TSelected;
    useParams: <TSelected = TRoute["types"]["allParams"]>(opts?: {
        select?: (s: TRoute["types"]["allParams"]) => TSelected;
    }) => TSelected;
    useLoaderDeps: <TSelected = TRoute["types"]["loaderDeps"]>(opts?: {
        select?: (s: TRoute["types"]["loaderDeps"]) => TSelected;
    }) => TSelected;
    useLoaderData: <TSelected = TRoute["types"]["loaderData"]>(opts?: {
        select?: (s: TRoute["types"]["loaderData"]) => TSelected;
    }) => TSelected;
    useNavigate: () => import('./useNavigate.cjs').UseNavigateResult<string>;
}
export declare function createLazyRoute<TId extends RouteIds<RegisteredRouter['routeTree']>, TRoute extends AnyRoute = RouteById<RegisteredRouter['routeTree'], TId>>(id: TId): (opts: LazyRouteOptions) => LazyRoute<TRoute>;
export declare function createLazyFileRoute<TFilePath extends keyof FileRoutesByPath, TRoute extends FileRoutesByPath[TFilePath]['preLoaderRoute']>(id: TFilePath): (opts: LazyRouteOptions) => LazyRoute<TRoute>;
