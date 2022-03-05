import { MODULE_NAME } from './constants';
import consola from 'consola';
import fs from 'fs/promises';
import { resolve, basename } from 'path';
import { parse, stringify } from 'comment-json';
import type { Process } from './types';

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
 * Turns a absolute Path into an Relative Path
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

export function isEmpty(value: any) {
	if (value === null || value === undefined || value === '{}' || value === '' || JSON.stringify(value) === '{}') {
		return true;
	}

	if (Array.isArray(value) && Object.keys(value).length <= 0 || Array.isArray(value) && value.length === 0) {
		return true;
	}

	// if (Reflect.ownKeys(value).length === 0 && value.constructor === Object) {
	// 	return true;
	// }

	return false;
}

/**
 * Simple Info/Warn/Error Consola Instance
 */

export const logger = consola.create({});
export function abort(message: any) {
	throw logger.error(new Error(message));
}

/**
 * Reads a JSON File
 */

export async function readJSON(path: string) {
	try {
		const file = (await fs.readFile(path, 'utf-8')).toString();
		logger.success('Config successfully read!');
		return parse(file);
	} catch(error) {
		abort(error);
	}
};

/**
 * Writes a JSON File
 */

export async function writeJSON(path: string, data: any, process: Process) {
	const name = basename(path);
	const state = (process === 'add' || process === 'normal') ? 'created' : 'updated';

	try {
		await fs.writeFile(path, stringify(data, null, 4));
		logger.success(`File: ${name} successfully ${state}`);
	} catch(error) {
		logger.error(`File: ${name} could not be ${state}.`);
		abort(error);
	}
}
