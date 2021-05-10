import type { Generator } from '../generator';
import fg from 'fast-glob';
import { warn } from '../utils';

/**
 * Return all folders from the project directory
 * @param options
 */

export function getDirectories(gen: Generator) {
	const { dir, root, deep, depth } = gen.options;

	const directories = fg.sync(deep ? `${dir}/**/*` : `${dir}/*`, {
		ignore: ['node_modules'],
		onlyDirectories: true,
		cwd: root,
		deep: depth,
		absolute: true
	});

	if (!directories.length) {
		warn('No Directories could be found!');
	}

	gen.addAlias(directories);
}