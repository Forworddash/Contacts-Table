import { BlockerFn } from '@tanstack/history';
import { ReactNode } from './route.cjs';
type BlockerResolver = {
    status: 'idle' | 'blocked';
    proceed: () => void;
    reset: () => void;
};
type BlockerOpts = {
    blockerFn?: BlockerFn;
    condition?: boolean | any;
};
export declare function useBlocker(blockerFnOrOpts?: BlockerOpts): BlockerResolver;
/**
 * @deprecated Use the BlockerOpts object syntax instead
 */
export declare function useBlocker(blockerFn?: BlockerFn, condition?: boolean | any): BlockerResolver;
export declare function Block({ blockerFn, condition, children }: PromptProps): any;
export type PromptProps = {
    blockerFn?: BlockerFn;
    condition?: boolean | any;
    children?: ReactNode | (({ proceed, reset }: BlockerResolver) => ReactNode);
};
export {};
