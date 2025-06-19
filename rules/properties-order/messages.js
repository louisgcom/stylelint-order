import stylelint from 'stylelint';
import { ruleName } from './ruleName.js';

export const messages = stylelint.utils.ruleMessages(ruleName, {
	expected: (first, second, groupName) =>
		`Expected "${first}" to come before "${second}"${
			groupName ? ` in group "${groupName}"` : ''
		}`,
	expectedBreakLineBefore: (property) => `Expected a break line before property "${property}"`,
	rejectedBreakLineBefore: (property) => `Unexpected break line before property "${property}"`,
	expectedEmptyLineBefore: (property) => `Expected an empty line before property "${property}"`,
	rejectedEmptyLineBefore: (property) => `Unexpected empty line before property "${property}"`,
});
