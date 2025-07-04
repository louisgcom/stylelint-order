import { isBoolean, isString, isObject } from '../../utils/validateType.js';

export function validatePrimaryOption(actualOptions) {
	// Begin checking array options
	if (!Array.isArray(actualOptions)) {
		return false;
	}

	// Every item in the array must be a string or an object
	// with a "properties" property
	if (
		!actualOptions.every((item) => {
			if (isString(item)) {
				return true;
			}

			return isObject(item) && item.properties !== undefined;
		})
	) {
		return false;
	}

	const objectItems = actualOptions.filter(isObject);

	// Every object-item's "properties" should be an array with no items, or with strings
	if (
		!objectItems.every((item) => {
			if (!Array.isArray(item.properties)) {
				return false;
			}

			return item.properties.every((property) => isString(property));
		})
	) {
		return false;
	}

	// Every object-item's "emptyLineBefore" must be "always" or "never"
	if (
		!objectItems.every((item) => {
			if (item.emptyLineBefore === undefined) {
				return true;
			}

			return ['always', 'never', 'breakline', 'threshold'].includes(item.emptyLineBefore);
		})
	) {
		return false;
	}

	// Every object-item's "noEmptyLineBetween" must be a boolean
	if (
		!objectItems.every((item) => {
			if (item.noEmptyLineBetween === undefined) {
				return true;
			}

			return isBoolean(item.noEmptyLineBetween);
		})
	) {
		return false;
	}

	// Every object-item's "noBreakLineBetween" must be a boolean
	if (
		!objectItems.every((item) => {
			if (item.noBreakLineBetween === undefined) {
				return true;
			}

			return isBoolean(item.noBreakLineBetween);
		})
	) {
		return false;
	}

	return true;
}
