(function (xhr) {
    var XHR = XMLHttpRequest.prototype;
    var open = XHR.open;
    var send = XHR.send;
    XHR.open = function (method, url) {
        this._method = method;
        this._url = url;
        return open.apply(this, arguments);
    };
    XHR.send = function (postData) {
        console.log('xhr request:', this._method, this._url, postData);
        this.addEventListener('load', function () {
            // sessionStorage['key'] = JSON.stringify(response); // 插件需要添加'storage'权限
            // document.cookie
            // localStorage['key']
            console.log(">>>>>>>XHR")
            window.postMessage({ type: 'xhr', data: this.response }, '*');  // 将响应发送到 content script
        });
        return send.apply(this, arguments);
    };
})(XMLHttpRequest);

(function () {
    let origFetch = window.fetch;
    window.fetch = async function (...args) {
        const response = await origFetch(...args);
        console.log('fetch request:', args);

        setTimeout(() => {
            if (args[0].indexOf("/api/kodov2/rsf/list") > -1) {
                window.postMessage('list');
            }
        }, 2000);
        // response
        //     .clone()
        //     .blob() // 此处需要根据不同数据调用不同方法，这里演示的是二进制大文件，比如音频
        //     .then(data => {
        //         // 对于二进制大文件可以创建为URL(blob:开头)，供其它脚本访问
        //         //sessionStorage['wave'] = URL.createObjectURL(data); // 插件需要添加'storage'权限
        //         window.postMessage({ type: 'fetch', data: URL.createObjectURL(data) }, '*'); // send to content script
        //     })
        //     .catch(err => console.error(err));
        return response;
    }
})();