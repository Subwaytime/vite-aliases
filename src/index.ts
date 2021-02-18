import type { Alias, Options } from './types';
import { createLogfile, log, split } from './utils';

import { config } from './constants';
import { getDirectories } from './fs/glob';
import slash from 'slash';

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
		deep,
		depth,
		addLeadingSlash,
		allowGlobalAlias,
		allowLogging,
		ignoreDuplicates,
		root,
	}: Options = Object.assign({}, config, options);

	// add leading Slash to prefix if needed
	const guide: string = addLeadingSlash ? `/${prefix}` : prefix;

	// get all folders
	const directories = getDirectories({ path, deep , root, depth });

	// turn directory array into alias object
	const aliases: Alias[] = directories.map((path) => {
		// turn path into array and get last folder
		const dir = split(path, '/').slice(-1)[0];

		return {
			find: `${guide}${dir}`,
			replacement: slash(`${root}/${path}`)
		};
	});

	// check for alias duplicates
	const uniqueAliases = aliases.filter((alias, alias_index, self) => alias_index === self.findIndex((a) => (a.find === alias.find)));

	// output an error message to indicate that some folders share the same name
	if(ignoreDuplicates && uniqueAliases.length != aliases.length) {
		log('There are duplicates to be found in your Folderstructure! Enable Logging to see them.', 'yellow')
	}

	// add global alias for the whole project folder
	if (allowGlobalAlias) {
		aliases.push({
			find: `${guide}`,
			replacement: slash(`${root}/${path}`)
		});
	}

	// log all aliases into one file
	if (allowLogging) {
		createLogfile(log_path, aliases);
	}

	return uniqueAliases;
}