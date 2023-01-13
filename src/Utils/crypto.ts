import CryptoJS from 'crypto-js'

// 密钥 16 位
var keys = 'gw00252316000000';
// 初始向量 initial vector 16 位
var ivs = '';
// key 和 iv 可以一致
const key = CryptoJS.enc.Utf8.parse(keys);
const iv = CryptoJS.enc.Utf8.parse(ivs);
//加密
export function Encrypt(param: any) {
    if(typeof param == "object"){
        param = JSON.stringify(param)
    }
    let encrypted: any = CryptoJS.AES.encrypt(param, key, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    encrypted = encrypted.toString();
    return encrypted;
}
//解密
export function Decrypt(param: any) {
    let decrypted: any = CryptoJS.AES.decrypt(param, key, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
    return decrypted;
}
