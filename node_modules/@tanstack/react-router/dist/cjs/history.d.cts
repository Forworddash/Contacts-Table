declare module '@tanstack/history' {
    interface HistoryState {
        __tempLocation?: HistoryLocation;
        __tempKey?: string;
    }
}
export {};
