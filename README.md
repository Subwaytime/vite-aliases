<h2 align="left">vite-aliases</h2>

<p align="left">Alias auto generation for Vite 2</p>

<p align="left">
<a href="https://www.npmjs.com/package/vite-aliases">
<img src="https://img.shields.io/npm/v/vite-aliases?color=222&style=flat-square">
</a>
</p>

## Usage

Install

```bash
npm i vite-aliases -D
```

Add it to `vite.config.js`

```ts
// vite.config.js
import { ViteAliases } from 'vite-aliases'

export default {
	plugins: [
		ViteAliases()
	]
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

## Best Practice

`vite-aliases` is meant to simply take the first Layer of your Projectfolders and turn it into useful Shortcuts.
Therefore i advise you to use the default Configuration and do not use Folders with the same name, otherwise it will create an Error.

If however you need duplicate Foldernames, enable `adjustDuplicates`.
This will turn the entire Filepath of said Duplicate into the alias itself, like shown in the Example below.

Example:
`src/components` -> `@components`
`src/pages/components` -> `@pagesComponents`
`src/test/new/partials/components` -> `@testNewPartialsComponents`
and so on..

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
	 * Turns Duplicates into camelCased Path Aliases
	 */
	adjustDuplicates: false,

	/**
	 * Generates Paths in IDE Config File
	 * Works with JS oder TS
	 * For Typescript: set `useTypescript` true
	 */
	useConfig: false,

	/**
	 * Used Paths in JS/TS Configs will now be relative to baseUrl
	 */

	useRelativePaths: false,

	/**
	 * Will generate Paths in tsconfig
	 * Used in Combination with `useConfig`
	 */
	useTypescript: false,

	/**
	 * Will generate paths in tsconfig for re-exporting modules from an index.ts file
	 * Used in combination with `useConfig` and `useTypeScript`
	 */
	addReExportPaths: false,

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
