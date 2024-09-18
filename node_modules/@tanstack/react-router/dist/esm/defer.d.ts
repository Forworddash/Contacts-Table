import { defaultSerializeError } from './router.js';
export type DeferredPromiseState<T> = {
    uid: string;
    resolve?: () => void;
    reject?: () => void;
} & ({
    status: 'pending';
    data?: T;
    error?: unknown;
} | {
    status: 'success';
    data: T;
} | {
    status: 'error';
    data?: T;
    error: unknown;
});
export type DeferredPromise<T> = Promise<T> & DeferredPromiseState<T>;
export declare function defer<T>(_promise: Promise<T>, options?: {
    serializeError?: typeof defaultSerializeError;
}): DeferredPromise<T>;
