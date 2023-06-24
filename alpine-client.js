const Alpine = require('node-rest-client').Client;

const alpine_store_id = 1656;
const alpine_api_key = process.env.alpine_api_key;

class Alpine {
	alpineArgs = null;
	baseUrl = 'https://lab.alpineiq.com/api/'
	versionMap = {
		"v1.1": [
			adjust,
			adjustments,
			audience,
			audiences,
			contact,
			conversions,
			createUpdateInventory,
			createUpdateMember,
			createUpdateSale,
			piis,
			redemptions,
			settings,
			stateLaws,
			stores,
			walletOffers,
		],
		"v2": [
			audience,
			brand,
			campaign,
			campaigns,
			cart,
			contact,
			discount,
			geoSighting,
			lookup,
			loyalty,
			loyaltyContact,
			optin,
			sms,
			store,
			verify,
			view,
			wallet,
			walletSeed,
		]
	};

	constructor(storeId, apiKey) {
		alpineArgs = { headers: { "X-APIKEY": apiKey }};
	}

	async get($url = "", $post = null) {

	}

	async post($url, $post = null) {

	}

	async put($url, $post = null) {

	}

	async delete($url, $post = null) {

	}

	async go(method, url, post) {

	}

}