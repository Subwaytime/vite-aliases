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
			root,
			allowGlobalAlias,
		}: Options = this.options;

		// WIP
		// watch for directory changes
		const watcher = chokidar.watch(dir, { ignoreInitial: true, cwd: root });

		if(allowGlobalAlias) {
			this.addAlias(dir);
		}

		watcher.on('unlink', (path) => {
			console.log(path);
			this.addAlias(path);
		})
		.on('add', (path) => {
			console.log(path);
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
			// turn path into array and get last folder
			const dir = split(p, '/').slice(-1)[0];

			this.directories.add(p);

			this.aliases.push({
				find: `${this.options.prefix}${dir}`,
				replacement: slash(`${p}`)
			});
		})
	}

	/**
	 *
	 * @param path
	 */

	removeAlias(path: string | string[]) {
		toArray(path).forEach((p) => {
			if(this.directories.has(p)) {
				this.directories.delete(p);
			}
		})
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
		console.log(this.aliases);
	}
}
