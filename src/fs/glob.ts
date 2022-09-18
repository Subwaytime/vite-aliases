import fg from 'fast-glob';
import type { Generator } from '../generator';
import { logger } from '../utils';

/**
 * Return all folders from the project directory
 * @param options
 */

export async function getDirectories(gen: Generator) {
	const { dir, root, deep, depth } = gen.options;

	const directories = await fg.sync(deep ? `${dir}/**/*` : `${dir}/*`, {
		ignore: ['node_modules'],
		onlyDirectories: true,
		cwd: root,
		deep: depth,
		absolute: true,
	});

	if (!directories.length) {
		logger.error(new Error('No Directories could be found!'));
	}

	gen.addAlias(directories);
}
