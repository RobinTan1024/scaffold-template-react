const fs = require('fs');
const paths = require('./paths');

module.exports = {
    isTypescript: fs.existsSync(paths.configTS),
};
