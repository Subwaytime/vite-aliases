<h2 align="left">vite-aliases</h2>

<p align="left">Alias auto generation for Vite 5</p>

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
import { ViteAliases } from 'vite-aliases';

export default {
	plugins: [
		ViteAliases()
	]
};
```

Add this to `package.json` (Plugin is only available for ESM)
```json
{
	"type": "module"
}
```

That's it!

<p>
<br/>
Based on your Folderstructure, it will now automatically generate all needed aliases.
<br />
You can configure it to any desired Depth, but it is recommend to stay on the first Level!
<br />
Furthermore it will use your native OS filesystem, so it works on Linux, Mac, Windows and other OS.
</p>

<br />
This structure:

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
];
```

## Best Practice

`vite-aliases` is meant to simply take the first Layer of your folders and turn it into useful Shortcuts.
<br />
Therefore i advise you to use the default Configuration and not use folders with the same name, otherwise it will create an Error.

If however you need duplicate Foldernames, enable `adjustDuplicates`.
<br />
This will turn the entire Filepath of said duplicate into the alias itself, like shown in the Example below.

Example:
```
`src/components` -> `@components`
`src/pages/components` -> `@pagesComponents`
`src/test/new/partials/components` -> `@testNewPartialsComponents`
```
and so on..

## Configuration

Current available options:

```ts
ViteAliases({
	/**
  * Relative path to the project directory
  */
	dir: 'src',

	/**
  * Prefix symbol for the aliases
  */
	prefix: '~',

	/**
  * Allow searching for subdirectories
  */
	deep: true,

	/**
  * Search depthlevel for subdirectories
  */
	depth: 1,

	/**
  * Creates a Logfile
  * use `logPath` to change the location
  */
	createLog: false,

	/**
  * Path for Logfile
  */
	logPath: 'src/logs',

	/**
  * Create global project directory alias
  */
	createGlobalAlias: true,

	/**
  * Turns duplicates into camelCased path aliases
  */
	adjustDuplicates: false,

	/**
  * Used paths in JS/TS configs will now be relative to baseUrl
  */
	useAbsolute: false,

	/**
  * Adds seperate index paths
  * approach created by @davidohlin
  */
	useIndexes: false,

	/**
  * Generates paths in IDE config file
  * works with JS or TS
  */
	useConfig: true,

	/**
  * Override config paths
  */
	ovrConfig: false,

	/**
  * Will generate Paths in tsconfig
  * used in combination with `useConfig`
  * Typescript will be auto detected
  */
	dts: false,

	/**
  * Disables any terminal output
  */
	silent: true,

	/**
  * Root path of Vite project
  */
	root: process.cwd()
});
```

## Thanks

Thanks to [@brattonross](https://github.com/brattonross) and [@antfu](https://github.com/antfu),
due to this tiny library beeing inspired by both projects:

[vite-plugin-voie](https://github.com/vamplate/vite-plugin-voie)

[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components).

## License

MIT License © 2020-PRESENT [Leon Langer](https://github.com/subwaytime)
