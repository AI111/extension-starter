import {AES} from "crypto-js";
import Utf8 = require("crypto-js/enc-utf8");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    sendResponse(message.message + ' - ' + sender);
});
console.info("Change anything here!");
