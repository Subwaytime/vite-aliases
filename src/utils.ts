import { resolve } from "path";

/**
 * Split String on Seperator into Array
 * @param string
 * @param seperator
 */

export function split(string: string, seperator: string) {
	return string.split(seperator);
}

/**
 * Returns a resolved Path based on current Directory
 * @param path
 */

export function setPath(path: string) {
	return resolve(__dirname, `${path}`);
}
