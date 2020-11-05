import { readdirSync } from 'fs';
import { resolve } from 'path';

import { Options } from './types';

const defaultOptions: Options = {
    path: './src/',
    prefix: '@'
};

/**
 * Reads the Projectpath and returns Vite Aliases
 * @param options 
 * @returns Record<string, string>
 */

export function getAliases(options: Partial<Options> = {}) {
    const { path, prefix }: Options = Object.assign({}, defaultOptions, options);

    const dirs = readdirSync(path, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

    if (!dirs.length) {
        console.warn('No Directories could be found!');
    }

    const aliases = dirs.reduce((alias: Record<string, string>, dir: string) => {
        alias[`/${prefix}${dir}/`] = resolve(__dirname, `${path}/${dir}`);
        return alias;
    }, {});

    return aliases;
};
