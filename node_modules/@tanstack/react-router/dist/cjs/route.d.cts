import { RootRouteId } from './root.cjs';
import { UseNavigateResult } from './useNavigate.cjs';
import { MakeRouteMatch, MakeRouteMatchUnion, RouteMatch } from './Matches.cjs';
import { NavigateOptions, ParsePathParams, ToMaskOptions } from './link.cjs';
import { ParsedLocation } from './location.cjs';
import { RouteById, RouteIds, RoutePaths } from './routeInfo.cjs';
import { AnyRouter, RegisteredRouter, Router } from './router.cjs';
import { Assign, Constrain, Expand, NoInfer } from './utils.cjs';
import { BuildLocationFn, NavigateFn } from './RouterProvider.cjs';
import { NotFoundError } from './not-found.cjs';
import { LazyRoute } from './fileRoute.cjs';
import type * as React from 'react';
export type AnyPathParams = {};
export type SearchSchemaInput = {
    __TSearchSchemaInput__: 'TSearchSchemaInput';
};
export type AnySearchSchema = {};
export type AnyContext = {};
export interface RouteContext {
}
export type PreloadableObj = {
    preload?: () => Promise<void>;
};
export type RoutePathOptions<TCustomId, TPath> = {
    path: TPath;
} | {
    id: TCustomId;
};
export interface StaticDataRouteOption {
}
export type RoutePathOptionsIntersection<TCustomId, TPath> = {
    path: TPath;
    id: TCustomId;
};
export type RouteOptions<TParentRoute extends AnyRoute = AnyRoute, TCustomId extends string = string, TFullPath extends string = string, TPath extends string = string, TSearchValidator = undefined, TParams = AnyPathParams, TLoaderDeps extends Record<string, any> = {}, TLoaderFn = undefined, TRouterContext = {}, TRouteContextFn = AnyContext, TBeforeLoadFn = AnyContext> = BaseRouteOptions<TParentRoute, TCustomId, TPath, TSearchValidator, TParams, TLoaderDeps, TLoaderFn, TRouterContext, TRouteContextFn, TBeforeLoadFn> & UpdatableRouteOptions<NoInfer<TParentRoute>, NoInfer<TCustomId>, NoInfer<TFullPath>, NoInfer<TParams>, NoInfer<TSearchValidator>, NoInfer<TLoaderFn>, NoInfer<TLoaderDeps>, NoInfer<TRouterContext>, NoInfer<TRouteContextFn>, NoInfer<TBeforeLoadFn>>;
export type ParseSplatParams<TPath extends string> = TPath extends `${string}$` ? '_splat' : TPath extends `${string}$/${string}` ? '_splat' : never;
export interface SplatParams {
    _splat?: string;
}
export type ResolveParams<TPath extends string> = ParseSplatParams<TPath> extends never ? Record<ParsePathParams<TPath>, string> : Record<ParsePathParams<TPath>, string> & SplatParams;
export type ParseParamsFn<TPath extends string, TParams> = (rawParams: ResolveParams<TPath>) => TParams extends Record<ParsePathParams<TPath>, any> ? TParams : Record<ParsePathParams<TPath>, any>;
export type StringifyParamsFn<TPath extends string, TParams> = (params: TParams) => ResolveParams<TPath>;
export type ParamsOptions<TPath extends string, TParams> = {
    params?: {
        parse: ParseParamsFn<TPath, TParams>;
        stringify: StringifyParamsFn<TPath, TParams>;
    };
    /**
    @deprecated Use params.parse instead
    */
    parseParams?: ParseParamsFn<TPath, TParams>;
    /**
    @deprecated Use params.stringify instead
    */
    stringifyParams?: StringifyParamsFn<TPath, TParams>;
};
export interface FullSearchSchemaOption<in out TParentRoute extends AnyRoute, in out TSearchValidator> {
    search: Expand<ResolveFullSearchSchema<TParentRoute, TSearchValidator>>;
}
export type RouteContextFn<in out TParentRoute extends AnyRoute, in out TSearchValidator, in out TParams, in out TRouterContext> = (ctx: RouteContextOptions<TParentRoute, TSearchValidator, TParams, TRouterContext>) => any;
export type BeforeLoadFn<in out TParentRoute extends AnyRoute, in out TSearchValidator, in out TParams, in out TRouterContext, in out TRouteContextFn> = (ctx: BeforeLoadContextOptions<TParentRoute, TSearchValidator, TParams, TRouterContext, TRouteContextFn>) => any;
export type FileBaseRouteOptions<TParentRoute extends AnyRoute = AnyRoute, TPath extends string = string, TSearchValidator = undefined, TParams = {}, TLoaderDeps extends Record<string, any> = {}, TLoaderFn = undefined, TRouterContext = {}, TRouteContextFn = AnyContext, TBeforeLoadFn = AnyContext> = ParamsOptions<TPath, TParams> & {
    validateSearch?: Constrain<TSearchValidator, AnySearchValidator, DefaultSearchValidator>;
    shouldReload?: boolean | ((match: LoaderFnContext<TParentRoute, TParams, TLoaderDeps, TRouterContext, TRouteContextFn, TBeforeLoadFn>) => any);
    context?: Constrain<TRouteContextFn, (ctx: RouteContextOptions<TParentRoute, TSearchValidator, TParams, TRouterContext>) => any>;
    beforeLoad?: Constrain<TBeforeLoadFn, (ctx: BeforeLoadContextOptions<TParentRoute, TSearchValidator, TParams, TRouterContext, TRouteContextFn>) => any>;
    loaderDeps?: (opts: FullSearchSchemaOption<TParentRoute, TSearchValidator>) => TLoaderDeps;
    loader?: Constrain<TLoaderFn, (ctx: LoaderFnContext<TParentRoute, TParams, TLoaderDeps, TRouterContext, TRouteContextFn, TBeforeLoadFn>) => any>;
};
export type BaseRouteOptions<TParentRoute extends AnyRoute = AnyRoute, TCustomId extends string = string, TPath extends string = string, TSearchValidator = undefined, TParams = {}, TLoaderDeps extends Record<string, any> = {}, TLoaderFn = undefined, TRouterContext = {}, TRouteContextFn = AnyContext, TBeforeLoadFn = AnyContext> = RoutePathOptions<TCustomId, TPath> & FileBaseRouteOptions<TParentRoute, TPath, TSearchValidator, TParams, TLoaderDeps, TLoaderFn, TRouterContext, TRouteContextFn, TBeforeLoadFn> & {
    getParentRoute: () => TParentRoute;
};
export interface ContextOptions<in out TParentRoute extends AnyRoute, in out TSearchValidator, in out TParams> extends FullSearchSchemaOption<TParentRoute, TSearchValidator> {
    abortController: AbortController;
    preload: boolean;
    params: Expand<ResolveAllParamsFromParent<TParentRoute, TParams>>;
    location: ParsedLocation;
    /**
     * @deprecated Use `throw redirect({ to: '/somewhere' })` instead
     **/
    navigate: NavigateFn;
    buildLocation: BuildLocationFn;
    cause: 'preload' | 'enter' | 'stay';
    matches: Array<MakeRouteMatchUnion>;
}
export interface RouteContextOptions<in out TParentRoute extends AnyRoute, in out TSearchValidator, in out TParams, in out TRouterContext> extends ContextOptions<TParentRoute, TSearchValidator, TParams> {
    context: Expand<RouteContextParameter<TParentRoute, TRouterContext>>;
}
export interface BeforeLoadContextOptions<in out TParentRoute extends AnyRoute, in out TSearchValidator, in out TParams, in out TRouterContext, in out TRouteContextFn> extends ContextOptions<TParentRoute, TSearchValidator, TParams> {
    context: Expand<BeforeLoadContextParameter<TParentRoute, TRouterContext, TRouteContextFn>>;
}
export interface UpdatableRouteOptions<in out TParentRoute extends AnyRoute, in out TRouteId, in out TFullPath, in out TParams, in out TSearchValidator, in out TLoaderFn, in out TLoaderDeps, in out TRouterContext, in out TRouteContextFn, in out TBeforeLoadFn> extends UpdatableStaticRouteOption {
    caseSensitive?: boolean;
    wrapInSuspense?: boolean;
    component?: RouteComponent;
    errorComponent?: false | null | ErrorRouteComponent;
    notFoundComponent?: NotFoundRouteComponent;
    pendingComponent?: RouteComponent;
    pendingMs?: number;
    pendingMinMs?: number;
    staleTime?: number;
    gcTime?: number;
    preload?: boolean;
    preloadStaleTime?: number;
    preloadGcTime?: number;
    preSearchFilters?: Array<SearchFilter<ResolveFullSearchSchema<TParentRoute, TSearchValidator>>>;
    postSearchFilters?: Array<SearchFilter<ResolveFullSearchSchema<TParentRoute, TSearchValidator>>>;
    onCatch?: (error: Error, errorInfo: React.ErrorInfo) => void;
    onError?: (err: any) => void;
    onEnter?: (match: RouteMatch<TRouteId, TFullPath, ResolveAllParamsFromParent<TParentRoute, TParams>, ResolveFullSearchSchema<TParentRoute, TSearchValidator>, ResolveLoaderData<TLoaderFn>, ResolveAllContext<TParentRoute, TRouterContext, TRouteContextFn, TBeforeLoadFn>, TLoaderDeps>) => void;
    onStay?: (match: RouteMatch<TRouteId, TFullPath, ResolveAllParamsFromParent<TParentRoute, TParams>, ResolveFullSearchSchema<TParentRoute, TSearchValidator>, ResolveLoaderData<TLoaderFn>, ResolveAllContext<TParentRoute, TRouterContext, TRouteContextFn, TBeforeLoadFn>, TLoaderDeps>) => void;
    onLeave?: (match: RouteMatch<TRouteId, TFullPath, ResolveAllParamsFromParent<TParentRoute, TParams>, ResolveFullSearchSchema<TParentRoute, TSearchValidator>, ResolveLoaderData<TLoaderFn>, ResolveAllContext<TParentRoute, TRouterContext, TRouteContextFn, TBeforeLoadFn>, TLoaderDeps>) => void;
    meta?: (ctx: {
        matches: Array<RouteMatch<TRouteId, TFullPath, ResolveAllParamsFromParent<TParentRoute, TParams>, ResolveFullSearchSchema<TParentRoute, TSearchValidator>, ResolveLoaderData<TLoaderFn>, ResolveAllContext<TParentRoute, TRouterContext, TRouteContextFn, TBeforeLoadFn>, TLoaderDeps>>;
        match: RouteMatch<TRouteId, TFullPath, ResolveAllParamsFromParent<TParentRoute, TParams>, ResolveFullSearchSchema<TParentRoute, TSearchValidator>, ResolveLoaderData<TLoaderFn>, ResolveAllContext<TParentRoute, TRouterContext, TRouteContextFn, TBeforeLoadFn>, TLoaderDeps>;
        params: ResolveAllParamsFromParent<TParentRoute, TParams>;
        loaderData: ResolveLoaderData<TLoaderFn>;
    }) => Array<React.JSX.IntrinsicElements['meta']>;
    links?: () => Array<React.JSX.IntrinsicElements['link']>;
    scripts?: () => Array<React.JSX.IntrinsicElements['script']>;
    headers?: (ctx: {
        loaderData: ResolveLoaderData<TLoaderFn>;
    }) => Record<string, string>;
}
interface RequiredStaticDataRouteOption {
    staticData: StaticDataRouteOption;
}
interface OptionalStaticDataRouteOption {
    staticData?: StaticDataRouteOption;
}
export type UpdatableStaticRouteOption = {} extends StaticDataRouteOption ? OptionalStaticDataRouteOption : RequiredStaticDataRouteOption;
export type MetaDescriptor = {
    charSet: 'utf-8';
} | {
    title: string;
} | {
    name: string;
    content: string;
} | {
    property: string;
    content: string;
} | {
    httpEquiv: string;
    content: string;
} | {
    'script:ld+json': LdJsonObject;
} | {
    tagName: 'meta' | 'link';
    [name: string]: string;
} | Record<string, unknown>;
type LdJsonObject = {
    [Key in string]: LdJsonValue;
} & {
    [Key in string]?: LdJsonValue | undefined;
};
type LdJsonArray = Array<LdJsonValue> | ReadonlyArray<LdJsonValue>;
type LdJsonPrimitive = string | number | boolean | null;
type LdJsonValue = LdJsonPrimitive | LdJsonObject | LdJsonArray;
export type RouteLinkEntry = {};
export interface SearchValidatorObj<TInput, TOutput> {
    parse: SearchValidatorFn<TInput, TOutput>;
}
export type AnySearchValidatorObj = SearchValidatorObj<any, any>;
export interface SearchValidatorAdapter<TInput, TOutput> {
    types: {
        input: TInput;
        output: TOutput;
    };
    parse: (input: unknown) => TOutput;
}
export type AnySearchValidatorAdapter = SearchValidatorAdapter<any, any>;
export type AnySearchValidatorFn = SearchValidatorFn<any, any>;
export type SearchValidatorFn<TInput, TOutput> = (input: TInput) => TOutput;
export type SearchValidator<TInput, TOutput> = SearchValidatorObj<TInput, TOutput> | SearchValidatorFn<TInput, TOutput> | SearchValidatorAdapter<TInput, TOutput> | undefined;
export type AnySearchValidator = SearchValidator<any, any>;
export type DefaultSearchValidator = SearchValidator<Record<string, unknown>, AnySearchSchema>;
export type RouteLoaderFn<in out TParentRoute extends AnyRoute = AnyRoute, in out TParams = {}, in out TLoaderDeps = {}, in out TRouterContext = {}, in out TRouteContextFn = AnyContext, in out TBeforeLoadFn = AnyContext> = (match: LoaderFnContext<TParentRoute, TParams, TLoaderDeps, TRouterContext, TRouteContextFn, TBeforeLoadFn>) => any;
export interface LoaderFnContext<in out TParentRoute extends AnyRoute = AnyRoute, in out TParams = {}, in out TLoaderDeps = {}, in out TRouterContext = {}, in out TRouteContextFn = AnyContext, in out TBeforeLoadFn = AnyContext> {
    abortController: AbortController;
    preload: boolean;
    params: Expand<ResolveAllParamsFromParent<TParentRoute, TParams>>;
    deps: TLoaderDeps;
    context: Expand<ResolveAllContext<TParentRoute, TRouterContext, TRouteContextFn, TBeforeLoadFn>>;
    location: ParsedLocation;
    /**
     * @deprecated Use `throw redirect({ to: '/somewhere' })` instead
     **/
    navigate: (opts: NavigateOptions<AnyRouter>) => Promise<void>;
    parentMatchPromise?: Promise<void>;
    cause: 'preload' | 'enter' | 'stay';
    route: Route;
}
export type SearchFilter<TInput, TResult = TInput> = (prev: TInput) => TResult;
export type ResolveId<TParentRoute, TCustomId extends string, TPath extends string> = TParentRoute extends {
    id: infer TParentId extends string;
} ? RoutePrefix<TParentId, string extends TCustomId ? TPath : TCustomId> : RootRouteId;
export type InferFullSearchSchema<TRoute> = TRoute extends {
    types: {
        fullSearchSchema: infer TFullSearchSchema;
    };
} ? TFullSearchSchema : {};
export type InferFullSearchSchemaInput<TRoute> = TRoute extends {
    types: {
        fullSearchSchemaInput: infer TFullSearchSchemaInput;
    };
} ? TFullSearchSchemaInput : {};
export type InferAllParams<TRoute> = TRoute extends {
    types: {
        allParams: infer TAllParams;
    };
} ? TAllParams : {};
export type InferAllContext<TRoute> = unknown extends TRoute ? TRoute : TRoute extends {
    types: {
        allContext: infer TAllContext;
    };
} ? TAllContext : {};
export type ResolveSearchSchemaFnInput<TSearchValidator> = TSearchValidator extends (input: infer TSearchSchemaInput) => any ? TSearchSchemaInput extends SearchSchemaInput ? Omit<TSearchSchemaInput, keyof SearchSchemaInput> : ResolveSearchSchemaFn<TSearchValidator> : AnySearchSchema;
export type ResolveSearchSchemaInput<TSearchValidator> = TSearchValidator extends AnySearchValidatorAdapter ? TSearchValidator['types']['input'] : TSearchValidator extends AnySearchValidatorObj ? ResolveSearchSchemaFnInput<TSearchValidator['parse']> : ResolveSearchSchemaFnInput<TSearchValidator>;
export type ResolveSearchSchemaFn<TSearchValidator> = TSearchValidator extends (...args: any) => infer TSearchSchema ? TSearchSchema : AnySearchSchema;
export type ResolveSearchSchema<TSearchValidator> = unknown extends TSearchValidator ? TSearchValidator : TSearchValidator extends AnySearchValidatorAdapter ? TSearchValidator['types']['output'] : TSearchValidator extends AnySearchValidatorObj ? ResolveSearchSchemaFn<TSearchValidator['parse']> : ResolveSearchSchemaFn<TSearchValidator>;
export type ResolveFullSearchSchema<TParentRoute extends AnyRoute, TSearchValidator> = unknown extends TParentRoute ? ResolveSearchSchema<TSearchValidator> : Assign<InferFullSearchSchema<TParentRoute>, ResolveSearchSchema<TSearchValidator>>;
export type ResolveFullSearchSchemaInput<TParentRoute extends AnyRoute, TSearchValidator> = Assign<InferFullSearchSchemaInput<TParentRoute>, ResolveSearchSchemaInput<TSearchValidator>>;
export type LooseReturnType<T> = T extends (...args: Array<any>) => infer TReturn ? TReturn : never;
export type LooseAsyncReturnType<T> = T extends (...args: Array<any>) => infer TReturn ? TReturn extends Promise<infer TReturn> ? TReturn : TReturn : never;
export type ContextReturnType<TContextFn> = unknown extends TContextFn ? TContextFn : LooseReturnType<TContextFn> extends never ? AnyContext : LooseReturnType<TContextFn>;
export type ContextAsyncReturnType<TContextFn> = unknown extends TContextFn ? TContextFn : LooseAsyncReturnType<TContextFn> extends never ? AnyContext : LooseAsyncReturnType<TContextFn>;
export type RouteContextParameter<TParentRoute extends AnyRoute, TRouterContext> = unknown extends TParentRoute ? TRouterContext : Assign<TRouterContext, InferAllContext<TParentRoute>>;
export type ResolveRouteContext<TRouteContextFn, TBeforeLoadFn> = Assign<ContextReturnType<TRouteContextFn>, ContextAsyncReturnType<TBeforeLoadFn>>;
export type BeforeLoadContextParameter<TParentRoute extends AnyRoute, TRouterContext, TRouteContextFn> = Assign<RouteContextParameter<TParentRoute, TRouterContext>, ContextReturnType<TRouteContextFn>>;
export type ResolveAllContext<TParentRoute extends AnyRoute, TRouterContext, TRouteContextFn, TBeforeLoadFn> = Assign<BeforeLoadContextParameter<TParentRoute, TRouterContext, TRouteContextFn>, ContextAsyncReturnType<TBeforeLoadFn>>;
export type ResolveLoaderData<TLoaderFn> = unknown extends TLoaderFn ? TLoaderFn : LooseAsyncReturnType<TLoaderFn> extends never ? {} : LooseAsyncReturnType<TLoaderFn>;
export interface AnyRoute extends Route<any, any, any, any, any, any, any, any, any, any, any, any, any> {
}
export type AnyRouteWithContext<TContext> = AnyRoute & {
    types: {
        allContext: TContext;
    };
};
export type ResolveAllParamsFromParent<TParentRoute extends AnyRoute, TParams> = Assign<InferAllParams<TParentRoute>, TParams>;
export type RouteConstraints = {
    TParentRoute: AnyRoute;
    TPath: string;
    TFullPath: string;
    TCustomId: string;
    TId: string;
    TSearchSchema: AnySearchSchema;
    TFullSearchSchema: AnySearchSchema;
    TParams: Record<string, any>;
    TAllParams: Record<string, any>;
    TParentContext: AnyContext;
    TRouteContext: RouteContext;
    TAllContext: AnyContext;
    TRouterContext: AnyContext;
    TChildren: unknown;
    TRouteTree: AnyRoute;
};
export declare function getRouteApi<TId extends RouteIds<RegisteredRouter['routeTree']>, TRouter extends AnyRouter = RegisteredRouter, TRoute extends AnyRoute = RouteById<TRouter['routeTree'], TId>, TFullSearchSchema = TRoute['types']['fullSearchSchema'], TAllParams = TRoute['types']['allParams'], TAllContext = TRoute['types']['allContext'], TLoaderDeps = TRoute['types']['loaderDeps'], TLoaderData = TRoute['types']['loaderData']>(id: TId): RouteApi<TId, TRouter, TRoute, TFullSearchSchema, TAllParams, TAllContext, TLoaderDeps, TLoaderData>;
export declare class RouteApi<TId extends RouteIds<RegisteredRouter['routeTree']>, TRouter extends AnyRouter = RegisteredRouter, TRoute extends AnyRoute = RouteById<TRouter['routeTree'], TId>, TFullSearchSchema = TRoute['types']['fullSearchSchema'], TAllParams = TRoute['types']['allParams'], TAllContext = TRoute['types']['allContext'], TLoaderDeps = TRoute['types']['loaderDeps'], TLoaderData = TRoute['types']['loaderData']> {
    id: TId;
    /**
     * @deprecated Use the `getRouteApi` function instead.
     */
    constructor({ id }: {
        id: TId;
    });
    useMatch: <TRouteTree extends AnyRoute = TRouter["routeTree"], TRouteMatch = MakeRouteMatch<TRouteTree, TId>, TSelected = TRouteMatch>(opts?: {
        select?: (match: TRouteMatch) => TSelected;
    }) => TSelected;
    useRouteContext: <TSelected = Expand<TAllContext>>(opts?: {
        select?: (s: Expand<TAllContext>) => TSelected;
    }) => TSelected;
    useSearch: <TSelected = Expand<TFullSearchSchema>>(opts?: {
        select?: (s: Expand<TFullSearchSchema>) => TSelected;
    }) => TSelected;
    useParams: <TSelected = Expand<TAllParams>>(opts?: {
        select?: (s: Expand<TAllParams>) => TSelected;
    }) => TSelected;
    useLoaderDeps: <TSelected = TLoaderDeps>(opts?: {
        select?: (s: TLoaderDeps) => TSelected;
    }) => TSelected;
    useLoaderData: <TSelected = TLoaderData>(opts?: {
        select?: (s: TLoaderData) => TSelected;
    }) => TSelected;
    useNavigate: () => UseNavigateResult<TRoute["fullPath"]>;
    notFound: (opts?: NotFoundError) => NotFoundError;
}
export declare class Route<in out TParentRoute extends RouteConstraints['TParentRoute'] = AnyRoute, in out TPath extends RouteConstraints['TPath'] = '/', in out TFullPath extends RouteConstraints['TFullPath'] = ResolveFullPath<TParentRoute, TPath>, in out TCustomId extends RouteConstraints['TCustomId'] = string, in out TId extends RouteConstraints['TId'] = ResolveId<TParentRoute, TCustomId, TPath>, in out TSearchValidator = undefined, in out TParams = ResolveParams<TPath>, in out TRouterContext = AnyContext, in out TRouteContextFn = AnyContext, in out TBeforeLoadFn = AnyContext, in out TLoaderDeps extends Record<string, any> = {}, in out TLoaderFn = undefined, in out TChildren = unknown> {
    isRoot: TParentRoute extends Route<any> ? true : false;
    options: RouteOptions<TParentRoute, TCustomId, TFullPath, TPath, TSearchValidator, TParams, TLoaderDeps, TLoaderFn, TRouterContext, TRouteContextFn, TBeforeLoadFn>;
    parentRoute: TParentRoute;
    private _id;
    private _path;
    private _fullPath;
    private _to;
    get to(): TrimPathRight<TFullPath>;
    get id(): TId;
    get path(): TPath;
    get fullPath(): TFullPath;
    children?: TChildren;
    originalIndex?: number;
    router?: AnyRouter;
    rank: number;
    lazyFn?: () => Promise<LazyRoute<any>>;
    _lazyPromise?: Promise<void>;
    /**
     * @deprecated Use the `createRoute` function instead.
     */
    constructor(options?: RouteOptions<TParentRoute, TCustomId, TFullPath, TPath, TSearchValidator, TParams, TLoaderDeps, TLoaderFn, TRouterContext, TRouteContextFn, TBeforeLoadFn>);
    types: {
        parentRoute: TParentRoute;
        path: TPath;
        to: TrimPathRight<TFullPath>;
        fullPath: TFullPath;
        customId: TCustomId;
        id: TId;
        searchSchema: ResolveSearchSchema<TSearchValidator>;
        searchSchemaInput: ResolveSearchSchemaInput<TSearchValidator>;
        searchValidator: TSearchValidator;
        fullSearchSchema: ResolveFullSearchSchema<TParentRoute, TSearchValidator>;
        fullSearchSchemaInput: ResolveFullSearchSchemaInput<TParentRoute, TSearchValidator>;
        params: TParams;
        allParams: ResolveAllParamsFromParent<TParentRoute, TParams>;
        routerContext: TRouterContext;
        routeContext: ResolveRouteContext<TRouteContextFn, TBeforeLoadFn>;
        routeContextFn: TRouteContextFn;
        beforeLoadFn: TBeforeLoadFn;
        allContext: ResolveAllContext<TParentRoute, TRouterContext, TRouteContextFn, TBeforeLoadFn>;
        children: TChildren;
        loaderData: ResolveLoaderData<TLoaderFn>;
        loaderDeps: TLoaderDeps;
    };
    init: (opts: {
        originalIndex: number;
    }) => void;
    addChildren<const TNewChildren extends Record<string, AnyRoute> | ReadonlyArray<AnyRoute>>(children: TNewChildren): Route<TParentRoute, TPath, TFullPath, TCustomId, TId, TSearchValidator, TParams, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TNewChildren>;
    _addFileChildren<const TNewChildren>(children: TNewChildren): Route<TParentRoute, TPath, TFullPath, TCustomId, TId, TSearchValidator, TParams, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TNewChildren>;
    updateLoader: <TNewLoaderFn>(options: {
        loader: Constrain<TNewLoaderFn, RouteLoaderFn<TParentRoute, TParams, TLoaderDeps, TRouterContext, TRouteContextFn, TBeforeLoadFn>>;
    }) => Route<TParentRoute, TPath, TFullPath, TCustomId, TId, TSearchValidator, TParams, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TNewLoaderFn, TChildren>;
    update: (options: UpdatableRouteOptions<TParentRoute, TCustomId, TFullPath, TParams, TSearchValidator, TLoaderFn, TLoaderDeps, TRouterContext, TRouteContextFn, TBeforeLoadFn>) => this;
    lazy: (lazyFn: () => Promise<LazyRoute<any>>) => this;
    useMatch: <TRouter extends AnyRouter = AnyRouter, TRouteTree extends AnyRoute = TRouter["routeTree"], TRouteMatch = MakeRouteMatch<TRouteTree, TId>, TSelected = TRouteMatch>(opts?: {
        select?: (match: TRouteMatch) => TSelected;
    }) => TSelected;
    useRouteContext: <TSelected = Expand<Assign<Assign<RouteContextParameter<TParentRoute, TRouterContext>, ContextReturnType<TRouteContextFn>>, ContextAsyncReturnType<TBeforeLoadFn>>>>(opts?: {
        select?: (search: Expand<ResolveAllContext<TParentRoute, TRouterContext, TRouteContextFn, TBeforeLoadFn>>) => TSelected;
    }) => TSelected;
    useSearch: <TSelected = Expand<ResolveFullSearchSchema<TParentRoute, TSearchValidator>>>(opts?: {
        select?: (search: Expand<ResolveFullSearchSchema<TParentRoute, TSearchValidator>>) => TSelected;
    }) => TSelected;
    useParams: <TSelected = Expand<Assign<InferAllParams<TParentRoute>, TParams>>>(opts?: {
        select?: (search: Expand<ResolveAllParamsFromParent<TParentRoute, TParams>>) => TSelected;
    }) => TSelected;
    useLoaderDeps: <TSelected = TLoaderDeps>(opts?: {
        select?: (s: TLoaderDeps) => TSelected;
    }) => TSelected;
    useLoaderData: <TSelected = ResolveLoaderData<TLoaderFn>>(opts?: {
        select?: (search: ResolveLoaderData<TLoaderFn>) => TSelected;
    }) => TSelected;
    useNavigate: () => UseNavigateResult<TFullPath>;
}
export declare function createRoute<TParentRoute extends RouteConstraints['TParentRoute'] = AnyRoute, TPath extends RouteConstraints['TPath'] = '/', TFullPath extends RouteConstraints['TFullPath'] = ResolveFullPath<TParentRoute, TPath>, TCustomId extends RouteConstraints['TCustomId'] = string, TId extends RouteConstraints['TId'] = ResolveId<TParentRoute, TCustomId, TPath>, TSearchValidator = undefined, TParams = ResolveParams<TPath>, TRouteContextFn = AnyContext, TBeforeLoadFn = AnyContext, TLoaderDeps extends Record<string, any> = {}, TLoaderFn = undefined, TChildren = unknown>(options: RouteOptions<TParentRoute, TCustomId, TFullPath, TPath, TSearchValidator, TParams, TLoaderDeps, TLoaderFn, AnyContext, TRouteContextFn, TBeforeLoadFn>): Route<TParentRoute, TPath, TFullPath, TCustomId, TId, TSearchValidator, TParams, AnyContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TChildren>;
export type AnyRootRoute = RootRoute<any, any, any, any, any, any, any>;
export type RootRouteOptions<TSearchValidator = undefined, TRouterContext = {}, TRouteContextFn = AnyContext, TBeforeLoadFn = AnyContext, TLoaderDeps extends Record<string, any> = {}, TLoaderFn = undefined> = Omit<RouteOptions<any, // TParentRoute
RootRouteId, '', // TCustomId
'', // TPath
TSearchValidator, {}, // TParams
TLoaderDeps, TLoaderFn, TRouterContext, TRouteContextFn, TBeforeLoadFn>, 'path' | 'id' | 'getParentRoute' | 'caseSensitive' | 'parseParams' | 'stringifyParams' | 'params'>;
export declare function createRootRouteWithContext<TRouterContext extends {}>(): <TRouteContextFn = AnyContext, TBeforeLoadFn = AnyContext, TSearchValidator = undefined, TLoaderDeps extends Record<string, any> = {}, TLoaderFn = undefined>(options?: RootRouteOptions<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn>) => RootRoute<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, unknown, unknown>;
/**
 * @deprecated Use the `createRootRouteWithContext` function instead.
 */
