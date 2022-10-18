import type { Options } from 'tsup';

export const tsup: Options = {
	entry: ['src/index.ts'],
	format: ['cjs','esm'],
	target: "node16",
	dts: true,
	splitting: true,
	clean: true,
	shims: false,
};
