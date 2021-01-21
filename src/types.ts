/**
 * Library options.
 */
export interface Options {
    /**
     * Path to the project Directory
     * @default './src/'
     */
    path: string

    /**
     * Prefix Symbol for the Aliases
     * @default '@'
     */
    prefix: string

    /**
     * Add a Leading Slash
     * This makes it look more similiar to Vite 1
     * @default false
     */

    addLeadingSlash: boolean

    /**
     * Allow global project Directory alias
     * @default true
     */
    allowGlobalAlias: boolean

    /**
     * Root path of Vite project
     * @default 'process.cwd()'
     */
    root: string
}