export declare const rootRouteWithContext: typeof createRootRouteWithContext;
export declare class RootRoute<in out TSearchValidator = undefined, in out TRouterContext = {}, in out TRouteContextFn = AnyContext, in out TBeforeLoadFn = AnyContext, in out TLoaderDeps extends Record<string, any> = {}, in out TLoaderFn = undefined, in out TChildren = unknown, in out TFileRouteTypes = unknown> extends Route<any, // TParentRoute
'/', // TPath
'/', // TFullPath
string, // TCustomId
RootRouteId, // TId
TSearchValidator, // TSearchValidator
{}, // TParams
TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TChildren> {
    /**
     * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
     */
    constructor(options?: RootRouteOptions<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn>);
    addChildren<const TNewChildren extends Record<string, AnyRoute> | ReadonlyArray<AnyRoute>>(children: TNewChildren): RootRoute<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TNewChildren, TFileRouteTypes>;
    _addFileChildren<const TNewChildren>(children: TNewChildren): RootRoute<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TNewChildren, TFileRouteTypes>;
    _addFileTypes<TFileRouteTypes>(): RootRoute<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TChildren, TFileRouteTypes>;
}
export declare function createRootRoute<TSearchValidator = undefined, TRouterContext = {}, TRouteContextFn = AnyContext, TBeforeLoadFn = AnyContext, TLoaderDeps extends Record<string, any> = {}, TLoaderFn = undefined>(options?: RootRouteOptions<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn>): RootRoute<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, unknown, unknown>;
export type ResolveFullPath<TParentRoute extends AnyRoute, TPath extends string, TPrefixed = RoutePrefix<TParentRoute['fullPath'], TPath>> = TPrefixed extends RootRouteId ? '/' : TPrefixed;
type RoutePrefix<TPrefix extends string, TPath extends string> = string extends TPath ? RootRouteId : TPath extends string ? TPrefix extends RootRouteId ? TPath extends '/' ? '/' : `/${TrimPath<TPath>}` : `${TPrefix}/${TPath}` extends '/' ? '/' : `/${TrimPathLeft<`${TrimPathRight<TPrefix>}/${TrimPath<TPath>}`>}` : never;
export type TrimPath<T extends string> = '' extends T ? '' : TrimPathRight<TrimPathLeft<T>>;
export type TrimPathLeft<T extends string> = T extends `${RootRouteId}/${infer U}` ? TrimPathLeft<U> : T extends `/${infer U}` ? TrimPathLeft<U> : T;
export type TrimPathRight<T extends string> = T extends '/' ? '/' : T extends `${infer U}/` ? TrimPathRight<U> : T;
export type RouteMask<TRouteTree extends AnyRoute> = {
    routeTree: TRouteTree;
    from: RoutePaths<TRouteTree>;
    to?: any;
    params?: any;
    search?: any;
    hash?: any;
    state?: any;
    unmaskOnReload?: boolean;
};
export declare function createRouteMask<TRouteTree extends AnyRoute, TFrom extends RoutePaths<TRouteTree> | string, TTo extends string>(opts: {
    routeTree: TRouteTree;
} & ToMaskOptions<Router<TRouteTree, 'never'>, TFrom, TTo>): RouteMask<TRouteTree>;
/**
 * @deprecated Use `ErrorComponentProps` instead.
 */
