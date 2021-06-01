import { mkdir, writeFile } from "fs";
import { MODULE_NAME } from "../constants";
import type { Generator } from "../generator";

/**
 * Creates a Logfile
 * If needed it will also create a Logfolder
 */

export function writeLog(gen: Generator) {
	const { dir, allowLogging } = gen.options;

	if(!allowLogging) {
		return;
	}

	const folder = `${dir}/logs`;

	const data = gen.aliases;

	mkdir(`${dir}/logs`, { recursive: true }, (error) => {
		writeFile(`${folder}/${MODULE_NAME}.json`, JSON.stringify(data), (error) => {
			if(error) {
				console.log(`[${MODULE_NAME}]: An Error occured while creating the Log File!`);
			}
		});

		if(error) {
			console.log(`[${MODULE_NAME}]: An Error occured while creating the Log Folder.`);
		}
	});

	console.log('Log File successfully created!');
	return;
}