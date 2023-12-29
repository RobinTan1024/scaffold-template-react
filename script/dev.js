process.env.NODE_ENV = 'development';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { webpackConfigFactory } = require('./webpack.config');

const config = webpackConfigFactory();
const compiler = webpack(config);
const devServerOptions = { ...config.devServer, open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

const startDev = async () => {
    await server.start();
};

startDev();
