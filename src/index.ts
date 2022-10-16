import type { PluginOption } from 'vite';
import { Generator } from './generator';
import type { Options } from './types';

export function ViteAliases(options: Partial<Options> = {}): PluginOption {
	let gen: Generator;

	return {
		name: 'vite-aliases',
		enforce: 'pre',
		config(config, { command }) {
			gen = new Generator(command, options);
			gen.init();

			config.resolve = {
				alias: config.resolve?.alias ? [...(config.resolve.alias as any), ...gen.aliases] : gen.aliases,
			};
		},
	};
};
