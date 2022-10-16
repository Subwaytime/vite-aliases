import type { Alias, Options, Path } from './types';
import { normalizePath } from 'vite';
import { logger, split, toArray, toCamelCase, toRelative } from './utils';
import { writeLog, writeConfig } from './fs';

import chokidar from 'chokidar';
import { resolve } from 'path';
import { config } from "./constants";
import { getDirectories } from './fs';

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

		this.fullPath = normalizePath(resolve(this.options.root, this.options.dir)); // needed for absolute paths in watcher

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
			const correctedPath = normalizePath(p);
			const folders = split(correctedPath.replace(this.fullPath, this.options.dir), '/').filter(Boolean);
			const lastDir = folders.slice(-1)[0];
			let key = `${this.options.prefix}${lastDir}`;

			const uniqueFolders = [...new Set(folders)] as string[];
			this.checkForDuplicates(correctedPath, folders, uniqueFolders);

			if(this.aliases.some((a) => a.find === key)) {
				logger.warn(
					'There are duplicate Aliases generated, either fix the folderstructure or enable adjustDuplicates.',
				);

				if (this.options.adjustDuplicates && this.options.depth > 1) {
					const name = folders.filter((f) => !split(normalizePath(this.options.dir), '/').includes(f)).join('-');
					key = `${this.options.prefix}${toCamelCase(name)}`;
				}
			}

			if(lastDir === this.options.dir && this.options.createGlobalAlias) {
				key = `${this.options.prefix}`;
			}

			this.directories.add(p);
			this.aliases.push({
				find: `${key}`,
				replacement: `${p}`
			});

			const configPath = this.options.useAbsolute ? correctedPath : toRelative(correctedPath, this.options.dir);

			if(this.options.useIndexes) {
				this.paths[key] = [configPath];
			} else {
				this.paths[`${key}/*`] = [`${configPath}/*`];
			}
		});
	}

	/**
	 * Remove Alias
	 * @param path
	 */

	removeAlias(path: string | string[]) {
		toArray(path).forEach((p) => {
			const correctedPath = normalizePath(p);

			if(this.directories.has(correctedPath)) {
				this.directories.delete(correctedPath);
				this.aliases = this.aliases.filter((a) => a.replacement != correctedPath);
				this.paths = Object.fromEntries(
					Object.entries(this.paths).filter(
						(configPath) => configPath[1][0].slice(0, -2) != (
							this.options.useIndexes ? correctedPath : `${correctedPath}/*`
						)
					)
				)
			}
		});
	}

	/**
	 * Check for duplicates before adding them as aliases
	 * @param initialPath
	 * @param folders
	 * @param uniqueFolders
	 */

	checkForDuplicates(initialPath: string, folders: string[], uniqueFolders: string[]) {
		if (folders.length !== uniqueFolders.length) {
			const duplicateFolders = [...folders].sort().filter((f, i, self) => {
				if (self[i + 1] === self[i]) {
					return f;
				}
			});

			logger.warn(`Path: '${initialPath}' contains multiple folders with same name: ${duplicateFolders.toString()}.`);
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
