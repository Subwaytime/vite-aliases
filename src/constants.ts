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

export const defaultJSConfig = {
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

export const defaultTSConfig = {
  "compilerOptions": {
    "target": "ES2019",
    "lib": ["DOM", "DOM.Iterable", "ES2019", "ES2020"],
    "types": ["vite/client","node"],
    "allowJs": false,
    "skipLibCheck": false,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": ["./src"]
}
