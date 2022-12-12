
window.onload = function () {
    chrome.storage.local.get({ domain: '' }, (items) => {
        document.querySelector("#domain").value = items.domain;
    });

    let submit = document.querySelector("#submit");
    submit.addEventListener("click", function () {
        let domain = document.querySelector("#domain");
        chrome.storage.local.set({ domain: domain.value }, () => {
            alert("保存成功");
        });
    })
}