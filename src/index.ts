import type { Plugin } from 'vite';
import { Generator } from './generator';
import type { Options } from './types';

export function ViteAliases(options?: Partial<Options>): Plugin {
	let gen: Generator;

	return {
		name: 'vite-aliases',
		config(config, { command }) {
			gen = new Generator(command, options);
			gen.glob();

			config.resolve = {
				alias: gen.aliases
			};
		}
	}
}