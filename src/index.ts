import { readdirSync } from 'fs';
import { resolve } from 'path';

import { Options } from './types';

const defaultOptions: Options = {
    path: './src/',
    prefix: '@',
    allowGlobalAlias: true,
    root: process.cwd()
};

/**
 * Reads the Projectpath and returns Vite Aliases
 * @param options 
 * @returns Record<string, string>
 */

export function getAliases(options: Partial<Options> = {}) {
    const { path, prefix, allowGlobalAlias, root }: Options = Object.assign({}, defaultOptions, options);

    const dirs = readdirSync(path, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

    if (!dirs.length) {
        console.warn('No Directories could be found!');
    }

    // turn directory array into alias object 
    const aliases = dirs.reduce((alias: Record<string, string>, dir: string) => {
        alias[`/${prefix}${dir}/`] = resolve(root, `${path}/${dir}`);
        return alias;
    }, {});

    // add global alias for the whole project folder
    if (allowGlobalAlias) {
        aliases[`/${prefix}/`] = resolve(root, `${path}`);
    }

    return aliases;
};
