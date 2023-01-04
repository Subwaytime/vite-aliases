import type { Options } from 'tsup';

export const tsup: Options = {
	entry: ['./src/index.ts'],
	format: ['esm'],
	target: 'node16',
	// minify: 'terser',
	dts: true,
	splitting: true,
	clean: true,
	shims: false,
	sourcemap: true
};
