import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';
import { ViteAliases } from '../dist/index';


export default defineConfig({
	plugins: [
		vue(),
		ViteAliases({
			useConfig: true,
			useTypescript: true,
			createLog: true,
			logPath: './',
			adjustDuplicates: true
		}),
	],
	server: {
		port: 8080,
	},
	logLevel: 'silent',
});