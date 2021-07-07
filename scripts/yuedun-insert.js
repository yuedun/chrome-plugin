chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    // 这里是返回给bg的内容
    var trs = $('.ant-table-tbody tr td:nth-child(2)');
    var size = trs.size();
    var newTrs = $.makeArray(trs).splice(size - 50, 50)
    newTrs.forEach(element => {
        var td = $(element).find(".editCell_f2UJB > .content_3-COB > .formatted_2iUZF")
        console.log(td.html());
        td.after('<img src="https://hopefully-img.yuedun.wang/' + td.html() + '?imageMogr2/thumbnail/!20p/" style="width:100px;">')
    });
    sendResponse('get the message')
})