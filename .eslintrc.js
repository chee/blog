module.exports = {
	env: {
		browser: true,
		es6: true
	},
	extends: 'react-app',
	installedESLint: true,
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true
		},
		sourceType: 'module'
	},
	plugins: [
		'react'
	],
	rules: {
		indent: [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		quotes: [
			'error',
			'single'
		],
		semi: [
			'error',
			'never'
		],
		'no-console': [
			'warn'
		],
		'guard-for-in': 0,
		eqeqeq: 0,
		'new-parens': 0,
		'jsx-quotes': [
			'error',
			'prefer-double'
		],
		'array-bracket-spacing': [
			'error',
			'never'
		],
		'block-spacing': [
			'error',
			'always'
		],
		'brace-style': [
			'error',
			'1tbs'
		],
		'comma-dangle': [
			'error',
			'never',
		],
		'comma-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'comma-style': [
			'error',
			'last'
		],
		'computed-property-spacing': [
			'error',
			'never'
		],
		'func-call-spacing': [
			'error',
			'never'
		],
		'key-spacing': [
			'error',
			{
				beforeColon: false,
				afterColon: true,
				mode: 'strict'
			}
		],
		'keyword-spacing': [
			'error',
			{
				before: true,
				after: true,
				overrides: {
					catch: {
						after: false
					}
				}
			}
		],
		'line-comment-position': [
			'error',
			{
				position: 'above'
			}
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'max-params': [
			'error',
			3
		],
		'max-statements-per-line': [
			'error',
			{
				'max': 1
			}
		],
		'no-lonely-if': 'error',
		'no-negated-condition': 'error',
		'no-tabs': 'error',
		'no-trailing-spaces': 'error',
		'no-unneeded-ternary': 'error',
		'no-whitespace-before-property': 'error',
		'object-curly-spacing': [
			'error',
			'never'
		],
		'quote-props': [
			'error',
			'as-needed'
		],
		'space-before-blocks': [
			'error',
			'always'
		],
		'space-before-function-paren': [
			'error',
			'never'
		],
		'space-in-parens': [
			'error',
			'never'
		],
		'space-infix-ops': ['error'],
		'space-unary-ops': [
			'error',
			{
				words: true,
				nonwords: false
			}
		]
	}
}
