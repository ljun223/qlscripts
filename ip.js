var axios = require('axios');
var notify=require("./sendNotify");


//获取当前ipv6或ipv4地址
var url = 'http://ds.jp2.test-ipv6.com/ip/?callback=?&testdomain=test-ipv6.com&testname=test_ds';
 
//仅能获取当前ipv4地址
var url1 = "http://ipv4.lookup.test-ipv6.com/ip/?callback=_jqjsp&asn=1&testdomain=test-ipv6.com&testname=test_asn4"
 


//默认试用url
axios.get(url)
  .then(function (res){
        console.log(res.data)
        callback=res.data;
        ip=String(callback).match(/ip":"(.*?)"/)[1];
        //输出当前ip
        iplog="您当前的IP地址为：\n"+ip;
        console.log(iplog)
        //输出外网青龙面板登陆地址
        if(ip.match(/[a-z]+/)){
        var webUrl = "http://["+ip+"]:5700";
        console.log("您当前青龙IPV6公网地址为：\n"+webUrl)
        notify.sendNotify("当前IP",iplog+"\n您当前青龙IPV6公网地址为：\n"+webUrl)  
        }else{
        log=("\n当前您仅有IPv4地址，请确认您的IPV4地址为公网地址\n\n请尝试登录以下网址，无法登录则您没有IPv4公网地址\n")
        console.log(log)
        webUrl = "http://"+ip+":5700"
        console.log(webUrl)
        notify.sendNotify("当前IP",iplog+log+webUrl)
        }
})

