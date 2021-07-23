import { existsSync, readFileSync, writeFile } from 'fs';
import { slash, terminal } from '../utils';

import type { Generator } from '../generator';
import { IDEConfig } from '../constants';
import { parse } from 'jsonc-parser';

/**
 * Creates a JS or TS Configfile
 */

export function writeConfig(gen: Generator) {
	const { root, useTypescript, useConfig } = gen.options;

	if (!useConfig) {
		return;
	}

	const name = useTypescript ? 'tsconfig' : 'jsconfig';
	const file = slash(`${root}/${name}.json`);

	let json;

	if(existsSync(file)) {
		json = parse(readFileSync(`${file}`).toString());
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
