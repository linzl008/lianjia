
const cheerio = require('cheerio');

/*处理一层的数据  省级 */
function resolveLevel_1(html){
    const hrefPrev = 'http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2018/';
    const $ = cheerio.load(html);
    let province = [];
    $('.provincetable .provincetr td').each((i,ele)=>{
        province.push({
            name: $(ele).children('a').text(),
            href: hrefPrev+$(ele).children('a').attr('href'),
        })
    })
    return province;
}
/*处理二层的数据  市级 */
function resolveLevel_2(html){
    const hrefPrev = 'http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2018/';
    const $ = cheerio.load(html);
    let cities = [];
    $('.citytable .citytr').each((i,ele)=>{
        cities.push({
            code: $(ele).children('td').eq(0).children('a').text(),
            name: $(ele).children('td').eq(1).children('a').text(),
            href: hrefPrev+$(ele).children('td').eq(1).children('a').attr('href'),
        })
    })
    return cities;
}
/*处理三层的数据  县级 会出现没有下级的情况 */
function resolveLevel_3(html){
    const hrefPrev = 'http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2018/';
    const $ = cheerio.load(html);
    let counties = [];
    $('.countytable .countytr').each((i,ele)=>{
        if($(ele).children('td').eq(0).children('a').text()){
            counties.push({
                code: $(ele).children('td').eq(0).children('a').text(),
                name: $(ele).children('td').eq(1).children('a').text(),
                href: hrefPrev+$(ele).children('td').eq(1).children('a').attr('href'),
            })
        }else{
            counties.push({
                code: $(ele).children('td').eq(0).text(),
                name: $(ele).children('td').eq(1).text(),
                href: "",
            })
        }
    })
    return counties;
}


module.exports ={
    resolveLevel_1,
    resolveLevel_2,
    resolveLevel_3
}