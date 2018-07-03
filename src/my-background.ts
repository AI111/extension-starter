import {AES} from "crypto-js";
import Utf8 = require("crypto-js/enc-utf8");
import Hex = require("crypto-js/format-hex");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const ciphertext = AES.encrypt('my message', 'secret key 123');
    console.log('ciphertext ', ciphertext.toString(Hex));
    const bytes  = AES.decrypt(ciphertext.toString(), 'secret key 123');
    console.log('bytes', bytes);
    const plaintext = bytes.toString(Utf8);
    console.log('plaintext', plaintext);

    sendResponse(message.message + ' - ' + sender);
});
console.info("Change anything here!!");
