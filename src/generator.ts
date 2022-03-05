import type { Alias, Options, Path } from './types';
import { getDirectories, writeConfig, writeLog } from './fs';
import { logger, slash, split, toArray, toCamelCase, toRelative } from './utils';

import chokidar from 'chokidar';
import { config } from './constants';
import { resolve } from 'path';

/**
 * Reads the Projectpath and returns Vite Aliases
 * @param options
 * @returns Record<string, string>
 */

export class Generator {

	readonly options: Options;
	readonly fullPath: string;

	public aliases: Alias[] = [];
	public directories = new Set<string>();
	public paths: Path = {};

	constructor(public readonly servermode: string, options?: Partial<Options>) {
		this.options = Object.assign({}, config, options);

		this.fullPath = slash(resolve(this.options.root, this.options.dir)); // needed for absolute paths in watcher

		// only watch on dev not on build
		if (servermode === 'serve') {
			this.observe();
		}
	}

	/**
	 * Add Alias
	 * @param path
	 */

	addAlias(path: string | string[]) {
		toArray(path).forEach((p) => {
			p = slash(p);
			// turn path into array and get last folder
			const folders = split(p.replace(this.fullPath, this.options.dir), '/').filter(Boolean);
			const lastDir = folders.slice(-1)[0];
			let key = `${this.options.prefix}${lastDir}`;

			const uniques = [...new Set(folders)];
			if(folders.length !== uniques.length) {
				const duplicates = [...folders].sort().filter((f, i, self) => {
					if(self[i + 1] === self[i]) {
						return f;
					}
				});

				logger.warn(`Path: '${p}' contains multiple folders with same name: ${duplicates.toString()}`);
			}

			if(this.aliases.some(a => a.find === key)) {
				logger.warn('There are duplicate Aliases generated, either fix the folderstructure or enable adjustDuplicates');

				if(this.options.adjustDuplicates && this.options.depth > 1) {
					const name = folders.filter(f => !split(slash(this.options.dir), '/').includes(f)).join('-');
					key = `${this.options.prefix}${toCamelCase(name)}`;
				}
			}

			if (lastDir === this.options.dir && this.options.createGlobalAlias) {
				key = `${this.options.prefix}`;
			}

			this.directories.add(p);

			this.aliases.push({
				find: `${key}`,
				replacement: `${p}`
			});

			this.handleConfigPath(p, key);
		});
	}

	/**
	 * Remove Alias
	 * @param path
	 */

	removeAlias(path: string | string[]) {
		toArray(path).forEach((p) => {
			p = slash(p);

			if(this.directories.has(p)) {
				this.directories.delete(p);

				this.aliases = this.aliases.filter((a) => a.replacement != p);

				this.handleConfigPath(p);
			}
		});
	}

	/**
	 *
	 * @param path
	 * @param key
	 */

	handleConfigPath(path: string, key ?:string) {
		const p = this.options.useAbsolute ? slash(path): toRelative(path, this.options.dir);

		if(key) {
			this.paths[`${key}/*`] = [`${p}/*`];

			if(this.options.useIndexes) {
				this.paths[key] = [p];
			}

		} else {
			// TODO: add useIndexes removal
			this.paths = Object.fromEntries(Object.entries(this.paths).filter((cp) => cp[1][0].slice(0, -2) != p));
		}
	}

	/**
	 * Glob directories
	 * writes Logfile
	 * writes IDE Config
	 */

	private searched: boolean = false;

	async init() {
		if (this.searched) {
			return;
		}

		await getDirectories(this);

		// add global alias if allowed
		if (this.options.createGlobalAlias) {
			this.addAlias(this.fullPath);
		}

		// start alias logger if allowed
		writeLog(this);

		// write js/ts config if allowed
		writeConfig(this);

		this.searched = true;
	}

	/**
	 * Watch for directory changes
	 */

	observe() {
		const watcher = chokidar.watch(this.fullPath, { ignoreInitial: true, depth: this.options.depth });

		watcher
			.on('addDir', (path) => {
				this.addAlias(path);
				writeLog(this, 'add');
				writeConfig(this, 'add');
				logger.info(`Watcher added new Path: ${path}`);
			})
			.on('unlinkDir', (path) => {
				this.removeAlias(path);
				writeLog(this, 'remove');
				writeConfig(this, 'remove');
				logger.info(`Watcher removed Path: ${path}`);
			});
	}
}
