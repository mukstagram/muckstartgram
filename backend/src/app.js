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

//Body
app.use(express.json());
app.use(cookieParser());
app.use(cors({ exposedHeaders: ['Authorization'] }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use((req,res,next)=>{
    if (req.headers['content-type'] !== 'application/json') {
        res.status(403).send('Forbidden');
        return;
    }
    next();
})

// 라우터 등록
app.use('/api', routes);

//Error 핸들러
app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler

app.listen(PORT, () => {
    console.log(PORT, '서버를 실행 중 입니다.');
});
