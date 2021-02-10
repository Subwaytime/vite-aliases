import { writeFile } from 'fs';
import fg from 'fast-glob';

import { setPath, split } from './utils';
import type { Options } from './types';

export const defaultOptions: Options = {
	path: 'src',
	log_path: 'src/logs',
	prefix: '@',
	deep: true,
	depth: 1,
	addLeadingSlash: false,
	allowGlobalAlias: true,
	allowLogging: false,
	ignoreDuplicates: false,
	root: process.cwd(),
};

/**
 * Reads the Projectpath and returns Vite Aliases
 * @param options
 * @returns Record<string, string>
 */

export function getAliases(options: Partial<Options> = {}) {
	const {
		path,
		log_path,
		prefix,
		addLeadingSlash,
		deep,
		depth,
		allowGlobalAlias,
		allowLogging,
		ignoreDuplicates,
		root,
	}: Options = Object.assign({}, defaultOptions, options);

	// get all folders from the project directory
	const directories = fg.sync(deep ? `${path}/**/*` : `${path}/*`, {
		ignore: ['node_modules'],
		onlyDirectories: true,
		cwd: root,
		deep: depth
	});

	if (!directories.length) {
		throw new Error('[vite-aliases]: No Directories could be found!');
	}
	// add leading Slash to prefix if needed
	const guide: string = addLeadingSlash ? `/${prefix}` : prefix;

	// turn directory array into alias object
	const aliases = directories.map((path) => {
		// turn path into array and get last folder
		const dir = split(path, '/').slice(-1)[0];

		return {
			find: `${guide}${dir}`,
			replacement: setPath(path)
		};
	});

	// check for alias duplicates
	const uniqueAliases = aliases.filter((alias, alias_index, self) => alias_index === self.findIndex((a) => (a.find === alias.find)));

	// output an error message to indicate that some folders share the same name
	if(ignoreDuplicates && uniqueAliases.length != aliases.length) {
		throw new Error('[vite-aliases]: There are duplicates to be found in your Folderstructure! Enable Logging to see them.')
	}

	// add global alias for the whole project folder
	if (allowGlobalAlias) {
		aliases.push({
			find: `${guide}`,
			replacement: setPath(path)
		});
	}

	// log all aliases into one file
	if (allowLogging) {
		writeFile(`${log_path}/vite-aliases.json`, JSON.stringify(aliases), () => {});
		console.log('[vite-aliases]: Logfile created!');
	}

	return uniqueAliases;
}