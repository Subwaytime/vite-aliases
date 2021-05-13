import type { Alias, Options } from './types';
import { createLogfile, log, slash, split } from './utils';

import { config } from './constants';
import { getDirectories } from './fs/glob';

import { generate } from './generate';

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
		allowGlobalAlias,
		allowLogging,
		ignoreDuplicates,
		root,
		genConfig,
		pathConfig,
	}: Options = Object.assign({}, config, options);

	// get all folders
	const directories = getDirectories({ path, deep , root, depth });

	// turn directory array into alias object
	const aliases: Alias[] = directories.map((path:string) => {
		// turn path into array and get last folder
		const dir = split(path, '/').slice(-1)[0];

		return {
			find: `${prefix}${dir}`,
			replacement: slash(`${path}`)
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
			find: `${prefix}`,
			replacement: slash(`${path}`)
		});
	}

	// log all aliases into one file
	if (allowLogging) {
		createLogfile(log_path, aliases);
	}

	if (genConfig) {
		generate(uniqueAliases, pathConfig);
	}

	return uniqueAliases;
}