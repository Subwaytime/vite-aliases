import { ViteAliases } from '../src/index';
import vue from '@vitejs/plugin-vue';

const config = {
	plugins: [
		vue(),
		ViteAliases({
			depth: 2,
			useConfig: true,
			useTypescript: true,
			allowLogging: true,
			adjustDuplicates: true
		}),
	],
	server: {
		port: 8080,
	},
	logLevel: 'silent',
};

export default config;