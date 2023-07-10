// Add an empty line before a node. Mutates the node.
module.exports = function addBreakLineBefore(node, newline) {
	if (!/\r?\n/.test(node.raws.before)) {
		node.raws.before = newline + node.raws.before;
	}

	return node;
};
