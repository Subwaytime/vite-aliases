import type { Plugin } from 'vite';
import { Generator } from './generator';
import type { Options } from './types';
import { toArray } from './utils';

export function ViteAliases(options: Partial<Options> = {}): Plugin {
	let gen: Generator;

	return {
		name: 'vite-aliases',
		enforce: 'pre',
		config(config, { command }) {
			gen = new Generator(command, options);
			gen.init();

			config.resolve = {
				alias: config.resolve?.alias ? [...toArray(config.resolve.alias as any), ...gen.aliases] : gen.aliases
			};
		}
	};
}
