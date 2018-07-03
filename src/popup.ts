'use strict';

function click(event) {
console.log("asdfasdfasdf");
    chrome.runtime.sendMessage({message: 'hi'}, (response) => {
        chrome.extension.getBackgroundPage().console.log(response);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('changeColor').addEventListener('click', click);
});
