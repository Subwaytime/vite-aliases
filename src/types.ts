/**
 * Library options.
 */
export interface Options {
	/**
	 * Relative path to the project directory
	 * @default 'src'
	 */
	dir: string;

	/**
	 * Prefix symbol for the aliases
	 * @default '@'
	 */
	prefix: string;

	/**
	 * Allow searching for subdirectories
	 * @default true
	 */
	deep: boolean;

	/**
	 * Search depthlevel for subdirectories
	 * @default 1
	 */
	depth: number;

	/**
	 * Creates a Logfile
	 * use `logPath` to change the location
	 * @default false
	 */
	createLog: boolean;

	/**
	 * Path for Logfile
	 * @default 'src/logs'
	 */

	logPath: string;

	/**
	 * Create global project directory alias
	 * @default true
	 */
	createGlobalAlias: boolean;

	/**
	 * Turns duplicates into camelCased path aliases
	 * @default false
	 */
	adjustDuplicates: boolean;

	/**
	 * Used paths in JS/TS configs will now be relative to baseUrl
	 * @default false
	 */
	useAbsolute: boolean;

	/**
	 * Adds seperate index paths
	 * @default false
	 */
	useIndexes: boolean;

	/**
	 * Generates paths in IDE config file
	 * works with JS or TS
	 * @default true
	 */
	useConfig: boolean;

	/**
	 * Will generate Paths in tsconfig
	 * used in combination with `useConfig`
	 * Typescript will be auto detected
	 * @default false
	 */
	dts: boolean;

	/**
	 * Root path of Vite project
	 * @default 'process.cwd()'
	 */
	root: string;
}

export interface Alias {
	find: string;
	replacement: string;
}

export interface Path {
	[key: string]: string[];
}

export type Process = 'add' | 'remove' | 'default' | 'normal';
