import { empty, logger, slash } from '../utils';
import { existsSync, readFileSync, writeFile } from 'fs';

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
		const data = readFileSync(`${file}`).toString();
		let errors: any[] = [];
		json = parse(data, errors, { disallowComments: true });

		if(!empty(errors)) {
			throw logger.error(new Error(
				`Can't read JSON Config File, if it contains Comments please remove them.For more Information: https://github.com/Subwaytime/vite-aliases/issues/25`
			));
		}

		if(json.compilerOptions) {
			const paths = json.compilerOptions.paths || {};
			json.compilerOptions.paths = { ...paths, ...gen.paths };
		} else {
			json.compilerOptions = {
				paths: { ...gen.paths },
			};
		}
	} else {
		IDEConfig.compilerOptions.paths = { ...gen.paths };
		json = Object.assign({}, IDEConfig);
	}

	writeFile(`${file}`, JSON.stringify(json, null, 4), (error) => {
		if (error) {
			throw logger.error(new Error(`An Error occured while creating the ${name} file`));
		}
	});

	logger.success(`${name} file successfully created!`);
	return;
}
