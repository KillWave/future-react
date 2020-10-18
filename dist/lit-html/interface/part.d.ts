export interface Part {
    readonly value: unknown;
    /**
     * Sets the current part value, but does not write it to the DOM.
     * @param value The value that will be committed.
     */
    setValue(value: unknown): void;
    /**
     * Commits the current part value, causing it to actually be written to the
     * DOM.
     *
     * Directives are run at the start of `commit`, so that if they call
     * `part.setValue(...)` synchronously that value will be used in the current
     * commit, and there's no need to call `part.commit()` within the directive.
     * If directives set a part value asynchronously, then they must call
     * `part.commit()` manually.
     */
    commit(): void;
}
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
export declare const noChange: {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
export declare const nothing: {};
