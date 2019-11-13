const Http = require('./ajax');
const DataResolve = require('./dataResolve');
var fs = require('fs');
async function startTask() {
    console.log('start');
    return await startAjax();
}

async function startAjax() {
    // let temp = "";
    // let type = '幼儿园'
    // navi_x: "12716454.0407"
    // navi_y: "2583138.01459"
    // temp = await Http.httpGET('https://api.map.baidu.com/?qt=bd&c=340&wd=%E5%B9%BC%E5%84%BF%E5%9B%AD&ar=(12716047.02%2C2579983.26%3B12720047%2C2583983.23)&rn=10&l=18&ie=utf-8&oue=1&fromproduct=jsapi&res=api&callback=BMap._rd._cbk51910&ak=dASz7ubuSpHidP1oQWKuAK3q');
    // console.log(temp);
    // return temp
}
module.exports = {
    startTask
}
