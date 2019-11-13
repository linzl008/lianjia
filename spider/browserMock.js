const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone6 = devices['iPhone 6'];
var fs = require('fs');

async function getLianJiaBaseInfo(urlList){
    const browser = await puppeteer.launch({
        // 关闭无头模式，方便我们看到这个无头浏览器执行的过程
        headless: false,
    });
    const page = await browser.newPage();
    let dataList = [];
    for (let i = 0; i < urlList.length; i++) {
        const url= urlList[i];
        await page.goto(url,{
            waitUntil: 'networkidle2'// 等待网络状态为空闲的时候才继续执行
        });
        let data = await page.evaluate(() => {
            //获取幼儿园数据
            let searchData = []
            $(".sellListContent li").each(function(){
                let house = {
                    des: '',
                    name:'',
                    area:'',
                    url:''
                }
                house.des = $(this).find('.title a').html()
                house.name = $(this).find('.positionInfo a:nth-child(2)').html()
                house.area = $(this).find('.positionInfo a:nth-child(3)').html()
                house.url = $(this).find('.LOGCLICKDATA')[0].href
                searchData.push(house)
            });
            return searchData
        })
        dataList = dataList.concat(data)
    }
    console.log(dataList.length);

    let Str_ans = JSON.stringify(dataList,null, 4);
    fs.writeFile('lianjia.json', Str_ans, 'utf8', (err) => {
        if (err) throw err;
        console.log('done');
    });
    getDetailInfo(dataList)
    // 关闭浏览器
    // await browser.close();
}

async function getDetailInfo(list){
    console.log('启动浏览器');
    const browser = await puppeteer.launch({
        // 关闭无头模式，方便我们看到这个无头浏览器执行的过程
        headless: true,
    });
    console.log('打开页面');
    const page = await browser.newPage();
    let newObjList = []
    for (let i = 0; i < list.length; i++) {
        const url = list[i].url;
        newObjList.push(list[i])
        console.log('地址栏输入网页地址');
        await page.goto(url,{
            waitUntil: 'networkidle2'// 等待网络状态为空闲的时候才继续执行
        });
        //获取学校信息
        async function getSchoolData(){
            return await page.evaluate(() => {
                //获取幼儿园数据
                let school = document.querySelector('#mapListContainer .itemBox li:nth-child(1) .itemTitle');
                let distance = document.querySelector('#mapListContainer .itemBox li:nth-child(1) .itemdistance')

                return {
                    school: school ? school.innerHTML:'无',
                    distance: distance ? distance.innerHTML:'无'
                }
            })
        }
        await page.waitForSelector('.around .tabBox .aroundType .LOGCLICK:nth-child(2)');
        console.log('开始点击教育');
        await page.tap('.around .tabBox .aroundType .LOGCLICK:nth-child(2)')
        console.log('点击教育');
        await page.waitFor(500)
        const kindergarten = await getSchoolData();
        console.log(kindergarten);
        await page.waitForSelector('.around .tabBox .itemTagBox .LOGCLICK:nth-child(2)');
        console.log('开始点击小学');
        await page.tap('.around .tabBox .itemTagBox .LOGCLICK:nth-child(2)')
        await page.waitFor(500)
        const primary  = await getSchoolData();
        await page.waitForSelector('.around .tabBox .itemTagBox .LOGCLICK:nth-child(3)');
        console.log('开始点击中学');
        await page.tap('.around .tabBox .itemTagBox .LOGCLICK:nth-child(3)')
        await page.waitFor(500)
        const middle  =  await getSchoolData();
        await page.waitForSelector('.around .tabBox .itemTagBox .LOGCLICK:nth-child(4)');
        console.log('开始点击大学');
        await page.tap('.around .tabBox .itemTagBox .LOGCLICK:nth-child(4)')
        await page.waitFor(500)
        const university  =  await getSchoolData();
        console.log(kindergarten,primary,middle, university);
        newObjList[i].kindergarten = kindergarten;
        newObjList[i].primary = primary;
        newObjList[i].middle = middle;
        newObjList[i].university = university;
    }

    let Str_ans = JSON.stringify(newObjList,null, 4);
    fs.writeFile('lianDetailjia.json', Str_ans, 'utf8', (err) => {
        if (err) throw err;
        console.log('done');
    });
// 模拟移动端设备
//     await page.emulate(iPhone6);

    // 关闭浏览器
    // await browser.close();
}

async function startMock(){
    let urlList = []
    for (let i = 1; i < 2; i++) {
        let url = 'https://sz.lianjia.com/ershoufang/pg'+i;
        urlList.push(url)
    }
    getLianJiaBaseInfo(urlList)
}
module.exports = {
    startMock
}
