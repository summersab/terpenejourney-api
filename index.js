const serverless = require("serverless-http");
const os = require('os');
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = 3000;

const CryptoJSAesJson = require('./crypto-js-aes');
const Dutchie = require('./dutchie-client');
const Foxy = require('./foxy-client');
const Alpine = require('node-rest-client').Client;

const cookieKey = process.env.cookieKey;
const dutchie_token = 'public-eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJBUEktQ0xJRU5UIiwiZXhwIjozMzIwNjYyNjg4NSwiaWF0IjoxNjQ5NzE4MDg1LCJpc3MiOiJodHRwczovL2R1dGNoaWUuY29tIiwianRpIjoiNzVkMzcyOGUtYTRkOC00MTliLTg5YzktNmI2MzRkOWVjOWRhIiwiZW50ZXJwcmlzZV9pZCI6IjE3MmY2NWMzLTczZTctNDU5ZC1hZTM1LTA4OTdiMjE2MDI3OCIsInV1aWQiOiI2NzVmYWRlOC03YWU3LTQ2NmEtOTAyYS1iOTQ4NjQ0ZjhmMWYifQ.JcqHRAMTyB_cF6uVQ-4toM3K3njIkX-dMvUUfxznIrY';
const dutchie_retailerId = "48763c11-5642-48ed-9b17-17852c4fd88f";
const dutchie_dispensaryId = "624d9bb115779400a5b3e4f4";
const dutchie_admin_user = process.env.dutchie_admin_user;
const dutchie_admin_pass = process.env.dutchie_admin_pass;

const foxy_client_id     = process.env.foxy_client_id;
const foxy_client_secret = process.env.foxy_client_secret;
const foxy_access_token  = process.env.foxy_access_token;
const foxy_refresh_token = process.env.foxy_refresh_token;

const alpine_store_id = 1656;
const alpine_api_key = process.env.alpine_api_key;
const alpineArgs = { headers: { "X-APIKEY": alpine_api_key, "Content-Type": "application/json" }};

// Secure cookie
const secCookieOpts = {
	maxAge: 1000 * 60 * 60 * 24 * 30, // Expiration in ms (ms * sec * min * hr * da)
	httpOnly: true, // The cookie only accessible by the web server
	//signed: true, // Indicates if the cookie should be signed
	secure: true
}

// Same-site cookie
const sameSiteCookieOpts = {
	maxAge: 1000 * 60 * 60 * 24 * 30, // Expiration in ms (ms * sec * min * hr * da)
	secure: true,
	sameSite: 'none'
}

const dutchie = new Dutchie(dutchie_retailerId, dutchie_dispensaryId, dutchie_token, dutchie_admin_user, dutchie_admin_pass);
const foxy = new Foxy(foxy_refresh_token, foxy_client_secret, foxy_client_id);
const alpine = new Alpine();

