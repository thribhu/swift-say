module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true, // Add the 'node' environment
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
	},
	globals: {
		__dirname: 'readonly', // Allow using __dirname as a readonly global variable
	},
};
