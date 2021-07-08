chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    // 这里是返回给bg的内容
    var trs = $('.ant-table-tbody tr');
    var size = trs.size();
    var newTrs = $.makeArray(trs).splice(size - 50, 50)
    newTrs.forEach(element => {
        var tdKey = $(element).data("row-key")
        console.log(tdKey);
        var filenane = tdKey.substr(4);
        $(element).find("td:nth-child(2) > .editCell_f2UJB > .content_3-COB > .formatted_2iUZF").before('<img src="https://hopefully-img.yuedun.wang/' + filenane + '?imageMogr2/thumbnail/!20p/" style="width:100px;">')
    });
    sendResponse('get the message')
})