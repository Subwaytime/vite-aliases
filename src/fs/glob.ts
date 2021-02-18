import type { Options } from '../types';
import fg from 'fast-glob';
import { log } from '../utils';

/**
 * Return all folders from the project directory
 * @param options
 */

export function getDirectories(options: Partial<Options>) {
	const { path, deep , root, depth } = options;

	const directories = fg.sync(deep ? `${path}/**/*` : `${path}/*`, {
		ignore: ['node_modules'],
		onlyDirectories: true,
		cwd: root,
		deep: depth
	});

	if (!directories.length) {
		log('No Directories could be found!');
	}

	return directories;
}