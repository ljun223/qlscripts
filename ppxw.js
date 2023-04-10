/*
澎湃新闻自动签到，自动评论
每天活动海贝，商城兑换实物商品
账号密码登录暂不可用，暂时只能抓包登录

抓包https://credits.codeboxes.cn/c/p/9rqr1wtq开头
获取请求头中的WD-TOKEN和userid以及cookie中的cuk=
变量间用@分割，不支持多账号

环境变量ppxw
例如：token@userid@cuk=eyJzaWduIjoiZTEwNzZi……

cron: 34 8 * * *
const $ = new Env("澎湃新闻")
*/
const axios = require("axios");
const fs = require("fs");
const CryptoJS = require("crypto-js")
const http=require("http")

time = new Date().getTime()
async function sleep(time) {
  return await new Promise((resolve) => setTimeout(resolve, time));
}

/*
ppxw = "" //nodejs直接填在这里即可

var mobile, pw = "";
if (process.env.ppxw) {
  ppxw = process.env.ppxw
}
if (ppxw.stringOf("@")) {
  mobile = (ppxw.split("@"))[0];
  pw = (ppxw.split("@"))[1];
} else if (ppxw.strOf("\n")) {
  mobile = (ppxw.split("\n"))[0];
  pw = (ppxw.split("\n"))[1]
}

async function login(url) {
  await axios({
    url: url,
    method: "post",
    headers: {
      "User-Agent": "okhttp/3.12.13",
      "WD-UUID": "987baf45-ce87-42b2-88b6-63bb33ba882e",
      "WD-UA": "Dalvik%2F2.1.0%20%28Linux%3B%20U%3B%20Android%207.1.2%3B%202112123AC%20Build%2FTKQ1.220829.002%29%20%E6%BE%8E%E6%B9%83%E6%96%B0%E9%97%BB%2F9.5.8",
      "WD-VERSION-CODE": "9580",
      "WD-VERSION": "9.5.8",
      "WD-CHANNEL": "yingyb",
      "package_name": "com.wondertek.paper",
      "Content-Type": "application/json; charset=utf-8",
      "picCardMode": "3",
      "WD-RESOLUTION": "1080*2268",
      "WD-CLIENT-TYPE": "04",
      "WD-CLIENT-TYPE": "04",
      "cookie": "route=c547c9ff00576e742dc419ffae68d6d5; acw_tc=781bad0916806114526758762e14106f0161af43019e989e77195d6a13b2a8; SERVERID=prod-app-ali-nginx4_80"
    }
  }).then(function(res) {
    console.log(res.data)
    fs.writeFileSync("./cache.json", JSON.stringify(res.data), (err) => {})
  })
}

var userId, token = "";

if (!fs.existsSync("./cache.json")) {

  var loginUrl = "https://app.thepaper.cn/userservice/auth/login?loginName=" + mobile + "&pwd=" + pw + "&nvcVal=";

  console.log("当前未登录，开始登录")
  login(loginUrl)
} else {
  console.log("当前已登录，读取账号缓存中……")

  json = JSON.parse(fs.readFileSync("./cache.json", "utf-8"));
  userId = json.userInfo.userId;
  token = json.userInfo.token;

}
*/

ppxw = "" //nodejs直接填在这里即可

var token, userId,cuk = "";
if (process.env.ppxw) {
  ppxw = process.env.ppxw
}
if (ppxw.stringOf("@")) {
  token = (ppxw.split("@"))[0];
  userId = (ppxw.split("@"))[1];
  cuk = (ppxw.split("@"))[2]
}



url = "https://app.thepaper.cn/clt/jsp/v6/channelContList.jsp?n=-24";
commentUrl = "https://app.thepaper.cn/appapi/comment/news/comment/appAdd";
checkinUrl = "https://credits.codeboxes.cn/c/p/9rqr1wtq/checkin/checkin";
jfUrl = "https://app.thepaper.cn/appapi/pointapi/point/user/dashboard"

cukUrl="https://app.thepaper.cn/appapi/pointapi/pointmall/entrance?redirectType=2&dbredirect=https%3A%2F%2Factivity.m.duiba.com.cn%2Fsignactivity%2Findex%3Fid%3D36%26dpm%3D12091.41.1.0%26dcm%3D216.36.17.0%26appKey%3D4VMCf9hbkbPz81J1N6L6w8ejYFNb%26open4share%3Dtongdun";



