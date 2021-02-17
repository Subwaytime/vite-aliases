import chalk from 'chalk';
import { writeFile, mkdir } from 'fs';

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
 *
 * @param string
 * @param color
 */

export function log(string: string, color: string = 'red') {
	return console.log(chalk.keyword(color)(`
		[vite-aliases]: ${string}
	`));
}

/**
 * Creates a Logfile
 * If needed it will also create a Logfolder
 * @param path
 * @param data
 */

export function createLogfile(path: string, data: Alias[]) {
	mkdir(`${path}`, { recursive: true }, (error) => {
		writeFile(`${path}/vite-aliases.json`, JSON.stringify(data), (error) => {
			if(error) {
				log('An Error occured while creating the Logfile.');
			}
		});

		if(error) {
			log('[vite-aliases]: An Error occured while creating the Logfolder.')
		}
	});

	log('Logfile created!', 'green');
}