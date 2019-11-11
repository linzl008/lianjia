let charset = require('superagent-charset'); //解决乱码问题:
let superagent = charset(require('superagent')); //发起请求
/*获取数据*/
function httpGET(url) {
    return new Promise(function(resolve){
        console.log('start',url);
        superagent
            .get(url)
            .buffer(true)
            .charset() //取决于网页的编码方式'gb2312' 不写会自动检查
            .end(function(err, res){
                setTimeout(()=>{
                    resolve(res.text)
                },100)
            });
    });
}
module.exports = { httpGET }