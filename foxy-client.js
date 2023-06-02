const FoxySDK = require('@foxy.io/sdk');
const PasswordHash = require('node-phpass-fork').PasswordHash;
const len = 8;
const portable = true;
const hasher = new PasswordHash(len, portable);

class Foxy {
	refreshToken = null;
	clientSecret = null;
	clientId = null;

	client = null;

	constructor(refreshToken, clientSecret, clientId) {
		this.refreshToken = refreshToken;
		this.clientSecret = clientSecret;
		this.clientId = clientId;

		this.client = new FoxySDK.Backend.API({
			refreshToken: this.refreshToken,
			clientSecret: this.clientSecret,
			clientId: this.clientId,
		});
	}

	async validateCustomer(email, password) {
		const customersNode = this.client.follow('fx:store').follow('fx:customers');
		const customersResponse = await customersNode.get({
			filters: [
				'is_anonymous=false',
				`email=${email}`
			]
		});


		const customers = await customersResponse.json();

		if (customers.total_items == 1) {
			const customer = customers._embedded["fx:customers"].pop()
			const storedHash = customer.password_hash;

			if (hasher.CheckPassword(password, storedHash)) {
				return customer;
			}
		}
	
		return false;
	}
}

module.exports = Foxy;
