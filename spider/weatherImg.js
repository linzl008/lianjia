const Http = require('./ajax');
const DataResolve = require('./dataResolve');
const request = require('request')
var fs = require('fs');
function  startTask() {
    console.log('start');
    startAjax();
}

async function startAjax(){
    let lists = ["100", "101", "102", "103", "104", "200", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "300", "301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "312", "313", "314", "315", "316", "317", "318", "399", "400", "401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "499", "500", "501", "502", "503", "504", "507", "508", "509", "510", "511", "512", "513", "514", "515", "900", "901", "999"]
    for (let i = 0; i < lists.length; i++) {
        const temp = lists[i];
        let imgSrc = 'https://cdn.heweather.com/img/plugin/190516/icon/c/'+temp+'d.png'
        request.head(imgSrc, function(error, res,body){
            if(error){
                console.log('失败了')
            }
        });
        //通过管道的方式用fs模块将图片写到本地的images文件下
        request(imgSrc).pipe(fs.createWriteStream('./images/weather/' + temp+'d.png'));
    }

}

module.exports = {
    startTask
}