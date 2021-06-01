import type { Options } from './types';

export const MODULE_NAME = 'vite-aliases';

export const config: Required<Options> = {
	dir: 'src',

	prefix: '@',
	deep: true,
	depth: 1,

	useConfig: false,
	useTypescript: false,

	allowGlobalAlias: true,
	allowLogging: false,
	ignoreDuplicates: false,

	root: process.cwd(),
};

export const IDEConfig = {
	"compilerOptions": {
		"paths": {}
	}
};