import { Generator } from './generator';
import type { Options } from './types';
import type { Plugin } from 'vite';

export function ViteAliases(options?: Partial<Options>): Plugin {
	let gen: Generator;

	return {
		name: 'vite-aliases',
		enforce: 'pre',
		config(config, { command }) {
			gen = new Generator(command, options);
			gen.init();

			config.resolve = {
				alias: gen.aliases
			};
		}
	}
}