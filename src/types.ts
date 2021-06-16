/**
 * Library options.
 */
export interface Options {
	/**
	 * Relative path to the project Directory
	 * @default 'src'
	 */
	dir: string;

	/**
	 * Prefix Symbol for the Aliases
	 * @default '@'
	 */
	prefix: string;

	/**
	 * Allow Searching for Subdirectories
	 * @default true
	 */
	deep: boolean;

	/**
	 * Search Depthlevel for Subdirectories
	 * @default 1
	 */
	depth: number;

	/**
	 * Creates a Logfile in `logs` Folder
	 * Will be relative to project Directory
	 * @default false
	 */
	allowLogging: boolean;

	/**
	 * Allow global project Directory alias
	 * @default true
	 */
	allowGlobalAlias: boolean;

	/**
	 * Turns Duplicates into camelCased Aliases
	 * for more information: checkout example
	 * @default false
	 */
	adjustDuplicates: boolean

	/**
	 * Generates Paths in IDE Config File
	 * Works with JS oder TS
	 * For Typescript: set `useTypescript` true
	 * @default false
	 */
	useConfig: boolean

	/**
	 * Will generate Paths in tsconfig
	 * Used in Combination with `useConfig`
	 * @default false
	 */
	useTypescript: boolean

	/**
	 * Root path of Vite project
	 * @default 'process.cwd()'
	 */
	root: string;
}

export interface Alias {
	find: string
	replacement: string
};

export type ConfigPath = {
	[key: string]: Array<string>
};