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
const dutchie_public_token = 'public-eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJBUEktQ0xJRU5UIiwiZXhwIjozMzIwNjYyNjg4NSwiaWF0IjoxNjQ5NzE4MDg1LCJpc3MiOiJodHRwczovL2R1dGNoaWUuY29tIiwianRpIjoiNzVkMzcyOGUtYTRkOC00MTliLTg5YzktNmI2MzRkOWVjOWRhIiwiZW50ZXJwcmlzZV9pZCI6IjE3MmY2NWMzLTczZTctNDU5ZC1hZTM1LTA4OTdiMjE2MDI3OCIsInV1aWQiOiI2NzVmYWRlOC03YWU3LTQ2NmEtOTAyYS1iOTQ4NjQ0ZjhmMWYifQ.JcqHRAMTyB_cF6uVQ-4toM3K3njIkX-dMvUUfxznIrY';
const dutchie_secret_token = process.env.dutchie_secret_token;
const dutchie_retailerId = "48763c11-5642-48ed-9b17-17852c4fd88f";
const dutchie_dispensaryId = "624d9bb115779400a5b3e4f4";
const dutchie_admin_user = process.env.dutchie_admin_user;
const dutchie_admin_pass = process.env.dutchie_admin_pass;

const foxy_client_id     = process.env.foxy_client_id;
const foxy_client_secret = process.env.foxy_client_secret;
const foxy_access_token  = process.env.foxy_access_token;
const foxy_refresh_token = process.env.foxy_refresh_token;
const foxy_store_id      = 101371;

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

const dutchie = new Dutchie(dutchie_retailerId, dutchie_dispensaryId, dutchie_public_token, dutchie_secret_token);
const foxy = new Foxy(foxy_refresh_token, foxy_client_secret, foxy_client_id);
const alpine = new Alpine();

var whitelist = [
	'https://dev2.terpenejourney.com',
	'https://terpenejourney.com',
	'https://tj-the-revolution-6206508ef5c2d17ee4134.webflow.io',
	'https://www.terpenejourney.com'
];

var corsOptions = {
	origin: function (origin, callback) {
		// bypass the requests with no origin (like curl requests, mobile apps, etc )
		if (!origin) return callback(null, true);

		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
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
	res.send(JSON.stringify({message: ""}));
});

