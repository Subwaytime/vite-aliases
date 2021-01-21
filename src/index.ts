import { readdirSync, writeFile } from 'fs';
import { resolve } from 'path';

import { Options } from './types';

const defaultOptions: Options = {
    path: './src/',
    log_path: './src/logs',
    prefix: '@',
    addLeadingSlash: false,
    allowGlobalAlias: true,
    allowLogging: false,
    root: process.cwd()
};

/**
 * Reads the Projectpath and returns Vite Aliases
 * @param options
 * @returns Record<string, string>
 */

export function getAliases(options: Partial<Options> = {}) {
    const {
        path,
        log_path,
        prefix,
        addLeadingSlash,
        allowGlobalAlias,
        allowLogging,
        root
    }: Options = Object.assign({}, defaultOptions, options);

    // get all folders from the project directory
    const dirs = readdirSync(path, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

    if (!dirs.length) {
        console.warn('No Directories could be found!');
    }

    // add leading Slash to prefix if needed
    const aliasPrefix = (addLeadingSlash ? `/${prefix}` : prefix);

    // turn directory array into alias object
    const aliases = dirs.reduce((alias: Record<string, string>, dir: string) => {
        alias[`${aliasPrefix}${dir}`] = resolve(root, `${path}/${dir}`);
        return alias;
    }, {});

    // add global alias for the whole project folder
    if (allowGlobalAlias) {
        aliases[`${aliasPrefix}`] = resolve(root, `${path}`);
    }

    // log all aliases into one file
    if(allowLogging) {
        writeFile(log_path, JSON.stringify(aliases), () => {});
    }

    return aliases;
};
