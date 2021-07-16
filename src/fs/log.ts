import { mkdir, writeFile } from 'fs';
import { slash, terminal } from '../utils';

import type { Generator } from '../generator';
import { MODULE_NAME } from '../constants';

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
		writeFile(`${file}`, JSON.stringify(data, null, 4), (error) => {
			if (error) {
				terminal('An Error occured while creating the log File!', 'warning');
			}
		});

		if (error) {
			terminal('An Error occured while creating the logfolder.', 'warning');
		}
	});

	terminal('Logfile successfully created!');
	return;
}