// Get a user account using cookies to resolve the ID
app.get('/users', (req, res) => {
	let cookies = parseCookies(req.headers.cookie);
	dutchie.accessToken = cookies.dutchie_access_token;

	dutchie.meConsumer().then(response => {
		res.send(JSON.stringify(response));
	}).catch(error => {
		if (typeof(error.message) !== 'undefined' && error.message.toLowerCase() == 'graphql error: no user found') {
			response = {data: {user: {id: '0'}}};
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
	let cookies = parseCookies(req.headers.cookie);

	post.emailNotifications = post.email_subscribe == "on" ? true : false;
	post.textNotifications = post.sms_subscribe == "on" ? true : false;

	if (
		post.birthday === '' ||
		post.email === '' ||
		post.first_name === '' ||
		post.last_name === '' ||
		post.password === '' ||
		post.phone === ''
	) {
		res.status(417);
		res.send(JSON.stringify({message: 'One or more required fields are missing.'}));
		return;
	}

	// Check to see if customer exists in Foxy
	foxy.customerExists(post.email).then(foxyCustomer => {
		if (foxyCustomer) {
			foxy.validateCustomer(post.email, post.password, foxyCustomer).then(foxyValidCustomer => {
				// Customer exists, but the password was wrong
				if (! foxyValidCustomer) {
					// return an error, reset the password, etc
					// res.status(response.statusCode);
					res.send(JSON.stringify({message: "Account already exists or incorrect password."}));
				}
				// Password was correct - create Dutchie and Alpine accounts
				else {
					// Try to log in to Dutchie
					dutchie.loginConsumer(post.email, post.password).then(dutchieAuthResponse => {
						// Check to see if customer exists in Alpine
						alpine.get("https://lab.alpineiq.com/api/v1.1/piis/" + alpine_store_id + "?search=email:" + post.email, alpineArgs, function (alpineData, alpineResponse) {
							// Customer does not exist in Alpine; create a new Alpine contact
							if (alpineData.code == 200 && alpineData.data.results == null) {
								// The retailer name is required for creating an Alpine contact (favoriteStore)
								dutchie.retailerName().then(retailerName => {
									args = {
										headers: alpineArgs.headers,
										data: {
											email: post.email,
											favoriteStore: retailerName.data.retailer.name,
											firstName: post.first_name,
											lastName: post.last_name,
											loyalty: true,
											mobilePhone: post.phone,
											smsoptin: post.textNotifications,
											disableSMS: post.textNotifications,
											emailOptIn: post.emailNotifications
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
											// Customer exists (sign the user in)
											dutchieResponseHandler(req, res, dutchieAuthResponse);
										}
									});
								}).catch(dutchieRetailerError => {
									// Really? Failed to get the retailer name?
									res.status(dutchie.errorStatus(dutchieRetailerError));
									res.send(JSON.stringify({message: dutchie.errorMessage(dutchieRetailerError)}));
								});
							}
							else if (alpineData.code != 200) {
								// Throw an error
								res.status(data.code);
								res.send(JSON.stringify(data));
							}
							else {
								// Customer exists (sign the user in)
								dutchieResponseHandler(req, res, dutchieAuthResponse);
							}
						});
					}).catch(dutchieLoginError => {
						// Correct the error message
						if (dutchie.errorMessage(dutchieLoginError) == "Validation errors") {
							dutchieLoginError.graphQLErrors[0].message = "You've entered an incorrect email or password. Please try again.";
						}

						// Incorrect Dutchie email/password)
						if (
							dutchie.errorStatus(dutchieLoginError) == 422 &&
							dutchie.errorMessage(dutchieLoginError) == "You've entered an incorrect email or password. Please try again."
						) {
							// Customer LIKELY doesn't exist in Dutchie - try signing up
							dutchie.consumerSignup(
								post.email,
								post.password,
								post.birthday,
								post.email_subscribe == "on" ? true : false,
								post.first_name,
								post.last_name,
								post.phone,
								post.sms_subscribe == "on" ? true : false
							).then(dutchieAuthResponse => {
								// Check to see if customer exists in Alpine
								alpine.get("https://lab.alpineiq.com/api/v1.1/piis/" + alpine_store_id + "?search=email:" + post.email, alpineArgs, function (alpineData, alpineResponse) {
									// Customer does not exist in Alpine; create a new Alpine contact
									if (alpineData.code == 200 && alpineData.data.results == null) {
										// The retailer name is required for creating an Alpine contact (favoriteStore)
										dutchie.retailerName().then(retailerName => {
											args = {
												headers: alpineArgs.headers,
												data: {
													email: post.email,
													favoriteStore: retailerName.data.retailer.name,
													firstName: post.first_name,
													lastName: post.last_name,
													loyalty: true,
													mobilePhone: post.phone,
													smsoptin: post.textNotifications,
													disableSMS: post.textNotifications,
													emailOptIn: post.emailNotifications
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
													// Customer exists (sign the user in)
													dutchieResponseHandler(req, res, dutchieAuthResponse);
												}
											});
										}).catch(dutchieRetailerError => {
											// Really? Failed to get the retailer name?
											res.status(dutchie.errorStatus(dutchieRetailerError));
											res.send(JSON.stringify({message: dutchie.errorMessage(dutchieRetailerError)}));
										});
									}
									else if (alpineData.code != 200) {
										// Throw an error
										res.status(data.code);
										res.send(JSON.stringify(data));
									}
									else {
										// Customer exists (sign the user in)
										dutchieResponseHandler(req, res, dutchieAuthResponse);
									}
								});
							// Customer DOES exist in Dutchie - trying to sign up using existing username?
							}).catch(dutchieAuthError => {
								res.status(dutchie.errorStatus(dutchieAuthError));
								res.send(JSON.stringify({message: dutchie.errorMessage(dutchieAuthError)}));
							});
						}
						else {
							res.status(dutchie.errorStatus(error));
							res.send(JSON.stringify({message: dutchie.errorMessage(error)}));
						}
					});
				}
			});
		}
		// Customer does not exist in Foxy
		else {
			// Try to log in to Dutchie
			dutchie.loginConsumer(post.email, post.password).then(dutchieAuthResponse => {
				// Check to see if customer exists in Alpine
				alpine.get("https://lab.alpineiq.com/api/v1.1/piis/" + alpine_store_id + "?search=email:" + post.email, alpineArgs, function (alpineData, alpineResponse) {
					// Customer does not exist in Alpine; create a new Alpine contact
					if (alpineData.code == 200 && alpineData.data.results == null) {
						// The retailer name is required for creating an Alpine contact (favoriteStore)
						dutchie.retailerName().then(retailerName => {
							args = {
								headers: alpineArgs.headers,
								data: {
									email: post.email,
									favoriteStore: retailerName.data.retailer.name,
									firstName: post.first_name,
									lastName: post.last_name,
									loyalty: true,
									mobilePhone: post.phone,
									smsoptin: post.textNotifications,
									disableSMS: post.textNotifications,
									emailOptIn: post.emailNotifications
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
									// Customer exists (sign the user in)
									dutchieResponseHandler(req, res, dutchieAuthResponse);
								}
							});
						}).catch(dutchieRetailerError => {
							// Really? Failed to get the retailer name?
							res.status(dutchie.errorStatus(dutchieRetailerError));
							res.send(JSON.stringify({message: dutchie.errorMessage(dutchieRetailerError)}));
						});
					}
					else if (alpineData.code != 200) {
						// Throw an error
						res.status(data.code);
						res.send(JSON.stringify(data));
					}
					else {
						// Customer exists (sign the user in)
						dutchieResponseHandler(req, res, dutchieAuthResponse);
					}
				});
			}).catch(dutchieLoginError => {
				// Correct the error message
				if (dutchie.errorMessage(dutchieLoginError) == "Validation errors") {
					dutchieLoginError.graphQLErrors[0].message = "You've entered an incorrect email or password. Please try again.";
				}

				// Incorrect Dutchie email/password)
				if (
					dutchie.errorStatus(dutchieLoginError) == 422 &&
					dutchie.errorMessage(dutchieLoginError) == "You've entered an incorrect email or password. Please try again."
				) {
					// Customer LIKELY doesn't exist in Dutchie - try signing up
					dutchie.consumerSignup(
						post.email,
						post.password,
						post.birthday,
						post.email_subscribe == "on" ? true : false,
						post.first_name,
						post.last_name,
						post.phone,
						post.sms_subscribe == "on" ? true : false
					).then(dutchieAuthResponse => {
						// Check to see if customer exists in Alpine
						alpine.get("https://lab.alpineiq.com/api/v1.1/piis/" + alpine_store_id + "?search=email:" + post.email, alpineArgs, function (alpineData, alpineResponse) {
							// Customer does not exist in Alpine; create a new Alpine contact
							if (alpineData.code == 200 && alpineData.data.results == null) {
								// The retailer name is required for creating an Alpine contact (favoriteStore)
								dutchie.retailerName().then(retailerName => {
									args = {
										headers: alpineArgs.headers,
										data: {
											email: post.email,
											favoriteStore: retailerName.data.retailer.name,
											firstName: post.first_name,
											lastName: post.last_name,
											loyalty: true,
											mobilePhone: post.phone,
											smsoptin: post.textNotifications,
											disableSMS: post.textNotifications,
											emailOptIn: post.emailNotifications
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
											// Customer exists (sign the user in)
											dutchieResponseHandler(req, res, dutchieAuthResponse);
										}
									});
								}).catch(dutchieRetailerError => {
									// Really? Failed to get the retailer name?
									res.status(dutchie.errorStatus(dutchieRetailerError));
									res.send(JSON.stringify({message: dutchie.errorMessage(dutchieRetailerError)}));
								});
							}
							else if (alpineData.code != 200) {
								// Throw an error
								res.status(data.code);
								res.send(JSON.stringify(data));
							}
							else {
								// Customer exists (sign the user in)
								dutchieResponseHandler(req, res, dutchieAuthResponse);
							}
						});
					// Customer DOES exist in Dutchie - trying to sign up using existing username?
					}).catch(dutchieAuthError => {
						//res.status(dutchie.errorStatus(error));
						res.status(422);
						if (dutchie.errorMessage(dutchieAuthError).match(/You are trying to access .* too often.*/)) {
							res.status(429);
						}

						res.send(JSON.stringify({message: dutchie.errorMessage(dutchieAuthError)}));
					});
				}
				else {
					//res.status(dutchie.errorStatus(error));
					res.status(422);
					res.send(JSON.stringify({message: dutchie.errorMessage(error)}));
				}
			});
		}
	});
});

