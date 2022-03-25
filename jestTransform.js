const transformer = require('babel-jest');

const config = {
	babelrc: false,
	presets: [
		"@babel/preset-env",
	],
};

module.exports = transformer.default.createTransformer(config);