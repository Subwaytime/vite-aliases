import { createConsola } from 'consola';
import fs from 'node:fs/promises';
import { normalizePath } from 'vite';
import { MODULE_NAME } from './constants';
import type { Process } from './types';
import { parse, stringify } from 'comment-json';

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
	if (Array.isArray(value)) {
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
	let folders = split(normalizePath(path), '/');
	folders = folders.slice(
		folders.findIndex((f) => f === dir),
		folders.length,
	);
	return normalizePath(`./${folders.join('/')}`);
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

	if ((Array.isArray(value) && Object.keys(value).length <= 0) || (Array.isArray(value) && value.length === 0)) {
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

export const logger = createConsola({ defaults: { message: `[${MODULE_NAME}] -` } });
export function abort(message: any) {
	throw logger.error(new Error(message));
}

/**
 * Reads a JSON File
 */

export async function readJSON(path: string) {
	try {
		const file = (await fs.readFile(path, 'utf-8')).toString();
		logger.success(`Config: ${path} successfully read!`);
		return parse(file);
	} catch (error) {
		logger.error(`File: ${path} was not found!`);
	}
}

/**
 * Writes a JSON File
 */

export const DEFAULT_INDENTATION: Indentation = 4; // default to 4 spaces before introducing the intepretation feature

export async function writeJSON(path: string, data: any, process: Process, indentation: Indentation = DEFAULT_INDENTATION) {
	const name = path.replace(/^.*[\\\/]/, '');
	const state = process === 'add' || process === 'default' ? 'created' : 'updated';

	try {
		await fs.writeFile(path, stringify(data, null, indentation));
		logger.success(`File: ${name} successfully ${state}`);
	} catch (error) {
		logger.error(`File: ${name} could not be ${state}.`);
		abort(error);
	}
}

/**
 * Interprets file indentations
 */

export type Indentation = number | '\t';

export async function interpretFileIndentation(path: string): Promise<Indentation> {
	const name = path.replace(/^.*[\\\/]/, '');

	try {
		const content = (await fs.readFile(path, 'utf-8')).toString();
		const lines = content.split('\n');
		const secondLine = lines[1];
		let indentation: Indentation;

		if (secondLine.startsWith('\t')) {
			indentation = '\t';
		} else {
			const firstNonSpaceCharacter = split(secondLine, '').findIndex(char => char !== ' ');

			if (firstNonSpaceCharacter === -1) {
				logger.error('Failed to interpret indentation from file. (No indentation found)');
			}

			indentation = firstNonSpaceCharacter;
		}

		logger.info(`File: Interpreted indentation as (${typeof indentation === 'number' ? `${indentation} spaces` : 'tabs'}) from file ${name} successfully`);

		return indentation;
	} catch (error) {
		logger.error(`File: Failed to interpret indentation from ${name}.`);
		return DEFAULT_INDENTATION;
	}
}
