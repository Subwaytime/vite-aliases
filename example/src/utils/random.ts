/**
 * Return a Random Hexcode
 */

export function random() {
	const n = (Math.random() * 0xFFFFF * 1000000).toString(16);
	return `#${n.slice(0, 6)}`;
}
