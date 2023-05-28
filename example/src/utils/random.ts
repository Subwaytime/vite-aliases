/**
 * Return a Random Hexcode
 */

export function random() {
	let n = (Math.random() * 0xfffff * 1000000).toString(16);
	return '#' + n.slice(0, 6);
};