const stylelint = require('stylelint');
const ruleName = require('./ruleName');

module.exports = stylelint.utils.ruleMessages(ruleName, {
	expected: (first, second, groupName) =>
		`Expected "${first}" to come before "${second}"${
			groupName ? ` in group "${groupName}"` : ''
		}`,
	expectedBreakLineBefore: (property) => `Expected a break line before property "${property}"`,
	rejectedBreakLineBefore: (property) => `Unexpected break line before property "${property}"`,
	expectedEmptyLineBefore: (property) => `Expected an empty line before property "${property}"`,
	rejectedEmptyLineBefore: (property) => `Unexpected empty line before property "${property}"`,
});
