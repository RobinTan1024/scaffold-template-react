const env = require('./script/env');

const ruleErrorLevel = env.isProductionMode ? 2 : 1;

module.exports = {
    root: true,
    env: {
        browser: true,
        jest: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'prettier'],
    plugins: ['@typescript-eslint', 'react'],
    globals: {
        // Set global variables here (setting to false means it's not allowed to be reassigned)
        // myGlobal: false
    },
    rules: {
        quotes: [ruleErrorLevel, 'single'],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
