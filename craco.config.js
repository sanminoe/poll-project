import webpack from 'webpack';
module.exports = {
	style: {
		postcss: {
			plugins: [ require('tailwindcss'), require('autoprefixer') ]
		}
	},
	webpack: {
		plugins: [
			new webpack.DefinePlugin({
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				REACT_APP_API_KEY: JSON.stringify(process.env.REACT_APP_API_KEY)
			})
		]
	}
};
