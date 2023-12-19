export default await Bun.build({
	entrypoints: ['./src/index.ts'],
	outdir: './dist',
	minify: true,
	format: 'esm',
	target: 'node',
	external: ['vite', 'consola', 'chokidar']
});

console.info('Build successful! ✅');
