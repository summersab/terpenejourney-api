const CryptoJS = require('crypto-js');

/**
 * AES JSON formatter for CryptoJS
 * @link https://github.com/brainfoolong/cryptojs-aes-php
 * @version 2.1.1
 */

class CryptoJSAesJson {
	token = null;

	constructor(token) {
		this.token = token;
	}

	/**
	 * Encrypt any value
	 * @param {*} value
	 * @param {string} password
	 * @return {string}
	 */
	encrypt(value, password) {
		return CryptoJS.AES.encrypt(JSON.stringify(value), password, { format: this }).toString()
	}
	/**
	 * Decrypt a previously encrypted value
	 * @param {string} jsonStr
	 * @param {string} password
	 * @return {*}
	 */
	decrypt(jsonStr, password) {
		return JSON.parse(CryptoJS.AES.decrypt(jsonStr, password, { format: this }).toString(CryptoJS.enc.Utf8))
	}
	/**
	 * Stringify cryptojs data
	 * @param {Object} cipherParams
	 * @return {string}
	 */
	stringify(cipherParams) {
		var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) }
		if (cipherParams.iv) j.iv = cipherParams.iv.toString()
		if (cipherParams.salt) j.s = cipherParams.salt.toString()
//		return JSON.stringify(j).replace(/\s/g, '')
		var str = JSON.stringify(j).replace(/\s/g, '')
		var buff = Buffer.from(str, 'utf-8');
		return buff.toString('base64');

	}
	/**
	 * Parse cryptojs data
	 * @param {string} jsonStr
	 * @return {*}
	 */
	parse(jsonStr) {
		var buff = Buffer.from(jsonStr, 'base64');
		var jsonStr = buff.toString('utf-8');
//
		var j = JSON.parse(jsonStr)
		var cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(j.ct) })
		if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
		if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
		return cipherParams
	}
}

module.exports = CryptoJSAesJson;