import type { Options } from './types';

export const config: Required<Options> = {
	path: 'src',
	log_path: 'src/logs',

	prefix: '@',
	deep: true,
	depth: 1,

	allowGlobalAlias: true,
	allowLogging: false,
	ignoreDuplicates: false,

	root: process.cwd(),
};