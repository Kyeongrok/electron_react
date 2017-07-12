/**
 * Created by Kyeongrok.kim on 2017-06-06.
 */
// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const app = express();
const https = require('https');
const cafe24 = require('./cafe24.js');

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(cors());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Always return the main index.html, so react-router render the route in the client
app.get('/', cors(corsOptions), (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.get('/about', (req, res) => {
    res.send('Hello World!');
});

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/aprskin', (req, res) => {
    //let startDatetime = res['query']['start_datetime'];
    console.log(req.query.start_datetime);
    let param = {
        "service_type":"aprilskinkor"
        ,"mall_id":"onesper"
        ,"data_type":"json"
        ,"auth_code":"995ff59dd187520a69b3a89cc2e71e28"
        ,"start_datetime":"2017-07-11 15:34:00"
        ,"end_datetime":"2017-07-11 15:36:00"
    }

    cafe24.printHttpResponse(
        "https://datahub.cafe24.com/openapi/shop/order/v1/search",
        param,(body)=>{
            //console.log(body);
            res.send(body);
        }
    );


});


app.get('/aprskin', (req, res) => {
    //product은 아래 주소에서 호출함
    //https://datahub.cafe24.com/openapi/shop/product/v1/search
});

module.exports = app;