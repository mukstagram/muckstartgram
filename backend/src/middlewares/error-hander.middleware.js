const errorLogger = (error, request, response, next) => {
    console.error(error);
    //파일로 만들어야해요!
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
