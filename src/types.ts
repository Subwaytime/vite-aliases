/**
 * Library options.
 */
export interface Options {
	/**
	 * Relative path to the project Directory
	 * @default 'src'
	 */
	path: string;

	/**
	 * Relative path to log the generated Aliases
	 * @default 'src/logs'
	 */

	log_path: string;

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
	 * Add a Leading Slash
	 * This makes it look more similiar to Vite 1
	 * @default false
	 */
	addLeadingSlash: boolean;

	/**
	 * Allow creating a Logger File
	 * @default false
	 */
	allowLogging: boolean;

	/**
	 * Allow global project Directory alias
	 * @default true
	 */
	allowGlobalAlias: boolean;

	/**
	 * Ignore Error on Duplicate Folders
	 * @default false
	 */
	ignoreDuplicates: boolean

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