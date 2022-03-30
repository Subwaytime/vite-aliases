import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';

import { abort, slash, writeJSON } from '../utils';
import type { Generator } from '../generator';
import { MODULE_NAME } from '../constants';
import type { Process } from '../types';

/**
 * Creates a Logfile
 * If needed it will also create a Logfolder
 */

export async function writeLog(gen: Generator, process: Process = 'normal') {
	const { dir, createLog, logPath } = gen.options;

	if (!createLog) {
		return;
	}

	const folder = slash(logPath);
	const file = slash(`${folder}/${MODULE_NAME}.json`);
	const data = gen.aliases;

	try {
		if(!existsSync(folder)) {
			await mkdir(folder, { recursive: true });
		}
		await writeJSON(file, data, process);
	} catch(error) {
		abort(`Cannot create Logfolder ${folder}.`);
	}
}
