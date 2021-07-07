chrome.webRequest.onCompleted.addListener(
    function (details) {
        console.log(details);
        if (details.statusCode == 200) {
            chrome.tabs.sendMessage(details.tabId, "message", res => {
                console.log('bg=>content')
                console.log(res)
              })
        }
    },

    { urls: ["https://portal.qiniu.com/api/kodov2/rsf/list*"] }  //监听页面请求,你也可以通过*来匹配。
);
