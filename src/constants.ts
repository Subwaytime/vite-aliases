import type { Options } from './types';

export const config: Required<Options> = {
	path: 'src',
	log_path: 'src/logs',

	prefix: '@',
	deep: true,
	depth: 1,

	allowGlobalAlias: true,
	allowLogging: false,
	ignoreDuplicates: false,
	
	genConfig: false,
	pathConfig: './jsconfig.json',
	root: process.cwd(),
};

export const defaultJson = {
  "compilerOptions": {
    "checkJs": false,
    "resolveJsonModule": true
  },
  "exclude": [
    "dist",
    "node_modules",
    "build",
    ".vscode",
    ".nuxt",
    "coverage",
    "jspm_packages",
    "tmp",
    "temp",
    "bower_components",
    ".npm",
    ".yarn"
  ],
  "typeAcquisition": {
    "enable": true
  }
}