// Update user
// TODO: implement method
app.put('/users/:id', (req, res) => {
});

app.post('/users/resetpassword', (req, res) => {
	let post = req.body;

	if (typeof(post.email) === 'undefined') {
		res.status(417);
		res.send(JSON.stringify({message: "No email provided."}));
		return;
	}

	foxy.customerExists(post.email).then(foxyCustomer => {
		if (foxyCustomer) {
			fetch(`https://checkout.terpenejourney.com/v/2.0.0/api_json.php?store_id=${foxy_store_id}&customer_email=${post.email}&ThisAction=SendPassword`, {
				"method": "GET"
			}).then(foxyPasswordResetResponse => {
				var message = foxyPasswordResetResponse.body;

				if (foxyPasswordResetResponse.status == 200) {
					res.status(200);
					res.send(JSON.stringify({message: "Please check your email for a temporary password."}));
				}
				else {
					res.status(404);
					res.send(JSON.stringify({message: "Error sending password reset for Foxy user account.."}));	
				}
			}).catch(foxyPasswordResetError => {
				res.status(404);
				res.send(JSON.stringify({message: "Error sending password reset for Foxy user account."}));
			});
		}
		else {
			//dutchie.customersQueryByEmail(post.email).then(dutchieCustomer => {
			//	if (dutchieCustomer.data.customers.length !== 1) {
			//		res.status(404);
			//		res.send(JSON.stringify({message: "No account exists for this email address."}));
			//	}
			//	else {
					dutchie.sendPasswordResetEmailV2(post.email).then(dutchiePasswordResetResponse => {
						if (
							typeof(dutchiePasswordResetResponse.data) === 'object' &&
							typeof(dutchiePasswordResetResponse.data.sendPasswordResetEmailV2) === 'object' &&
							dutchiePasswordResetResponse.data.sendPasswordResetEmailV2.success
						) {
							res.status(200);
							res.send(JSON.stringify({message: "Please check your email to reset your password."}));
						}
						else {
							res.status(404);
							res.send(JSON.stringify({message: "No account exists for this email address."}));
						}
					}).catch(dutchiePasswordResetError => {
						res.status(dutchie.errorStatus(dutchiePasswordResetError));
						res.send(JSON.stringify({message: dutchie.errorMessage(dutchiePasswordResetError)}));
					});
			//	}
			//}).catch(error => {
			//	res.status(dutchie.errorStatus(error));
			//	res.send(JSON.stringify({message: dutchie.errorMessage(error)}));
			//});
		}
	}).catch(foxyCustomerError => {
		res.status(404);
		res.send(JSON.stringify({message: "Error sending password reset for Foxy user account."}));
	});
});

