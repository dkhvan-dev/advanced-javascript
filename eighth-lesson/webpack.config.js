module.exports = {
	mode: 'development',
	entry: './script',
	output: {
		filename: './build.js'
	},
	watch: true,
	watchOptions: {
		aggregateTimeout: 500,
		poll: 1000
	}
}