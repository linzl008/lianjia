const Http = require('./ajax');
const DataResolve = require('./dataResolve');
var fs = require('fs');
function  startTask() {
    console.log('start');
    startAjax();
}

async function startAjax(){
    let temp = "";
    temp = await Http.httpGET('http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2018/index.html');
    let province = DataResolve.resolveLevel_1(temp);
    let level = province.length
    // 处理二层的数据
    for (let i = 0; i < level; i++) {
        const provinceElement = province[i];
        temp = await Http.httpGET(provinceElement.href);
        province[i].children = DataResolve.resolveLevel_2(temp);
    }
    // 处理三层数据
    for (let i = 0; i <level; i++) {
        const provinceElement = province[i];
        if(provinceElement.children && provinceElement.children.length > 0){
            for (let j = 0; j < provinceElement.children.length; j++) {
                const cityElement1 = provinceElement.children[j];
                temp = await Http.httpGET(cityElement1.href);
                province[i].children[j].children = DataResolve.resolveLevel_3(temp);
            }
        }
    }
    let Str_ans = JSON.stringify(province,null, 4);
    fs.writeFile('ret.json', Str_ans, 'utf8', (err) => {
        if (err) throw err;
        console.log('done');
    });
}

module.exports = {
    startTask
}