app.post('/users/login', (req, res) => {
	let post = req.body;
	let cookies = parseCookies(req.headers.cookie);

	if (typeof(post.email) === 'undefined' &&
		typeof(post.password) === 'undefined'
	) {
		res.status(417);
		res.send(JSON.stringify({message: "No email or password provided."}));
	}

	dutchie.loginConsumer(post.email, post.password).then(dutchieLoginResponse => {
		dutchieResponseHandler(req, res, dutchieLoginResponse);
	},(req)).catch(dutchieLoginError => {
		// Incorrect Dutchie email/password) - try Foxy

		// Correct the error message
		if (dutchie.errorMessage(dutchieLoginError) == "Validation errors") {
			dutchieLoginError.graphQLErrors[0].message = "You've entered an incorrect email or password. Please try again.";
		}

		if (
			dutchie.errorStatus(dutchieLoginError) == 422 &&
			dutchie.errorMessage(dutchieLoginError) == "You've entered an incorrect email or password. Please try again."
		) {
			foxy.validateCustomer(post.email, post.password).then(foxyCustomerResponse => {
				if (foxyCustomerResponse) {
					foxyCustomerResponse._links['fx:transactions'].get({
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

							post.first_name = transaction.customer_first_name;
							post.last_name = transaction.customer_last_name,
							post.phone = dutchie.formatPhoneNumber(transaction._embedded["fx:billing_addresses"][0].customer_phone);
							post.textNotifications = textNotifications == "1" ? true : false;
							post.emailNotification = emailNotifications == "1" ? true : false
		

							dutchie.consumerSignup(
								post.email,
								post.password,
								dutchie.formatDate(new Date(birthday)),
								emailNotifications == "1" ? true : false,
								post.first_name,
								post.last_name,
								dutchie.formatPhoneNumber(transaction._embedded["fx:billing_addresses"][0].customer_phone),
								textNotifications == "1" ? true : false
							).then(dutchieAuthResponse => {
								// Check to see if customer exists in Alpine
								alpine.get("https://lab.alpineiq.com/api/v1.1/piis/" + alpine_store_id + "?search=email:" + post.email, alpineArgs, function (alpineData, alpineResponse) {
									// Customer does not exist in Alpine; create a new Alpine contact
									if (alpineData.code == 200 && alpineData.data.results == null) {
										// The retailer name is required for creating an Alpine contact (favoriteStore)
										dutchie.retailerName().then(retailerName => {
											args = {
												headers: alpineArgs.headers,
												data: {
													email: post.email,
													favoriteStore: retailerName.data.retailer.name,
													firstName: post.first_name,
													lastName: post.last_name,
													loyalty: true,
													mobilePhone: post.phone,
													smsoptin: post.textNotifications,
													disableSMS: post.textNotifications,
													emailOptIn: post.emailNotifications
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
													// Customer exists (sign the user in)
													dutchieResponseHandler(req, res, dutchieAuthResponse);
												}
											});
										}).catch(dutchieRetailerError => {
											// Really? Failed to get the retailer name?
											res.status(dutchie.errorStatus(dutchieRetailerError));
											res.send(JSON.stringify({message: dutchie.errorMessage(dutchieRetailerError)}));
										});
									}
									else if (alpineData.code != 200) {
										// Throw an error
										res.status(data.code);
										res.send(JSON.stringify(data));
									}
									else {
										// Customer exists (sign the user in)
										dutchieResponseHandler(req, res, dutchieAuthResponse);
									}
								});
							}).catch(dutchieAuthError => {
								res.status(dutchie.errorStatus(dutchieAuthError));
								res.send(JSON.stringify(dutchieAuthError));
							});

							//res.send(transactions);
						});
				}
				else {
					res.status(dutchie.errorStatus(error));
					res.send(JSON.stringify({message: dutchie.errorMessage(error)}));
				}
			}, dutchie).catch(foxyCustomerError => {
				res.send(JSON.stringify(foxyCustomerError));
			});
		}
		else {
			res.status(dutchie.errorStatus(dutchieLoginError));
			res.send(JSON.stringify(dutchieLoginError));
		}
	});
});

