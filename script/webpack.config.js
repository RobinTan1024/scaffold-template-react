const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const paths = require('./paths');

const webpackConfigFactory = (env) => {
    const isDev = process.env.NODE_ENV !== 'production';
    const config = {
        mode: isDev ? 'development' : 'production',
        entry: paths.entry,
        devtool: 'inline-source-map',
        devServer: { static: paths.dist, port: 8080 },
        module: {
            rules: [
                {
                    test: /\.(js|mjs|jsx|tsx|ts)$/,
                    include: paths.src,
                    exclude: /node_modules/,
                    loader: require.resolve('babel-loader'),
                    options: {
                        customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                        presets: [
                            [
                                require.resolve('babel-preset-react-app'),
                                {
                                    runtime: 'automatic', // 'classic'
                                },
                            ],
                        ],
                        plugins: [require.resolve('react-refresh/babel')],
                        // This is a feature of `babel-loader` for webpack (not Babel itself).
                        // It enables caching results in ./node_modules/.cache/babel-loader/
                        // directory for faster rebuilds.
                        cacheDirectory: true,
                        // See #6846 for context on why cacheCompression is disabled
                        cacheCompression: false,
                        compact: !isDev,
                    },
                },
                {
                    test: /\.(js|mjs)$/,
                    exclude: /@babel(?:\/|\\{1,2})runtime/,
                    loader: require.resolve('babel-loader'),
                    options: {
                        babelrc: false,
                        configFile: false,
                        compact: false,
                        presets: [[require.resolve('babel-preset-react-app/dependencies'), { helpers: true }]],
                        cacheDirectory: true,
                        // See #6846 for context on why cacheCompression is disabled
                        cacheCompression: false,
                        // Babel sourcemaps are needed for debugging into node_modules
                        // code.  Without the options below, debuggers like VSCode
                        // show incorrect code and set breakpoints on the wrong lines.
                        sourceMaps: true,
                        inputSourceMap: true,
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: paths.template,
            }),
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
        },
        output: {
            filename: '[name].bundle.js',
            path: paths.dist,
        },
    };

    if (isDev) {
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new ReactRefreshWebpackPlugin({
                overlay: false,
            }),
        );
    }

    return config;
};

module.exports = { webpackConfigFactory };
