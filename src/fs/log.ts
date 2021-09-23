import { logger, slash } from '../utils';
import { mkdir, writeFile } from 'fs';

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
				throw logger.error(new Error('An Error occured while creating the log File!'));
			}
		});

		if (error) {
			throw logger.error(new Error('An Error occured while creating the logfolder.'));
		}
	});

	logger.success('log successfully created!');
	return;
}