export type ErrorRouteProps = {
    error: unknown;
    info?: {
        componentStack: string;
    };
    reset: () => void;
};
export type ErrorComponentProps = {
    error: Error;
    info?: {
        componentStack: string;
    };
    reset: () => void;
};
export type NotFoundRouteProps = {
    data: unknown;
};
export type ReactNode = any;
export type SyncRouteComponent<TProps> = ((props: TProps) => ReactNode) | React.LazyExoticComponent<(props: TProps) => ReactNode>;
export type AsyncRouteComponent<TProps> = SyncRouteComponent<TProps> & {
    preload?: () => Promise<void>;
};
export type RouteComponent<TProps = any> = AsyncRouteComponent<TProps>;
export type ErrorRouteComponent = RouteComponent<ErrorComponentProps>;
export type NotFoundRouteComponent = SyncRouteComponent<NotFoundRouteProps>;
export declare class NotFoundRoute<TParentRoute extends AnyRootRoute, TRouterContext = AnyContext, TRouteContextFn = AnyContext, TBeforeLoadFn = AnyContext, TSearchValidator = undefined, TLoaderDeps extends Record<string, any> = {}, TLoaderFn = undefined, TChildren = unknown> extends Route<TParentRoute, '/404', '/404', '404', '404', TSearchValidator, {}, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn, TChildren> {
    constructor(options: Omit<RouteOptions<TParentRoute, string, string, string, TSearchValidator, {}, TLoaderDeps, TLoaderFn, TRouterContext, TRouteContextFn, TBeforeLoadFn>, 'caseSensitive' | 'parseParams' | 'stringifyParams' | 'path' | 'id' | 'params'>);
}
export {};
