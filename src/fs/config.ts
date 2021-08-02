import { createScanner, parse } from 'jsonc-parser';
import { empty, slash, terminal } from '../utils';
import { existsSync, readFileSync, writeFile } from 'fs';

import type { Generator } from '../generator';
import { IDEConfig } from '../constants';

/**
 * Creates a JS or TS Configfile
 */

export function writeConfig(gen: Generator) {
	const { root, useTypescript, useConfig } = gen.options;

	if (!useConfig) {
		return;
	}

	const name = useTypescript ? 'tsconfig' : 'jsconfig';
	let file = slash(`${root}/${name}.json`);
	let json;

	if(existsSync(file)) {
		file = readFileSync(`${file}`).toString();
		let errors: any[] = [];
		json = parse(file, errors, { disallowComments: true });

		if(!empty(errors)) {
			throw new Error(
				`Can't read JSON Config File, if it contains Comments please remove them.
				For more Information: https://github.com/Subwaytime/vite-aliases/issues/25`,
			);
		}

		if(json.compilerOptions) {
			const paths = json.compilerOptions.paths || {};
			json.compilerOptions.paths = { ...paths, ...gen.configPaths };
		} else {
			json.compilerOptions = {
				paths: {...gen.configPaths }
			}
		}
	} else {
		IDEConfig.compilerOptions.paths = { ...gen.configPaths };
		json = Object.assign({}, IDEConfig);
	}

	writeFile(`${file}`, JSON.stringify(json, null, 4), (error) => {
		if (error) {
			terminal(`An Error occured while creating the ${name} file`, 'error');
		}
	});

	terminal(`${name} file successfully created!`);
	return;
}
