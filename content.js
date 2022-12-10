// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log(message)
//     // 这里是返回给bg的内容
//     var trs = $('.ant-table-tbody tr');
//     var size = trs.size();
//     var newTrs = $.makeArray(trs).splice(size - 50, 50)
//     newTrs.forEach(element => {
//         var tdKey = $(element).data("row-key");
//         console.log(tdKey);
//         var filenane = tdKey;
//         var image = '<img src="https://hopefully-img.yuedun.wang/' + filenane + '?imageMogr2/thumbnail/!20p/" style="width:100px;">'
//         console.log(image)
//         $(element).find("td:nth-child(2) > .ant-table-row-indent").before(image)
//     });
//     sendResponse('get the message')
// })

console.log('content script start');

// inject injected script
var s = document.createElement('script');
s.src = chrome.runtime.getURL('injected.js');
s.onload = function () {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

// receive message from injected script
window.addEventListener('message', function (e) {
    console.log('content script received:', e.data.type, e.data.data);
    var trs = $('.ant-table-tbody tr');
    var size = trs.size();
    var newTrs = $.makeArray(trs).splice(size - 50, 50)
    newTrs.forEach(element => {
        var tdKey = $(element).data("row-key");
        // console.log(tdKey);
        var filenane = tdKey;
        var image = '<img src="http://hopefully-img.yuedun.wang/' + filenane + '?imageMogr2/thumbnail/!20p/" style="width:100px;">'
        console.log(image)
        if (!$(element).find("td:nth-child(2) img").length) {
            $(element).find("td:nth-child(2) > .ant-table-row-indent").before(image)
        }
    });
});