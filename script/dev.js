const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

process.env.NODE_ENV = 'development';
const isDevelopment = process.env.NODE_ENV !== 'production';

const webpackConfig = {
    mode: 'development',
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, '../dist'),
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|tsx|ts)$/,
                include: path.resolve(__dirname, '../src'),
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
                    compact: !isDevelopment,
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
            template: path.resolve(__dirname, '../index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        isDevelopment &&
            new ReactRefreshWebpackPlugin({
                overlay: false,
            }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
};

const compiler = webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer, open: false };
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
    await server.start();
};

runServer();
