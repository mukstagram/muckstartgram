const Winston = require('../util/WinstonUtil.js')
const errorLogger = (error, request, response, next) => {
    Winston.error(error.stack);
    next(error);
};

const errorHandler = (error, req, res, next) => {
    if (error.name.includes('Sequelize')) {
        res.status(500).json({ errorMessage: 'Internal Server Error' });
    }
    res.status(error.status || 400).json({
        errorMessage: error.message,
        type: error.type,
    });
};

module.exports = { errorLogger, errorHandler };
