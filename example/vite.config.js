import { getAliases } from '../src/index';
import vue from '@vitejs/plugin-vue';

const aliases = getAliases({
	genConfig: true,
});

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
	logLevel: 'info'
};

export default config;