headers = {
  "User-Agent": "okhttp/3.12.13",
  "WD-UUID": "987baf45-ce87-42b2-88b6-63bb33ba882e",
  "WD-UA": "Dalvik%2F2.1.0%20%28Linux%3B%20U%3B%20Android%207.1.2%3B%202112123AC%20Build%2FTKQ1.220829.002%29%20%E6%BE%8E%E6%B9%83%E6%96%B0%E9%97%BB%2F9.5.8",
  "WD-TOKEN": token,
  "userId": userId,
  "thepaper-timestamp": time,
  "thepaper-sign": "BF9F30F46336407586CBC4B90BD51CE7",
  "WD-VERSION-CODE": "9580",
  "WD-VERSION": "9.5.8",
  "PAPER-DEVICE-ID": "987baf45-ce87-42b2-88b6-63bb33ba882e",
  "WD-CHANNEL": "yingyb",
  "boot_mark": "e6822f88-60e1-4c43-9918-8d78d030bc79",
  "package_name": "com.wondertek.paper",
  "Content-Type": "application/json; charset=utf-8",
  "picCardMode": "3",
  "WD-RESOLUTION": "1080*2268",
  "WD-CLIENT-TYPE": "04",
  "WD-CLIENT-TYPE": "04",
  "SDK_INT": "25",
  "network": "1",
  "BUILD_ID": "8",
  "cookie": "route=ccc7647e17e8d07bf991ee5527089ceb; SERVERID=prod-app-ali-nginx4_80; acw_tc=ac11000116810013316578362e00d535ddc629cd302fe2cbf10196a8511779"
};
/*
async function cuk(){
await axios(
{url:"https://app.thepaper.cn/appapi/pointapi/pointmall/entrance?redirectType=2&dbredirect=https%3A%2F%2Factivity.m.duiba.com.cn%2Fsignactivity%2Findex%3Fid%3D36%26dpm%3D12091.41.1.0%26dcm%3D216.36.17.0%26appKey%3D4VMCf9hbkbPz81J1N6L6w8ejYFNb%26open4share%3Dtongdun",
method:"get",
headers:headers,
}).then(function (res){
json =JSON.stringify(res.data);
cuk =JSON.parse(json).url;
})

}
*/



async function post(url, contid, comment) {

  await axios({
    url: url,
    method: "post",
    headers: headers,
    data: data = {
      "contId": contid,
      "showVote": "0",
      "toPyq": 0,
      "content": comment
    },
  }).then(function(res) {

    console.log(res.data)

  })

}

//分享

async function share(id) {
  await axios.get("https://app.thepaper.cn/clt/v3/shareLog.msp?weiboType=WEIXIN&shareType=3&objectType=1&objectId=" + id, {
    headers: headers
  }).then(
    function(res) {
      console.log(JSON.parse(JSON.stringify(res.data)).integralDoc)
    }
  )

}



async function cont(id) {
  await axios({
    url: "https://app.thepaper.cn/appapi/comment/news/comment/appOneList",
    method: "post",
    headers: headers,
    data: {
      "contId": id
    }
  }).then(async function(res) {
    console.log(res.data)
    comment = JSON.parse(JSON.stringify(res.data)).data.nowList.list[0].content;
    console.log(comment)
    //post(commentUrl,id,comment)
    share(id)
    await sleep(3000)
  })

}


async function get(url) {
  await axios({
    url: url,
    method: "get",
    headers: headers
  }).then(async function(res) {
    result = res.data
    //console.log(result)
    json = JSON.parse(JSON.stringify(result));
    contid = [];
    for (let i = 2; i <= 15; i++) {
      id = json.contList[i].contId;
      contid.push(id)
    }
    console.log(contid)
    len = contid.length;
    for (var j = 0; j <= len; j++) {
      while (!contid[j]) {
        j = j + 1
      }
      console.log(contid[j])
      await sleep(3000)

      //cont(contid[j])
    }

  })

}

//签到

async function checkin(url) {
/*
  var cuk = `{"sign":"7601cb760b9846ffb0e8788f4063ad8b","uid":"123901","appId":"36","timestamp":"` + time + `"}`;
  cuk = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(cuk));
  console.log(cuk)
  */
  await axios({
    url: url,
    method: "get",
    headers: {
      "user-agent": "Mozilla/5.0 (Linux; Android 7.1.2; Redmi Note 8 Build/PKQ1.190616.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046247 Mobile Safari/537.36 PP839/9580",
      "origin": "https://credits.codeboxes.cn",
      "x-requested-with": "com.wondertek.paper",
      "Host": "credits.codeboxes.cn",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      "accept-encoding": "gzip, deflate, br",
      "sec-fetch-site": "same-origin",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      "referer": "https://credits.codeboxes.cn/c/p/9rqr1wtq?"+cuk,
      "cookie": cuk
    },
  }).then(function(res) {
    console.log(res.data)
    console.log(JSON.parse(JSON.stringify(res.data)).message)
    await sleep(3000)
  })​
}



async function jf(url) {
  await axios({
    url: url,
    method: "get",
    headers: headers,
  }).then(function(res) {
    json = JSON.parse(JSON.stringify(res.data));
    console.log("今日已获得：" + json.seashellInfo.todaySeashells + "海贝");
    console.log("当前共有：" + json.seashellInfo.totalSeashells + "海贝");
    for (var i = 0; i <= 5; i++) {
      log = "今日已完成\n" + json.taskInfos[i].title + "：" + json.taskInfos[i].curSeashells + "/" + json.taskInfos[i].maxSeashells + "\n"
      console.log(log)
      if (process.env.ppxw) {
        require("./sendNotify")
        sendNotify(log)
      }
    }
  })


}

function sleep(time) { 
  return new Promise(function (resolve, reject) { 
       setTimeout(function () { 
           resolve() 
       }, time) 
  }) 
};


get(url)
checkin(checkinUrl)
jf(jfUrl)
