export type AnyUpdater = (...args: Array<any>) => any;
export type Listener = () => void;
export interface StoreOptions<TState, TUpdater extends AnyUpdater = (cb: TState) => TState> {
    updateFn?: (previous: TState) => (updater: TUpdater) => TState;
    onSubscribe?: (listener: Listener, store: Store<TState, TUpdater>) => () => void;
    onUpdate?: () => void;
}
export declare class Store<TState, TUpdater extends AnyUpdater = (cb: TState) => TState> {
    listeners: Set<Listener>;
    state: TState;
    options?: StoreOptions<TState, TUpdater>;
    _batching: boolean;
    _flushing: number;
    constructor(initialState: TState, options?: StoreOptions<TState, TUpdater>);
    subscribe: (listener: Listener) => () => void;
    setState: (updater: TUpdater) => void;
    _flush: () => void;
    batch: (cb: () => void) => void;
}
