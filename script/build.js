const path = require('path');
const webpack = require('webpack');

webpack(
    {
        mode: 'production',
        entry: './src/index.ts',
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts'],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, '../dist'),
        },
    },
    (error, _stats) => {
        console.error(error);
    },
);
