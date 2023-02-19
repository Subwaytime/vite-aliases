import type { Options } from 'tsup';

export const tsup: Options = {
	entry: ['./src/index.ts'],
	format: ['esm'],
	minify: 'terser',
	dts: true,
	splitting: true,
	clean: true,
	shims: true,
	treeshake: 'smallest'
};
