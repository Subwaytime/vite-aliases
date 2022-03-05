import { ViteAliases } from '../dist/index.js';
import vue from '@vitejs/plugin-vue';

const config = {
	plugins: [
		vue(),
		ViteAliases({
			useConfig: true,
			useTypescript: true,
			createLog: true,
			adjustDuplicates: true
		}),
	],
	server: {
		port: 8080,
	},
	logLevel: 'silent',
};

export default config;