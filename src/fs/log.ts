import { mkdir, writeFile } from 'fs';
import { MODULE_NAME } from '../constants';
import type { Generator } from '../generator';
import { slash, terminal } from '../utils';

/**
 * Creates a Logfile
 * If needed it will also create a Logfolder
 */

export function writeLog(gen: Generator) {
	const { dir, allowLogging } = gen.options;

	if (!allowLogging) {
		return;
	}

	const folder = slash(`${dir}/logs`);
	const file = slash(`${folder}/${MODULE_NAME}.json`);
	const data = gen.aliases;

	mkdir(`${folder}`, { recursive: true }, (error) => {
		writeFile(`${file}`, JSON.stringify(data), (error) => {
			if (error) {
				terminal('An Error occured while creating the Log File!', 'warn');
			}
		});

		if (error) {
			terminal('An Error occured while creating the Log Folder.', 'warn');
		}
	});

	terminal('Log File successfully created!');
	return;
}
