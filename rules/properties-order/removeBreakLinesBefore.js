// Remove empty lines before a node. Mutates the node.
export function removeBreakLinesBefore(node) {
	node.raws.before = node.raws.before.replace(/(\r?\n\s*)+/g, '');

	return node;
}