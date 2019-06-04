const { getLogger } = require('./lib/index');

const logger = getLogger('foo');

logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');
