import { abort, slash, writeJSON } from '../utils';
import { mkdir } from 'fs/promises';

import type { Generator } from '../generator';
import { MODULE_NAME } from '../constants';
import type { Process } from '../types';

/**
 * Creates a Logfile
 * If needed it will also create a Logfolder
 */

export async function writeLog(gen: Generator, process: Process = 'normal') {
	const { dir, createLog } = gen.options;

	if (!createLog) {
		return;
	}

	const folder = slash(`${dir}/logs`);
	const file = slash(`${folder}/${MODULE_NAME}.json`);
	const data = gen.aliases;

	try {
		if(process != 'normal') {
			await mkdir(folder, { recursive: true });
		}
		await writeJSON(file, data, process);
	} catch(error) {
		abort(`Cannot create Logfolder ${folder}.`);
	}
}