const corsOptions = {
	origin: 'https://tj-the-revolution-6206508ef5c2d17ee4134.webflow.io',
	credentials: true,
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(cookieParser("secret"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/cors', (req, res) => {
	// Set cookie
	res.cookie('dutchie_access_token', -1, secCookieOpts)
	res.send('')
});

// Get a user account using cookies to resolve the ID
app.get('/users', (req, res) => {
	let cookies = parseCookies(req.headers.cookie);
	dutchie.accessToken = cookies.dutchie_access_token;

	dutchie.meConsumer().then(response => {
		res.send(JSON.stringify(response));
	}).catch(error => {
		if (typeof(error.message) !== 'undefined' && error.message.toLowerCase() == 'graphql error: no user found') {
			response = {data: {meConsumer: {id: '0'}}};
			res.send(JSON.stringify(response));
		}
		else {
			res.status(dutchie.errorStatus(error));
			res.send(JSON.stringify(error));
		}
	});
});


// Get all orders for a user
app.get('/dispensaries', (req, res) => {
	let cookies = parseCookies(req.headers.cookie);
	dutchie.accessToken = cookies.dutchie_access_token;

	dutchie.retailerName().then(response => {
		res.send(JSON.stringify(response));
	}).catch(error => {
		res.status(dutchie.errorStatus(error));
		res.send(JSON.stringify(error));
	});
});

// Create a new user
app.post('/users', (req, res) => {
	let post = req.body;
	post.emailNotifications = post.email_subscribe == "on" ? true : false;
	post.textNotifications = post.sms_subscribe == "on" ? true : false;

	// Check to see if customer exists in Foxy
	foxy.customerExists(post.email).then(foxyCustomer => {
		if (foxyCustomer) {
			foxy.validateCustomer(post.email, post.password, foxyCustomer).then(foxyValidCustomer => {
				// Customer exists, but the password was wrong
				if (! foxyValidCustomer) {
					var i = 1;
					// return an error, reset the password, etc
					// res.status(response.statusCode);
					res.send(JSON.stringify({message: "Account already exists or incorrect password."}));
				}
				// Password was correct - create Dutchie and Alpine accounts
				else {

				}
			});
		}
		// Customer does not exist in Foxy
		else {
			// Check to see if customer exists in Dutchie
			dutchie.dispensaryCustomers(post.email).then(response => {
				let customer = response.data.dispensaryCustomers.customers.filter(function(customer, index, arr) {
					if (customer.email == post.email && customer.source == 'User') return arr;
				}, post.email);

				// Dutchie account exists
				if (customer.length == 1) {
					// Try to log in to Dutchie
					dutchie.loginConsumer(post.email, post.password).then(response => {
						// Check to see if customer exists in Alpine
						alpine.get("https://lab.alpineiq.com/api/v1.1/piis/" + alpine_store_id + "?search=email:" + post.email, alpineArgs, function (data, response) {
							// Customer does not exist in Alpine; create a new Alpine contact
							if (data.code == 200 && data.data.results == null) {
								// The retailer name is required for creating an Alpine contact (favoriteStore)
								dutchie.retailerName().then(retailerName => {
									args = {
										//"address": "2205 W 136th Avenue, Broomfield, CO, 80023",
										//"customAttributes": [{"parent": "","key": "EmployeeSignup","value": "Josh","ts": null}],
										headers: alpineArgs.headers,
										data: {
											email: post.email,
											favoriteStore: retailerName.data.retailer.name,
											firstName: post.first_name,
											lastName: post.last_name,
											loyalty: true,
											mobilePhone: post.phone,
											smsoptin: post.textNotifications,
											disableSMS: post.textNotifications
										}
									};
									alpine.post("https://lab.alpineiq.com/api/v2/loyalty", args, function (data, response) {
										// Failed to create Alpine contact
										if (response.statusCode != 200) {
											res.status(response.statusCode);
											res.send(JSON.stringify({message: "Registration failure - could not create Alpine account."}));
										}
										// Successfully created Alpine contact
										else {
											// No need to do anything
										}
									});
								}).catch(error => {
									// Really? Failed to get the retailer name?
									res.status(dutchie.errorStatus(error));
									res.send(JSON.stringify({message: dutchie.errorMessage(error)}));
								});
							}
							else if (data.code != 200) {
								// Throw an error
								let e = 1;
							}
							// Customer exists in Alpine
							else {
								// No need to do anything
							}
							let i = 1;
							// Customer exists (sign the user in?)
							// TODO: Redirect the customer to a success page
						});
					}).catch(error => {
						// Incorrect Dutchie email/password)
						if (
							dutchie.errorStatus(error) == 422 &&
							dutchie.errorMessage(error) == "You've entered an incorrect email or password. Please try again."
						) {
							// Redirect the user to reset the password
							res.status(dutchie.errorStatus(error));
							res.send(JSON.stringify({message: dutchie.errorMessage(error)}));
						}
						else {
							res.status(dutchie.errorStatus(error));
							res.send(JSON.stringify({message: dutchie.errorMessage(error)}));
						}
					});
				}
				else {
					// Customer doesn't exist in Dutchie
					dutchie.consumerSignup(
						post.email,
						post.password,
						post.birthday,
						post.email_subscribe == "on" ? true : false,
						post.first_name,
						post.last_name,
						post.phone,
						post.sms_subscribe == "on" ? true : false
					).then(response => {
						// Check to see if customer exists in Alpine
						alpine.get("https://lab.alpineiq.com/api/v1.1/piis/" + alpine_store_id + "?search=email:" + post.email, alpineArgs, function (data, response) {
							// Customer does not exist in Alpine; create a new Alpine contact
							if (data.code == 200 && data.data.results == null) {
								// The retailer name is required for creating an Alpine contact (favoriteStore), so we get it here
								dutchie.retailerName().then(retailerName => {
									args = {
										//"address": "2205 W 136th Avenue, Broomfield, CO, 80023",
										//"customAttributes": [{"parent": "","key": "EmployeeSignup","value": "Josh","ts": null}],
										headers: alpineArgs.headers,
										data: {
											email: post.email,
											favoriteStore: retailerName.data.retailer.name,
											firstName: post.first_name,
											lastName: post.last_name,
											loyalty: true,
											mobilePhone: post.phone,
											smsoptin: post.textNotifications,
											disableSMS: post.textNotifications
										}
									};
									alpine.post("https://lab.alpineiq.com/api/v2/loyalty", args, function (data, response) {
										// Failed to create Alpine contact
										if (response.statusCode != 200) {
											res.status(response.statusCode);
											res.send(JSON.stringify({message: "Registration failure - could not create Alpine account."}));
										}
										// Successfully created Alpine contact
										else {
											// TODO: Redirect the customer to a success page
											res.send(JSON.stringify({message: "Successfully registered!"}));
										}
									});
								}).catch(error => {
									// Really? Failed to get the retailer name?
									res.status(dutchie.errorStatus(error));
									res.send(JSON.stringify({message: dutchie.errorMessage(error)}));
								});
							}
							else if (data.code != 200) {
								// Throw an error
								let e = 1;
							}
							// Customer exists in Alpine
							else {
								// No need to do anything
								let i = 1;
							}
							// TODO: Redirect the customer to a success page?
							let i = 1;
						});
					}).catch(error => {
						res.status(dutchie.errorStatus(error));
						res.send(JSON.stringify({message: dutchie.errorMessage(error)}));
					});
				}
			}).catch(error => {
				res.status(dutchie.errorStatus(error));
				res.send(JSON.stringify({message: dutchie.errorMessage(error)}));
			});
		}
	});
});

// Update user
// TODO: implement method
app.put('/users/:id', (req, res) => {
});

app.post('/users/login', (req, res) => {
	let post = req.body;
	let cookies = parseCookies(req.headers.cookie);

	dutchie.loginConsumer(post.email, post.password).then(response => {
		delete(response.data.loginConsumer.transferToken);

		if (cookies.dutchie_access_token == '-1') {
			res.cookie('dutchie_access_token', response.data.loginConsumer.accessToken, secCookieOpts);
			res.cookie('dutchie_user_id', response.data.loginConsumer.user.id, secCookieOpts);
			delete(response.data.loginConsumer.accessToken);
		}
		else {
			c = new CryptoJSAesJson();
			let encrypted = c.encrypt(response.data.loginConsumer.accessToken, cookieKey);
			response.data.loginConsumer.accessToken = "enc." + encrypted;

			res.cookie('dutchie_access_token', response.data.loginConsumer.accessToken, sameSiteCookieOpts);
			res.cookie('dutchie_user_id', response.data.loginConsumer.user.id, sameSiteCookieOpts);
		}

		//res.redirect(handleRedirect(req, post.redirect));
		response.message = "Successfully logged in."
		res.send(JSON.stringify(response));
	},(req)).catch(error => {
		if (dutchie.errorStatus(error) == 422) {
			foxy.validateCustomer(post.email, post.password).then(customer => {
				if (customer) {
					customer._links['fx:transactions'].get({
						zoom: [ 'custom_fields', 'billing_addresses' ],
						sort: [ "order=transaction_date desc" ],
					})
						.then(transactionsResponse =>
							transactionsResponse.json()
						).then(transactions => {
							const transaction = transactions._embedded['fx:transactions'][transactions._embedded['fx:transactions'].length - 1];
							let birthday = sms_subscribe = newsletter_subscribe = null;

							transaction._embedded['fx:custom_fields'].forEach(function(field, key) {
								switch(field.name) {
									case 'birthday':
										birthday = field.value;
										break;
									case 'sms_subscribe':
										textNotifications = field.value;
										break;
									case 'newsletter_subscribe':
										emailNotifications = field.value;
									}
							});

							dutchie.consumerSignup(
								post.email,
								post.password,
								birthday,
								emailNotifications,
								post.firstName,
								post.lastName,
								post.phone,
								textNotifications
							).then(response => {

								res.send(JSON.stringify(response));
							}).catch(error => {
								res.status(dutchie.errorStatus(error));
								res.send(JSON.stringify(error));
							});

							res.send(transactions);
						});
				}
			}).catch(error => {
				res.send(JSON.stringify(error));
			});
		}
		else {
			res.status(dutchie.errorStatus(error));
			res.send(JSON.stringify(error));
		}
	});
});

// Get all orders for a user
app.get('/users/:id/orders', (req, res) => {
	let userId = req.params.id;
	let cookies = parseCookies(req.headers.cookie);
	dutchie.accessToken = cookies.dutchie_access_token;

	dutchie.filteredOrders_custom({"userId":userId}, {"sortBy":"createdAt","sortDirection":"desc"}, {"limit":20}).then(response => {
		res.send(JSON.stringify(response));
	}).catch(error => {
		res.status(dutchie.errorStatus(error));
		res.send(JSON.stringify(error));
	});
});

// Submit an order
app.post('/users/:userId/orders/:orderId', (req, res) => {
	let post = req.body;
	if (typeof(req.params.userId) === 'undefined') {
		post.userId = 0;
	}
	post.orderId = req.params.orderId;
	let cookies = parseCookies(req.headers.cookie);
	dutchie.accessToken = cookies.dutchie_access_token;

	dutchie.createOrder(post).then(response => {
		res.send(JSON.stringify(response));
	}).catch(error => {
		res.status(dutchie.errorStatus(error));
		res.send(JSON.stringify(error));
	});
});


app.get('/menu', (req, res) => {
	dutchie.menuQuery().then(response => {
		res.send(JSON.stringify(response));
	}).catch(error => {
		res.status(dutchie.errorStatus(error));
		res.send(JSON.stringify(error));
	});
});


// Prevent from launching express on AWS Lambda
if (! os.userInfo().username.startsWith('sbx_user')) {
	app.listen(port, () => {
		console.log('Express is listening on port 3000');
	});
}

function handleRedirect(req, redirect) {
	if (typeof(redirect) === 'undefined') {
		return req.headers.origin;
	}
	else if (redirect.startsWith(req.headers.origin)) {
		return redirect;
	}
	else if (redirect.startsWith("./")) {
		return req.headers.origin + req.url + "/" + redirect;
	}
	else {
		if (! redirect.startsWith("/")) {
			redirect = "/" + redirect;
		}

		return req.headers.origin + redirect;
	}
}

function parseCookies (str) {
	let cookies = {};
	let rx = /([^;=\s]*)=([^;]*)/g;

	if (typeof(str) !== 'undefined') {
		strParts = str.split(', ');
		if (strParts.length == 2 && strParts[0] == strParts[1]) {
			str = strParts[0];
		}

		for ( let m ; m = rx.exec(str) ; ) {
			cookies[ m[1] ] = decodeURIComponent( m[2] );
		}
	}

	if (
		typeof(cookies.dutchie_access_token) !==  'undefined' &&
		cookies.dutchie_access_token.substring(0,4) === 'enc.'
	) {
		c = new CryptoJSAesJson();
		cookies.dutchie_access_token = c.decrypt(cookies.dutchie_access_token.substring(4), cookieKey);
	}

	return cookies;
}

// Debug
function __LINE__() {
	let e = new Error();
	let frame = e.stack.split("\n")[2]; // change to 3 for grandparent func
	let lineNumber = frame.split(":").reverse()[1];
	return lineNumber;
}

function __FUNCTION__() {
	let e = new Error();
	let frame = e.stack.split("\n")[2]; // change to 3 for grandparent func
	let functionName = frame.split(" ")[5];
	return functionName;
}


module.exports.handler = serverless(app);