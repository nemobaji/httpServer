const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);


app.use((req, res, next) => {
    console.log('모든 요청에 실행됩니다.');
    next();
});

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/index.html'));
    // only work at HTTP GET
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log('Server is running on PORT', app.get('port'));
});
