const fs = require('fs');
const paths = require('./paths');

module.exports = {
    isProductionMode: process.env.NODE_ENV === 'production',
    isTypescript: fs.existsSync(paths.configTS),
};
