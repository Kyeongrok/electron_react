/**
 * Created by kyeongrok on 2017-07-02.
 */
let client = require("cheerio-httpcli");
let printHttpResponse = (baseUrl, param, callback) =>client.fetch(baseUrl, param, (err, $, res, body)=>{
    callback(body);
});


exports.printHttpResponse = printHttpResponse;

