import type { Options } from './types';

export const MODULE_NAME = 'vite-aliases';

export const config: Required<Options> = {
	dir: 'src',

	prefix: '@',
	deep: true,
	depth: 1,

	allowGlobalAlias: true,
	allowLogging: false,
	adjustDuplicates: false,

	useConfig: false,
	useRelativePaths: false,
	useTypescript: false,

	root: process.cwd(),
};

export const IDEConfig = {
	compilerOptions: {
		baseUrl: '.',
		paths: {},
	},
};