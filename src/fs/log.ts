import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';

import { MODULE_NAME } from '../constants';
import type { Generator } from '../generator';
import type { Process } from '../types';
import { abort, normalizePath, writeJSON } from '../utils';

/**
 * Creates a Logfile
 * If needed it will also create a Logfolder
 */

export async function writeLog(gen: Generator, process: Process = 'normal') {
	const { createLog, logPath } = gen.options;

	if (!createLog) {
		return;
	}

	const folder = normalizePath(logPath);
	const file = normalizePath(`${folder}/${MODULE_NAME}.json`);
	const data = gen.aliases;

	try {
		if (!existsSync(folder)) {
			await mkdir(folder, { recursive: true });
		}
		await writeJSON(file, data, process);
	} catch (error) {
		abort(`Cannot create Logfolder ${folder}.`);
	}
}
