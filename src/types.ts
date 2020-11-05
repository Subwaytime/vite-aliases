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