app.post('/users/logout', (req, res) => {
	let cookies = parseCookies(req.headers.cookie);
	dutchie.accessToken = cookies.dutchie_access_token;

	dutchie.logout().then(dutchieLogoutResponse => {
		if (req.cookies.dutchie_access_token.startsWith('enc.')) {
			res.cookie('dutchie_access_token', '', Object.assign(JSON.parse(JSON.stringify(sameSiteCookieOpts)), { expires: new Date(1), path: '/', maxAge: 0 }));
			res.cookie('dutchie_user_id', '', Object.assign(JSON.parse(JSON.stringify(sameSiteCookieOpts)), { expires: new Date(1), path: '/', maxAge: 0 }));
		}
		else {
			res.clearCookie("dutchie_access_token", secCookieOpts);
			res.clearCookie("dutchie_user_id", secCookieOpts);
		}

		res.send({message: "Successfully logged out."});
		res.end();	
	}).catch(dutchieLogoutError => {
		res.status(dutchie.errorStatus(dutchieLogoutError));
		res.send(JSON.stringify({message: dutchie.errorMessage(dutchieLogoutError)}));
	});
})

// Get all orders for a user
app.get('/users/:id/orders', (req, res) => {
	let userId = req.params.id;
	let cookies = parseCookies(req.headers.cookie);
	dutchie.accessToken = cookies.dutchie_access_token;
/***
	const foxyOrders = foxy.customerOrders('andrew@platypusinnovations.com').then(response => {
		response._embedded['fx:transactions'].forEach(function(transaction) {
			const dateCreatedEpoch = new Date(transaction.date_created).getTime()/1000.0;
			const startDate = new Date((dateCreatedEpoch - 5) * 1000).toISOString();
			const endDate = new Date((dateCreatedEpoch + 5) * 1000).toISOString();

			const variables = {
				filter: {
					customerId: userId//,
//					createdAt: {
//						start: "2023-01-01T00:00:00Z",  // start date inclusive
//						end: "2023-03-01T00:00:00Z"  // end date exclusive
//					},
//					orderNumber: "1234",
//					search: "Joe"
				},
				pagination: {
					offset: 0,
					limit: 50
				},
				sort: {
					direction: ASC,
					key: CREATED_AT
				}
			};

			dutchie.getOrders(variables).then(response => {
				let i = 1;
			}).catch(error => {
				res.status(dutchie.errorStatus(error));
				res.send(JSON.stringify(error));
			});

		})
		let i = 1;
	});
/***/
/***/
	const variables = {
		filter: {
			customerId: userId//,
//			createdAt: {
//				start: "2023-01-01T00:00:00Z",  // start date inclusive
//				end: "2023-03-01T00:00:00Z"  // end date exclusive
//			},
//			orderNumber: "1234",
//			search: "Joe"
		},
		pagination: {
			offset: 0,
			limit: 50
		},
		sort: {
			direction: 'ASC',
			key: 'CREATED_AT'
		}
	};

	dutchie.getOrders(variables).then(response => {
		res.send(JSON.stringify(response));
	}).catch(error => {
		res.status(dutchie.errorStatus(error));
		res.send(JSON.stringify(error));
	});
/***/
});

