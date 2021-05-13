/**
 * Library options.
 */
export interface Options {
	/**
	 * Activate config generator
	 * @default false
	 */
	genConfig: boolean;

	/**
	 * Relative path to the config file
	 * @default './jsconfig.json'
	 */
	pathConfig: string;

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
	find: string;
	replacement: string;
};

export interface GeneratedAliases { 
	[x: string]: string[];
}