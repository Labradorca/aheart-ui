interface DiagnosticContext {
    parse(code: string): unknown;
    warn(message: string, position?: number): void;
}
/** Vite development import diagnostics; component/Plugin objects stay untouched. */
export declare function AheartV2DeprecationDiagnostics(): {
    name: string;
    enforce: "post";
    apply(_config: unknown, environment: {
        command: string;
        mode: string;
    }): boolean;
    buildStart(): void;
    transform(this: DiagnosticContext, code: string, id: string): null;
};
export {};
