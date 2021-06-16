import { resolve } from 'path';
import type { Alias, ConfigPath, Options } from './types';
import { slash, split, terminal, toArray, toCamelCase } from './utils';

import { config } from './constants';
import { getDirectories } from './fs/glob';
import { writeLog } from './fs/log';
import { writeConfig } from './fs/config';
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
	public configPaths: ConfigPath = {};

	constructor(public readonly servermode: String, options?: Partial<Options>) {
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

		// only watch on dev not on build
		if (servermode === 'serve') {
			// watch for directory changes
			const watcher = chokidar.watch(folder, { ignoreInitial: true, depth: depth });

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
			const lastdir = split(p, '/').slice(-1)[0];
			let key = `${this.options.prefix}${lastdir}`;

			if(this.aliases.some(a => a.find === key) || this.directories.has(p)) {
				terminal('There are duplicates to be found in your Folderstructure! Enable Logging to see them or enable adjustDuplicates.', 'warning');

				const firstdir = split(p, '/').slice(-this.options.depth)[0];

				if(firstdir === lastdir) {
					terminal(`${firstdir} should not contain ${lastdir} with the exact name`, 'warning');
					throw new Error();
				}

				if(this.options.adjustDuplicates) {
					if (firstdir != this.options.dir) {
						key = `${this.options.prefix}${toCamelCase(`${firstdir}-${lastdir}`)}`;
					}
				}
			}

			this.directories.add(p);

			this.aliases.push({
				find: `${key}`,
				replacement: `${p}`
			});

			this.configPaths[key] = [p];
		});
	}

	/**
	 * Remove Alias
	 * @param path
	 */

	removeAlias(path: string | string[]) {
		toArray(path).forEach((p) => {
			p = slash(p);
			// turn path into array and get last folder
			const dir = split(p, '/').slice(-1)[0];
			const key = `${this.options.prefix}${dir}`;

			if(this.directories.has(p)) {
				this.directories.delete(p);

				this.aliases = this.aliases.filter((a) => a.find != key);
				delete this.configPaths[key];
			}
		});
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
		this.searched =  true;

		if(this.options.allowLogging) {
			writeLog(this);
		}

		if(this.options.useConfig) {
			writeConfig(this);
		}
	}
}
