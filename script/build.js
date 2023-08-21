process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const { webpackConfigFactory } = require('./webpack.config');

const config = webpackConfigFactory();
webpack(config, (e) => console.error(e));
