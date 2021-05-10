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