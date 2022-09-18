import type { Options } from './types';

export const MODULE_NAME = 'vite-aliases';

export const config: Required<Options> = {
	dir: 'src',

	prefix: '@',
	deep: true,
	depth: 1,

	createGlobalAlias: true,
	createLog: false,
	logPath: 'src/logs',
	adjustDuplicates: false,

	useAbsolute: false,
	useConfig: false,
	useIndexes: false,
	useTypescript: false,

	root: process.cwd(),
};

export const IDEConfig = {
	compilerOptions: {
		baseUrl: '.',
		paths: {},
	},
};
