import { MODULE_NAME } from './constants';
import consola from 'consola';

/**
 * Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
 * @param string
 */

export function slash(string: string): string {
	return string.replace(/\\/g, '/');
}

/**
 * Split String on Seperator into Array
 * @param string
 * @param seperator
 */

export function split(string: string, seperator: string): string[] {
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
 * Turns a Value into Array
 * @param string
 * @param seperator
 */

export function toRelative(path: string, dir: string): string {
	let folders = split(slash(path), '/');
	folders = folders.slice(folders.findIndex((f) => f === dir), folders.length);
	return slash(`./${folders.join('/')}`);
}

/**
 * Turns any String into Camelcased String
 * @param string
 */

export function toCamelCase(string: string): string {
	return string.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
}

/**
 * Check if Value is Empty
 * supports: Array, Object, String
 * @param value
 */

export function empty(value: any) {
	if (value === null || value === undefined || value === '{}' || value === '') {
		return true;
	}

	if (Array.isArray(value) && Object.keys(value).length <= 0) {
		return true;
	}

	return false;
}

/**
 * Simple Info/Warn/Error Consola Instance
 */

export const logger = consola.create({});