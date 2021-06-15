<h2 align="left">vite-aliases</h2>

<p align="left">Alias auto generation for Vite 2</p>

<p align="left">
<a href="https://www.npmjs.com/package/vite-aliases">
<img src="https://img.shields.io/npm/v/vite-aliases?color=222&style=flat-square">
</a>
</p>

## Usage

**Read here for current News on Version 0.7 --> https://github.com/Subwaytime/vite-aliases/issues/18**

Install

```bash
npm i vite-aliases -D
```

Add it to `vite.config.js`

```ts
// vite.config.js
import { ViteAliases } from 'vite-aliases'

const aliases = ViteAliases();

export default {
	resolve: {
		alias: aliases
	}
};
```

That's it!

Based on your Folderstructure, it will now automatically generate all needed aliases.
You can configure it to any desired Folderdepth, but it is recommend to stay on the first Level!
Furthermore it will use your native OS Filesystem, so it works on Linux, Mac, Windows and other OS.

This Structure:

```
src
    assets
    components
    pages
    store
    utils
```

will generate the following:

```ts
[
	{
		find: '@',
		replacement: '${your_project_path}/src'
	},
	{
		find: '@assets',
		replacement: '${your_project_path}/src/assets'
	},
	{
		find: '@components',
		replacement: '${your_project_path}/src/components'
	},
	{
		find: '@pages',
		replacement: '${your_project_path}/src/pages'
	},
	{
		find: '@store',
		replacement: '${your_project_path}/src/store'
	},
	{
		find: '@utils',
		replacement: '${your_project_path}/src/utils'
	},
]
```

## Configuration

Current available Options:

```ts
ViteAliases({
	/**
	 * Relative path to the project Directory
	 */
	dir: 'src',

	/**
	 * Prefix Symbol for the Aliases
	 */
	prefix: '@',

	/**
	 * Allow Searching for Subdirectories
	 */
	deep: true,

	/**
	 * Search Depthlevel for Subdirectories
	 */
	depth: 1,

	/**
	 * Creates a Logfile in `logs` Folder
	 * Will be relative to project Directory
	 */
	allowLogging: false,

	/**
	 * Allow global project Directory alias
	 */
	allowGlobalAlias: true,

	/**
	 * Ignore Error on Duplicate Folders
	 */
	ignoreDuplicates: false,

	/**
	 * Generates Paths in IDE Config File
	 * Works with JS oder TS
	 * For Typescript: set `useTypescript` true
	 */
	useConfig: false,

	/**
	 * Will generate Paths in tsconfig
	 * Used in Combination with `useConfig`
	 */
	useTypescript: false,

	/**
	 * Root path of Vite project
	 */
	root: process.cwd()
});
```

## Thanks

Thanks to [@brattonross](https://github.com/brattonross) and [@antfu](https://github.com/antfu),
due to this tiny Library beeing inspired by both Projects:

[vite-plugin-voie](https://github.com/vamplate/vite-plugin-voie)

[vite-plugin-components](https://github.com/antfu/vite-plugin-components).

## License

MIT License © 2020-2021 [Leon Langer](https://github.com/subwaytime)
