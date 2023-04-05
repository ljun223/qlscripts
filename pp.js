/*
澎湃新闻自动签到，自动评论
每天活动海贝，商城兑换实物商品

环境变量ppxw
格式为：手机号&登录密码
例如：177777777&12345678

cron: 34 8 * * *
const $ = new Env("澎湃新闻")
*/
const axios = require("axios");
const fs = require("fs");
const notify = require("./sendNotify")
async function sleep(time){
 return await new Promise((resolve) => setTimeout(resolve, time));
}
ppxw=""  //nodejs直接填在这里即可
mobile=(process.env.ppxw.split("&"))[0];
pw=(process.env.ppxw.split("&"))[1];

async function login(url){
await axios({
url:url,
method:"post",
headers:{"User-Agent":"okhttp/3.12.13",
"WD-UUID":"987baf45-ce87-42b2-88b6-63bb33ba882e",
"WD-UA":"Dalvik%2F2.1.0%20%28Linux%3B%20U%3B%20Android%207.1.2%3B%202112123AC%20Build%2FTKQ1.220829.002%29%20%E6%BE%8E%E6%B9%83%E6%96%B0%E9%97%BB%2F9.5.8",
"WD-VERSION-CODE":"9580",
"WD-VERSION":"9.5.8",
"WD-CHANNEL":"yingyb",
"package_name":"com.wondertek.paper",
"Content-Type":"application/json; charset=utf-8",
"picCardMode":"3",
"WD-RESOLUTION":"1080*2268",
"WD-CLIENT-TYPE":"04",
"WD-CLIENT-TYPE":"04",
"cookie":"route=c547c9ff00576e742dc419ffae68d6d5; acw_tc=781bad0916806114526758762e14106f0161af43019e989e77195d6a13b2a8; SERVERID=prod-app-ali-nginx4_80"
}
}).then(function (res){
console.log(res.data)
fs.writeFileSync("./cache.json",JSON.stringify(res.data),(err)=>{})
})
}


login("https://app.thepaper.cn/userservice/auth/login?loginName="+mobile+"&pwd="+pw+"&nvcVal=")
console.log("开始登录")



json=JSON.parse(fs.readFileSync("./cache.json","utf-8"));
userId=json.userInfo.userId;
token=json.userInfo.token;
h5Token=json.userInfo.h5Token;
console.log(token)



url="https://app.thepaper.cn/clt/jsp/v6/channelContList.jsp?n=-24";
commentUrl="https://app.thepaper.cn/appapi/comment/news/comment/appAdd";
checkinUrl="https://credits.codeboxes.cn/c/p/9rqr1wtq/checkin/checkin";
jfUrl="https://app.thepaper.cn/appapi/pointapi/point/user/dashboard"

time=new Date().getTime()

headers={"User-Agent":"okhttp/3.12.13",
"WD-UUID":"987baf45-ce87-42b2-88b6-63bb33ba882e",
"WD-UA":"Dalvik%2F2.1.0%20%28Linux%3B%20U%3B%20Android%207.1.2%3B%202112123AC%20Build%2FTKQ1.220829.002%29%20%E6%BE%8E%E6%B9%83%E6%96%B0%E9%97%BB%2F9.5.8",
"WD-TOKEN":token,
"userId":userId,
"thepaper-timestamp":time,
"thepaper-sign":"BF9F30F46336407586CBC4B90BD51CE7",
"WD-VERSION-CODE":"9580",
"WD-VERSION":"9.5.8",
"PAPER-DEVICE-ID":"987baf45-ce87-42b2-88b6-63bb33ba882e",
"WD-CHANNEL":"yingyb",
"boot_mark":"e6822f88-60e1-4c43-9918-8d78d030bc79",
"package_name":"com.wondertek.paper",
"Content-Type":"application/json; charset=utf-8",
"picCardMode":"3",
"WD-RESOLUTION":"1080*2268",
"WD-CLIENT-TYPE":"04",
"WD-CLIENT-TYPE":"04",
"SDK_INT":"25",
"network":"1",
"BUILD_ID":"8",
//"Host":"app.thepaper.cn",
"cookie":"route=c547c9ff00576e742dc419ffae68d6d5; acw_tc=781bad0916806114526758762e14106f0161af43019e989e77195d6a13b2a8; SERVERID=prod-app-ali-nginx4_80",
"cookie":"cuk="+h5Token
};

async function sleep(time){
 return await new Promise((resolve) => setTimeout(resolve, time));
}




//contid="22568990";
//comment="";

//data={"contId":contid,"showVote":"0","toPyq":0,"content":comment}

//console.log(data);

async function post(url,contid,comment){

await axios({
url:url,
method:"post",
headers:headers,
data:data={"contId":contid,"showVote":"0","toPyq":0,"content":comment},
}).then(function(res){
//res.data
console.log(res.data)

})
await sleep(15000)
}

//分享

async function share(id){
await axios.get("https://app.thepaper.cn/clt/v3/shareLog.msp?weiboType=WEIXIN&shareType=3&objectType=1&objectId="+id,{headers:headers}).then(
function(res){
console.log(JSON.parse(JSON.stringify(res.data)).integralDoc)
}
)
sleep(5000)

}



async function cont(id){
await axios({
    url:"https://app.thepaper.cn/appapi/comment/news/comment/appOneList",
    method:"post",
    headers:headers,
    data:{"contId":id}
    }).then(async function(res){
    console.log(res.data)
    comment=JSON.parse(JSON.stringify(res.data)).data.nowList.list[0].content;
    console.log(comment)
    //post(commentUrl,id,comment)
    share(id)
    })
await sleep(15000)
}


async function get(url){
await axios({
  url:url,
  method:"get",
  headers:headers
}).then(async function(res){
  result=res.data
  //console.log(result)
  json=JSON.parse(JSON.stringify(result));
  contid=[];
  for(let i=2;i<=15;i++){
    id=json.contList[i].contId;
    contid.push(id)
  }  
   console.log(contid)
    len=contid.length;
    for(var j=0; j<=len;j++){
    while(!contid[j]){j=j+1}
    console.log(contid[j])
    sleep(5000)
    //cont(contid[j])
    }
    
})
sleep(3000)
}

//签到

async function checkin(url){
await axios({
url:url,
method:"get",
headers:headers
}).then(function (res){
console.log(JSON.parse(JSON.stringify(res.data)).message)
})

}

async function jf(url){
await axios({
url:url,
method:"get",
headers:headers,
}).then(function (res){
json=JSON.parse(JSON.stringify(res.data));
console.log("今日已获得："+json.seashellInfo.todaySeashells+"海贝");
console.log("当前共有："+json.seashellInfo.totalSeashells+"海贝");
for (var i=0;i<=5;i++){
log="今日已完成\n"+json.taskInfos[i].title+"："+json.taskInfos[i].curSeashells+"/"+json.taskInfos[i].maxSeashells+"\n"
console.log(log)
notify.sendNotify("澎湃新闻",log)
}
})


}


get(url)
checkin(checkinUrl)
jf(jfUrl)
