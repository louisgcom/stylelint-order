// Add an empty line before a node. Mutates the node.
export function addBreakLineBefore(node, newline) {
	if (!/\r?\n/.test(node.raws.before)) {
		node.raws.before = newline + node.raws.before;
	} else {
		node.raws.before = node.raws.before.replace(/(\r?\n)/, `${newline}$1`);
	}

	return node;
}