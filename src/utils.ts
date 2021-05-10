import chalk from 'chalk';
import { writeFile, mkdir } from 'fs';

import type { Alias } from './types';
import { MODULE_NAME } from './constants';

/**
 * Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
 * @param string
 * @returns
 */

export function slash(string: string) {
	return string.replace(/\\/g, '/');
}

/**
 * Split String on Seperator into Array
 * @param string
 * @param seperator
 */

export function split(string: string, seperator: string) {
	return string.split(seperator);
}

/**
 * Turns a Value into Array
 * @param string
 * @param seperator
 */

export function toArray<T>(value: T | T[]): T[] {
	if(Array.isArray(value)) {
		return value;
	} else {
		return [value];
	}
}

/**
 * Simple Info/Warn/Error Functions
 * @param string
 * @param color
 */

export function info(string: string) {
	return console.log(chalk.keyword('blue')(`[${MODULE_NAME}]: ${string}`));
}

export function warn(string: string) {
	return console.warn(chalk.keyword('yellow')(`[${MODULE_NAME}]: ${string}`));
}

export function error(string: string) {
	return console.error(chalk.keyword('red')(`[${MODULE_NAME}]: ${string}`))
}

/**
 * Creates a Logfile
 * If needed it will also create a Logfolder
 * @param path
 * @param data
 */

export function log(path: string, data: Alias[]) {
	// mkdir(`${path}`, { recursive: true }, (error) => {
	// 	writeFile(`${path}/vite-aliases.json`, JSON.stringify(data), (error) => {
	// 		if(error) {
	// 			error('An Error occured while creating the Logfile.');
	// 		}
	// 	});

	// 	if(error) {
	// 		error('[vite-aliases]: An Error occured while creating the Logfolder.')
	// 	}
	// });

	// log('Logfile created!', 'green');
}