import { readdirSync } from 'fs';
import { resolve } from 'path';

export function getAliases(path: string) {
    const dirs = readdirSync(path, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

    if (!dirs.length) {
        console.warn('No Directories could be found!');
    }

    const aliases = dirs.reduce((alias: Record<string, string>, dir: string) => {
        alias[`/@${dir}/`] = resolve(__dirname, `${path}/${dir}`);
        return alias;
    }, {});

    return aliases;
};
