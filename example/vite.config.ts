import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';
import { ViteAliases } from '../dist/index.js';


export default defineConfig({
	plugins: [
		vue(),
		ViteAliases({
			createLog: true,
			logPath: './',
			adjustDuplicates: true,
		}),
	],
	server: {
		port: 8080,
	},
	logLevel: 'silent',
});