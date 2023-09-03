const path = require('path');

module.exports = {
    publicUrlOrPath: '',
    root: path.resolve(''),
    src: path.resolve('src'),
    entry: path.resolve('src/index.tsx'),
    template: path.resolve('index.html'),
    configTS: path.resolve('tsconfig.json'),
    configJS: path.resolve('jsconfig.json'),
    dist: path.resolve('dist'),
    stats: path.resolve('stats'),
    moduleFileExtensions: ['json', 'js', 'ts', 'tsx', 'jsx'],
};
