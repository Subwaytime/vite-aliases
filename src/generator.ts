import type { Alias, Options, Path } from './types';
import { logger, slash, split, toArray, toCamelCase, toRelative } from './utils';

import chokidar from 'chokidar';
import { config } from './constants';
import { getDirectories } from './fs/glob';
import { resolve } from 'path';
import { writeConfig } from './fs/config';
import { writeLog } from './fs/log';

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

	constructor(public readonly servermode: String, options?: Partial<Options>) {
		this.options = Object.assign({}, config, options);

		const {
			dir,
			depth,
			root,
		}: Options = this.options;

		this.fullPath = slash(resolve(root, dir)); // needed for absolute paths in watcher

		// only watch on dev not on build
		if (servermode === 'serve') {
			// watch for directory changes
			const watcher = chokidar.watch(this.fullPath, { ignoreInitial: true, depth: depth });

			watcher.on('addDir', (path) => {
				this.addAlias(path);
			})
			.on('unlinkDir', (path) => {
				this.removeAlias(path);
			});
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

			if (lastDir === this.options.dir && this.options.allowGlobalAlias) {
				key = `${this.options.prefix}`;
			}

			this.directories.add(p);

			this.aliases.push({
				find: `${key}`,
				replacement: `${p}`
			});

			this.handleConfigPath(p, `${key}/*`);
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
		const p = this.options.useRelativePaths ? toRelative(path, this.options.dir) : slash(`${path}/*`);

		if(key) {
			this.paths[key] = [p];
		} else {
			this.paths = Object.fromEntries(Object.entries(this.paths).filter((cp) => cp[1][0] === p));
		}
	}

	/**
	 * Glob Directories
	 * writes Logfile
	 * writes IDE Config
	 */

	private searched: boolean = false;

	glob() {
		if(this.searched) {
			return;
		}

		getDirectories(this);

		if (this.options.allowGlobalAlias) {
			this.addAlias(this.fullPath);
		}

		if (this.options.allowLogging) {
			writeLog(this);
		}

		if (this.options.useConfig) {
			writeConfig(this);
		}

		this.searched = true;
	}
}
