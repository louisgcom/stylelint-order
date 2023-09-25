const addBreakLineBefore = require('../addBreakLineBefore');
const postcss = require('postcss');

function addBreakLine(css, lineEnding) {
	const root = postcss.parse(css);

	addBreakLineBefore(root.nodes[1], lineEnding);

	return root.toString();
}

describe('addBreakLineBefore', () => {
	it('adds single newline to the newline at the beginning', () => {
		expect(addBreakLine('a {}  b{}', '\n')).toBe('a {}\n  b{}');
	});

	it('adds single newline to newline at the beginning with CRLF', () => {
		expect(addBreakLine('a {}  b{}', '\r\n')).toBe('a {}\r\n  b{}');
	});

	it('adds single newline to newline at the end', () => {
		expect(addBreakLine('a {}\tb{}', '\n')).toBe('a {}\n\tb{}');
	});

	it('adds single newline to newline at the end with CRLF', () => {
		expect(addBreakLine('a {}\tb{}', '\r\n')).toBe('a {}\r\n\tb{}');
	});

	it('adds newline if there are already an existing breakline', () => {
		expect(addBreakLine('a {}\nb{}', '\n')).toBe('a {}\n\nb{}');
	});

	it('adds newline if there are already an existing breakline with CRLF', () => {
		expect(addBreakLine('a {}\r\nb{}', '\r\n')).toBe('a {}\r\n\r\nb{}');
	});
});
