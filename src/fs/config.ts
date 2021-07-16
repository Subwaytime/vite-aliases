import { existsSync, readFileSync, writeFile } from 'fs';
import { slash, terminal } from '../utils';

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
	const file = slash(`${root}/${name}.json`);

	let data;

	if (existsSync(file)) {
		data = JSON.parse(readFileSync(`${file}`).toString());
		data.compilerOptions.paths = { ...data.compilerOptions.paths, ...gen.configPaths };
	} else {
		IDEConfig.compilerOptions.paths = { ...gen.configPaths };
		data = IDEConfig;
	}

	writeFile(`${file}`, JSON.stringify(data, null, 4), (error) => {
		if (error) {
			terminal(`An Error occured while creating the ${name} file`, 'error');
		}
	});

	terminal(`${name} file successfully created!`);
	return;
}
