import { rule } from '../index.js';

const { ruleName, messages } = rule;

testRule({
	ruleName,
	config: [
		[
			{
				noEmptyLineBetween: true,
				noBreakLineBetween: true,
				properties: ['display', 'vertical-align', 'content'],
			},
			{
				noEmptyLineBetween: true,
				noBreakLineBetween: true,
				properties: ['position', 'top', 'bottom'],
			},
		],
	],
	fix: true,

	accept: [
		{
			code: `
				a {
					display: block;vertical-align: middle;content: "";
					position: absolute;top: 0;bottom: 0;
				}
			`,
		},
		{
			code: `
				a {
					display: block;vertical-align: middle;content: "";

					position: absolute;top: 0;bottom: 0;
				}
			`,
		},
		{
			code: `
				a {
					vertical-align: middle;

					top: 0;bottom: 0;
				}
			`,
		},
	],

	reject: [
		{
			code: `
				a {
					display: block;
					vertical-align: middle;content: "";
				}
			`,
			fixed: `
				a {
					display: block;vertical-align: middle;content: "";
				}
			`,
			message: messages.rejectedBreakLineBefore('vertical-align'),
		},
		{
			code: `
				a {
					display: block;vertical-align: middle;
					content: "";
				}
			`,
			fixed: `
				a {
					display: block;vertical-align: middle;content: "";
				}
			`,
			message: messages.rejectedBreakLineBefore('content'),
		},
	],
});

testRule({
	ruleName,
	config: [
		[
			{
				noEmptyLineBetween: true,
				noBreakLineBetween: true,
				properties: ['display', 'vertical-align', 'content'],
			},
			{
				noEmptyLineBetween: true,
				noBreakLineBetween: true,
				properties: ['position', 'top', 'bottom'],
			},
		],
	],
	customSyntax: 'postcss-styled-syntax',
	fix: true,

	accept: [
		{
			code: `
				const Component = styled.div\`
					display: block;vertical-align: middle;content: "";
					position: absolute;top: 0;bottom: 0;
				\`;
			`,
		},
	],

	reject: [
		{
			code: `
				const Component = styled.div\`
					display: block;
					vertical-align: middle;content: "";
				\`;
			`,
			fixed: `
				const Component = styled.div\`
					display: block;vertical-align: middle;content: "";
				\`;
			`,
			message: messages.rejectedBreakLineBefore('vertical-align'),
		},
	],
});

testRule({
	ruleName,
	config: [
		[
			{
				emptyLineBefore: 'always',
				noEmptyLineBetween: true,
				noBreakLineBetween: true,
				properties: ['display', 'vertical-align', 'content'],
			},
			{
				emptyLineBefore: 'always',
				noEmptyLineBetween: true,
				noBreakLineBetween: true,
				properties: ['position', 'top', 'bottom'],
			},
		],
	],
	fix: true,

	accept: [
		{
			code: `
				a {
					display: block;vertical-align: middle;content: "";

					position: absolute;top: 0;bottom: 0;
				}
			`,
		},
		{
			code: `
				a {
					vertical-align: middle;

					top: 0;bottom: 0;
				}
			`,
		},
	],

	reject: [
		{
			code: `
				a {
					display: block;
					vertical-align: middle;content: "";

					top: 0;bottom: 0;
				}
			`,
			fixed: `
				a {
					display: block;vertical-align: middle;content: "";

					top: 0;bottom: 0;
				}
			`,
			message: messages.rejectedBreakLineBefore('vertical-align'),
		},
	],
});

testRule({
	ruleName,
	config: [
		[
			{
				emptyLineBefore: 'always',
				noEmptyLineBetween: true,
				noBreakLineBetween: true,
				order: 'flexible',
				properties: ['height', 'width'],
			},
			{
				emptyLineBefore: 'always',
				noEmptyLineBetween: true,
				noBreakLineBetween: true,
				order: 'flexible',
				properties: ['font-size', 'font-weight'],
			},
		],
	],
	fix: true,

	accept: [
		{
			code: `
				a {
					height: 1px;width: 2px;

					font-size: 2px;font-weight: bold;
				}
			`,
		},
		{
			code: `
				a {
					height: 1px;width: 2px;

					font-weight: bold;font-size: 2px;
				}
			`,
		},
	],

	reject: [
		{
			code: `
				a {
					height: 1px;width: 2px;

					font-weight: bold;
					font-size: 2px;
				}
			`,
			fixed: `
				a {
					height: 1px;width: 2px;

					font-weight: bold;font-size: 2px;
				}
			`,
			message: messages.rejectedBreakLineBefore('font-size'),
		},
		{
			code: `
				a {
					height: 1px;width: 2px;

					font-size: 2px;
					font-weight: bold;
				}
			`,
			fixed: `
				a {
					height: 1px;width: 2px;

					font-size: 2px;font-weight: bold;
				}
			`,
			message: messages.rejectedBreakLineBefore('font-weight'),
		},
	],
});
