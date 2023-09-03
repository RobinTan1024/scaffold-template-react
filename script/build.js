process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs');
const { webpackConfigFactory } = require('./webpack.config');
const packageJson = require('../package.json');
const paths = require('./paths');

const build = async () => {
    console.clear();
    const msg_building = ora('🚀 Building package ' + chalk.greenBright(`${packageJson.name}:${packageJson.version}`)).start();

    const config = webpackConfigFactory();
    webpack(config, (error, stats) => {
        console.clear();
        if (error) {
            process.exit(1);
        }
        if (stats) {
            fs.writeFileSync(paths.stats, stats.toString());
            msg_building.text = '';
            msg_building.stopAndPersist();
            process.exit(0);
        }
    });
};

build();
