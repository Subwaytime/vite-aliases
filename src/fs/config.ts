import { existsSync, readFileSync, writeFile } from 'fs';
import type { Generator } from '../generator';
import { slash, terminal } from '../utils';
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
		data = IDEConfig.compilerOptions.paths = { ...gen.configPaths };
	}

	writeFile(`${file}`, JSON.stringify(data), (error) => {
		if (error) {
			terminal('An Error occured while creating the Config File', 'error');
		}
	});

	terminal('Config File successfully created!');
	return;
}
