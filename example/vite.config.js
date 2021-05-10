import { ViteAliases } from '../src/index';
import vue from '@vitejs/plugin-vue';

const aliases = ViteAliases();

const config = {
	resolve: {
		alias: aliases,
	},
	plugins: [
		vue(),
	],
	server: {
		port: 8080
	},
	logLevel: 'silent'
};

export default config;