/**
 * Library options.
 */
export interface Options {
    /**
     * Path to the project Directory.
     * @default './src/'
     */
    path: string

    /**
     * Prefix Symbol for the Aliases
     * @default '@'
     */
    prefix: string

    /**
     * Root path of Vite project.
     * @default 'process.cwd()'
     */
    root: string
}
