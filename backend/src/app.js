const express = require('express');
const routes = require('./routes');
require('dotenv').config();
const {
    errorHandler,
    errorLogger,
} = require('./middlewares/error-hander.middleware');

const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT;
const cors = require('cors');
const morgan = require('morgan');
const Winston = require('./util/WinstonUtil.js')

app.use(morgan(":method :status :url :response-time ms", { stream: Winston.stream }));

//Body
app.use(express.json());
app.use(cookieParser());
app.use(cors({ exposedHeaders: ['Authorization'] }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// 라우터 등록
app.use('/api', routes);

//Error 핸들러
app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler

app.listen(PORT, () => {
    console.log(PORT, '서버를 실행 중 입니다.');
});
