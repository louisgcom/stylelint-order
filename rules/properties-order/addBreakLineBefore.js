// Add a break line before a node. Mutates the node.

function getIndent(node) {
	if (node.prev()) {
		const m = node.prev().raws.before.match(/(?:\r?\n)([ \t]*)$/);
		if (m) return m[1];
	}
	if (node.parent && node.parent.first) {
		const m = node.parent.first.raws.before.match(/(?:\r?\n)([ \t]*)$/);
		if (m) return m[1];
	}
	return '';
}

export function addBreakLineBefore(node, newline) {
	if (!/\r?\n/.test(node.raws.before)) {
		node.raws.before = newline + getIndent(node) + node.raws.before;
	} else {
		node.raws.before = node.raws.before.replace(/(\r?\n)/, `${newline}$1`);
	}

	return node;
}