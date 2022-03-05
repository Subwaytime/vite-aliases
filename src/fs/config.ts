import { existsSync } from 'fs';
import { abort, logger, readJSON, slash, writeJSON } from '../utils';

import type { Generator } from '../generator';
import { IDEConfig } from '../constants';
import type { Process } from '../types';

/**
 * Creates a JS or TS Configfile
 */

export async function writeConfig(gen: Generator, process: Process = 'normal') {
	const { root, dir, useTypescript, useConfig } = gen.options;

	if (!useConfig) {
		return;
	}

	const name = useTypescript ? 'tsconfig' : 'jsconfig';
	const file = slash(`${root}/${name}.json`);

	try {
		let json;
		if (existsSync(file)) {
			json = await readJSON(file);

			if (json.compilerOptions) {
				let paths = json.compilerOptions.paths || {};

				if (process === 'remove') {
					// TODO: more testcases?
					// get filtered paths but leave paths that are not linked to project dir
					paths = Object.fromEntries(Object.entries(paths).filter((p: any) => {
						if(Object.values(gen.paths).flat().includes(p[1][0]) && p[1][0].includes(dir)) {
							return p;
						} else if(!p[1][0].includes(dir)) {
							return p;
						}
					}));

					json.compilerOptions.paths = {...paths, ...gen.paths };
				} else {
					json.compilerOptions.paths = { ...paths, ...gen.paths };
				}
			} else {
				json.compilerOptions = {
					paths: { ...gen.paths },
				};
			}
		} else {
			IDEConfig.compilerOptions.paths = { ...gen.paths };
			json = Object.assign({}, IDEConfig);
		}
		await writeJSON(file, json, process);
	} catch (error) {
		abort(`Cannot write Config: ${file}.`);
	}
}
