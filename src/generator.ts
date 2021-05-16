import { resolve } from 'path';
import type { Alias, Options } from './types';
import {log, info, warn, error, slash, split, toArray } from './utils';

import { config } from './constants';
import { getDirectories } from './fs/glob';
import chokidar from 'chokidar';


/**
 * Reads the Projectpath and returns Vite Aliases
 * @param options
 * @returns Record<string, string>
 */

export class Generator {

	readonly options: Options;

	public aliases: Alias[] = [];
	public directories = new Set<string>();

	constructor(options: Options) {
		this.options = Object.assign({}, config, options);

		const {
			dir,
			depth,
			root,
			allowGlobalAlias,
		}: Options = this.options;

		const folder = slash(resolve(root, dir)); // needed for absolute paths in watcher

		if(allowGlobalAlias) {
			this.addAlias(folder);
		}

		// WIP
		// watch for directory changes
		const watcher = chokidar.watch(folder, { ignoreInitial: true, depth: depth });

		watcher.on('addDir', (path) => {
			this.addAlias(path);
		})
		.on('unlinkDir', (path) => {
			this.removeAlias(path);
		});


		// TODO: Use set instead of Array
		// if(ignoreDuplicates) {
		// 	this.uniquify();
		// }
	}

	/**
	 *
	 * @param path
	 */

	addAlias(path: string | string []) {
		toArray(path).forEach((p) => {
			p = slash(p);
			// turn path into array and get last folder
			const dir = split(p, '/').slice(-1)[0];

			this.directories.add(p);

			this.aliases.push({
				find: `${this.options.prefix}${dir}`,
				replacement: `${p}`
			});
		});
	}

	/**
	 *
	 * @param path
	 */

	removeAlias(path: string | string[]) {
		toArray(path).forEach((p) => {
			p = slash(p);
			if(this.directories.has(p)) {
				this.directories.delete(p);

				this.aliases = this.aliases.filter((a) => a.replacement != p);
			}
		});
	}

	/**
	 *
	 */

	uniquify() {
		const uniques = this.aliases.filter((alias, alias_index, self) => alias_index === self.findIndex((a) => (a.find === alias.find)));

		if(uniques.length != this.aliases.length) {
			warn('There are duplicates to be found in your Folderstructure! Enable Logging to see them.');
		}
	}

	/**
	 *
	 */

	private searched: boolean = false;

	glob() {
		if(this.searched) {
			return;
		}

		getDirectories(this);
		this.searched =  true;
	}
}
