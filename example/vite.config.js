import { getAliases } from '../src/index';
import vue from '@vitejs/plugin-vue';

const aliases = getAliases();

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