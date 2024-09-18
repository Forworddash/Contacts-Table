export interface RouterTransformer {
    stringify: (obj: unknown) => string;
    parse: (str: string) => unknown;
}
export declare const defaultTransformer: RouterTransformer;
