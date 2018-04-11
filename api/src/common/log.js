const logger = require('winston');

// const logger = createLogger({
//     transports: [new transports.Console()]
// });
logger.level = 'debug';

module.exports = logger