import {WebpackOverrideFn} from 'remotion';
import { container } from 'webpack'
import { dependencies as deps } from "../package.json"

const { ModuleFederationPlugin } = container;

export const webpackOverride: WebpackOverrideFn = (currentConfiguration) => {
	return {
		...currentConfiguration,
		plugins: [
			...(currentConfiguration.plugins || []),
			new ModuleFederationPlugin({
				name: "MyChassis",
				filename: "remoteEntry.js",
				exposes: ["./src/bootstrap"],
				
			})
		],
		module: {
			...currentConfiguration.module,
			rules: [
				...(currentConfiguration.module?.rules
					? currentConfiguration.module.rules
					: []
				).filter((rule) => {
					if (rule === '...') {
						return false;
					}
					if (rule.test?.toString().includes('.css')) {
						return false;
					}
					return true;
				}),
				{
					test: /\.css$/i,
					use: [
						'style-loader',
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [
										'postcss-preset-env',
										'tailwindcss',
										'autoprefixer',
									],
								},
							},
						},
					],
				},
			],
		},
	};
};
