import chalk from 'chalk';
import { MODULE_NAME } from './constants';

/**
 * Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
 * @param string
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
 * Turns any String into Camelcased String
 * @param string
 */

export function toCamelCase(string: string) {
	return string.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
}

/**
 * Simple Info/Warn/Error Function
 * @param string
 * @param color
 */

export function terminal(string: string, type: string = 'info') {
	const types: { [index: string]: any } = {
		info: chalk.hex('#228be6'),
		warning: chalk.hex('#fab005'),
		error: chalk.hex('#e03131'),
	};

	return console.log(types[type](`[${MODULE_NAME}]: ${string}`));
}