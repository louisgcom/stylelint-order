export function hasBreakLineBefore(decl) {
	if (/\r?\n\s*/.test(decl.raw('before'))) {
		return true;
	}

	const prevNode = decl.prev();

	if (!prevNode) {
		return false;
	}

	if (prevNode.type !== 'comment') {
		return false;
	}

	if (/\r?\n\s*/.test(prevNode.raw('before'))) {
		return true;
	}

	return false;
}
