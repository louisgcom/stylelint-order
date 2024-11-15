let stylelint = require('stylelint');
const { isString } = require('../../utils/validateType');
let addBreakLineBefore = require('./addBreakLineBefore');
let addEmptyLineBefore = require('./addEmptyLineBefore');
let hasEmptyLineBefore = require('./hasEmptyLineBefore');
let hasBreakLineBefore = require('./hasBreakLineBefore');
let removeEmptyLinesBefore = require('./removeEmptyLinesBefore');
let removeBreakLinesBefore = require('./removeBreakLinesBefore');
let ruleName = require('./ruleName');
let messages = require('./messages');

module.exports = function checkEmptyLineBefore({
	firstPropData,
	secondPropData,
	propsCount,
	lastKnownSeparatedGroup,
	context,
	emptyLineBeforeUnspecified,
	emptyLineMinimumPropertyThreshold,
	isFixEnabled,
	primaryOption,
	result,
}) {
	let firstPropIsSpecified = Boolean(firstPropData.orderData);
	let secondPropIsSpecified = Boolean(secondPropData.orderData);

	// Check newlines between groups
	let firstPropGroup = firstPropIsSpecified
		? firstPropData.orderData.separatedGroup
		: lastKnownSeparatedGroup;
	let secondPropGroup = secondPropIsSpecified
		? secondPropData.orderData.separatedGroup
		: lastKnownSeparatedGroup;

	// eslint-disable-next-line no-param-reassign
	lastKnownSeparatedGroup = secondPropGroup;

	let startOfSpecifiedGroup = secondPropIsSpecified && firstPropGroup !== secondPropGroup;
	let startOfUnspecifiedGroup = firstPropIsSpecified && !secondPropIsSpecified;

	if (startOfSpecifiedGroup || startOfUnspecifiedGroup) {
		// Get an array of just the property groups, remove any solo properties
		let groups = primaryOption.filter((item) => !isString(item));

		let emptyLineBefore =
			groups[secondPropGroup - 2] && groups[secondPropGroup - 2].emptyLineBefore;

		if (startOfUnspecifiedGroup) {
			emptyLineBefore = emptyLineBeforeUnspecified;
		}

		// Threshold logic
		let belowEmptyLineThreshold = propsCount < emptyLineMinimumPropertyThreshold;
		let emptyLineThresholdInsertLines =
			emptyLineBefore === 'threshold' && !belowEmptyLineThreshold;
		let emptyLineThresholdRemoveLines =
			emptyLineBefore === 'threshold' && belowEmptyLineThreshold;

		if (
			emptyLineBefore === 'breakline' &&
			(!hasBreakLineBefore(secondPropData.node) || hasEmptyLineBefore(secondPropData.node))
		) {
			if (isFixEnabled) {
				if (!hasBreakLineBefore(secondPropData.node)) {
					addBreakLineBefore(secondPropData.node, context.newline);
				} else {
					removeEmptyLinesBefore(secondPropData.node, context.newline);
				}
			} else if (!hasBreakLineBefore(secondPropData.node)) {
				stylelint.utils.report({
					message: messages.expectedBreakLineBefore(secondPropData.name),
					node: secondPropData.node,
					result,
					ruleName,
				});
			} else {
				stylelint.utils.report({
					message: messages.expectedBreakLineBefore(secondPropData.name),
					node: secondPropData.node,
					result,
					ruleName,
				});
			}
		} else if (
			(emptyLineBefore === 'always' || emptyLineThresholdInsertLines) &&
			!hasEmptyLineBefore(secondPropData.node)
		) {
			if (isFixEnabled) {
				addEmptyLineBefore(secondPropData.node, context.newline);
			} else {
				stylelint.utils.report({
					message: messages.expectedEmptyLineBefore(secondPropData.name),
					node: secondPropData.node,
					result,
					ruleName,
				});
			}
		} else if (
			(emptyLineBefore === 'never' || emptyLineThresholdRemoveLines) &&
			hasEmptyLineBefore(secondPropData.node)
		) {
			if (isFixEnabled) {
				removeEmptyLinesBefore(secondPropData.node, context.newline);
			} else {
				stylelint.utils.report({
					message: messages.rejectedEmptyLineBefore(secondPropData.name),
					node: secondPropData.node,
					result,
					ruleName,
				});
			}
		}
	}

	// Check newlines between properties inside a group
	if (
		firstPropIsSpecified &&
		secondPropIsSpecified &&
		firstPropData.orderData.groupPosition === secondPropData.orderData.groupPosition
	) {
		if (
			secondPropData.orderData.noEmptyLineBeforeInsideGroup &&
			hasEmptyLineBefore(secondPropData.node)
		) {
			if (isFixEnabled) {
				removeEmptyLinesBefore(secondPropData.node, context.newline);
			} else {
				stylelint.utils.report({
					message: messages.rejectedEmptyLineBefore(secondPropData.name),
					node: secondPropData.node,
					result,
					ruleName,
				});
			}
		}

		if (
			secondPropData.orderData.noEmptyLineBeforeInsideGroup &&
			secondPropData.orderData.noBreakLineBeforeInsideGroup &&
			hasBreakLineBefore(secondPropData.node)
		) {
			if (isFixEnabled) {
				removeBreakLinesBefore(secondPropData.node, context.newline);
			} else {
				stylelint.utils.report({
					message: messages.rejectedBreakLineBefore(secondPropData.name),
					node: secondPropData.node,
					result,
					ruleName,
				});
			}
		}
	}
};
