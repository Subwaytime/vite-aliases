import type { Options } from './types';

export const MODULE_NAME = 'vite-aliases';

export const defaultOptions: Required<Options> = {
	dir: 'src',

	prefix: '~',
	depth: 1,

	adjustDuplicates: false,
	useAbsolute: false,
	useIndexes: false,

	includeGlobalAlias: true,
	log: `./${MODULE_NAME}.log.json`,

	config: {
		use: true,
		load: false,
		override: false
	},

	dts: false, // automatically detected
	silent: true,
	root: process.cwd()
};

export const IDEConfig = {
	compilerOptions: {
		baseUrl: '.',
		paths: {}
	}
};