// Submit an order
app.post('/users/:userId/orders/:orderId', (req, res) => {
	let post = req.body;
	if (typeof(req.params.userId) === 'undefined') {
		post.userId = 0;
	}
	else {
		post.userId = req.params.userId;
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

function dutchieResponseHandler(req, res, dutchieResponse) {
	let cookies = parseCookies(req.headers.cookie);

	//dutchieResponse.data = dutchieResponse.data.loginConsumer;
	delete(dutchieResponse.data.transferToken);

	if (cookies.dutchie_access_token == '-1') {
		res.cookie('dutchie_access_token', dutchieResponse.data.accessToken, secCookieOpts);
		res.cookie('dutchie_user_id', dutchieResponse.data.user.id, secCookieOpts);
		delete(dutchieResponse.data.accessToken);
	}
	else {
		c = new CryptoJSAesJson();
		let encrypted = c.encrypt(dutchieResponse.data.accessToken, cookieKey);
		dutchieResponse.data.accessToken = "enc." + encrypted;

		res.cookie('dutchie_access_token', dutchieResponse.data.accessToken, sameSiteCookieOpts);
		res.cookie('dutchie_user_id', dutchieResponse.data.user.id, sameSiteCookieOpts);
	}

	dutchieResponse.message = "Successfully logged in."
	res.send(JSON.stringify(dutchieResponse));
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