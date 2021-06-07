import { Generator } from './generator';
import type { Options } from './types';

export function ViteAliases(options: Partial<Options>) {
	let gen: Generator;

	gen = new Generator(options);
	gen.glob();

	return gen.aliases;
}