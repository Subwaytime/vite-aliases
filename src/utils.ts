import { writeFile, mkdir } from 'fs';
import { resolve } from "path";

import type { Alias } from './types';

/**
 * Split String on Seperator into Array
 * @param string
 * @param seperator
 */

export function split(string: string, seperator: string) {
	return string.split(seperator);
}

/**
 * Returns a resolved Path based on current Directory
 * @param path
 */

export function setPath(path: string) {
	return resolve(__dirname, `${path}`);
}

/**
 * Creates a Logfile
 * If needed it will also create a Logfolder
 * @param path
 * @param data
 */

export function writeLog(path: string, data: Alias[]) {
	mkdir(`${path}`, { recursive: true }, (error) => {
		writeFile(`${path}/vite-aliases.json`, JSON.stringify(data), (error) => {
			if(error) {
				throw new Error('[vite-aliases]: An Error occured while creating the Logfile.');
			}
		});

		if(error) {
			throw new Error('[vite-aliases]: An Error occured while creating the Logfolder.')
		}
	});

	console.log('[vite-aliases]: Logfile created!');
}