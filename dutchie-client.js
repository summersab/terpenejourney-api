const ApolloClient = require('apollo-boost').ApolloClient;
const createPersistedQueryLink = require('@apollo/client/link/persisted-queries').createPersistedQueryLink;
const HttpLink = require('apollo-link-http').createHttpLink;
const ApolloLink = require('apollo-link').ApolloLink;
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache;
const uuidv4 = require("uuid").v4;
const print = require('graphql/language/printer').print;
const sha256 = require('hash.js/lib/hash/sha/256');
//const gql = require('graphql-tag');
const fetch = require('cross-fetch/polyfill').fetch;

const defaultGenerateHash = function (query) {
	return sha256()
		.update(print(query))
		.digest('hex');
}

const queries = require('./queries');

class Dutchie {
	retailerId = null;
	dispensaryId = null;
	token = null;
	adminUser = null;
	adminPass = null;

	accessToken = null;
	refreshToken = null;

	client = null;
	authClient = null;
	authClientGet = null;
	plusClient = null;

	constructor(retailerId, dispensaryId, token, adminUser = null, adminPass = null) {
		this.retailerId = retailerId;
		this.dispensaryId = dispensaryId;
		this.token = token;
		this.adminUser = adminUser;
		this.adminPass = adminPass;

		this.client = this.dutchieClient();
		this.plusClient = this.dutchiePlusClient(this.token);
	}

	async menuQuery() {
		return await this.stripTypename(
			await this.plusClient.query({
				variables: {
					retailerId: this.retailerId
				},
				query: queries.menuQuery
			}).catch(error => {
				throw error;
			})
		);
	}

	async fetchCartDetails(checkoutId) {
		return await this.stripTypename(
			await this.plusClient.query({
				variables: {
					retailerId: this.retailerId,
					checkoutId: `${checkoutId}`
				},
				query: queries.fetchCartDetails
			}).catch(error => {
				throw error;
			})
		);
	}

	async loginConsumer(email, password) {
		return await this.stripTypename(
			await this.client.mutate({
				variables: {
					email: `${email}`,
					password: `${password}`
				},
				mutation: queries.loginConsumer
			}).catch(error => {
				throw error;
			})
		);
	}

	async meConsumer() {
		this.authClientGet = this.dutchieAuthClientGet(this.accessToken);

		return await this.stripTypename(
			await this.authClientGet.query({
				query: queries.meConsumer
			}).catch(error => {
				throw error;
			})
		);
	}

	async filteredDispensaries() {
		this.authClientGet = this.dutchieAuthClientGet(this.accessToken);

		return await this.stripTypename(
			await this.authClientGet.query({
				variables: {"dispensaryFilter":{"cNameOrID":"624d9bb115779400a5b3e4f4","includePending":true}},
				query: queries.consumerDispensaries
			}).catch(error => {
				throw error;
			})
		);
	}

	async retailerName() {
		return await this.stripTypename(
			await this.plusClient.query({
				variables: { "retailerId": this.retailerId },
				query: queries.retailerNameQuery
			}).catch(error => {
				throw error;
			})
		);
	}

	async filteredOrders(ordersFilter, ordersSort, ordersPagination) {
		this.authClientGet = this.dutchieAuthClientGet(this.accessToken);

		return await this.authClientGet.query({
			variables: {
				ordersFilter: ordersFilter,
				ordersSort: ordersSort,
				ordersPagination: ordersPagination
			},
			query: queries.filteredOrders_custom
		}).then(async response => {
			response.data.filteredOrders.orders.forEach(function(order, key, arr) {
				arr[key].items = order.orders;
				delete(arr[key].orders);
			});
			return await this.stripTypename(response);
		}).catch(error => {
			throw error;
		});
	}

	async createOrder(post) {
		let checkout = await this.fetchCartDetails(post.orderId);
/*		const filteredDispensaries = await this.filteredDispensaries();

		if (post.payment_method == 'debit') {
			const dispensaryId = this.dispensaryId;

			const debitFee = filteredDispensaries.data.filteredDispensaries.filter(function(el) {
				return el.id == dispensaryId
			}, dispensaryId)[0].paymentFees.filter(function(el) {
				return el.paymentType == 'debitOnly'
			})[0].fee;

			checkout.data.checkout.priceSummary.total += debitFee;
		}
*/
		let products = [];
		let address = "";

		for (let item of checkout.data.checkout.items) {
			let product = {
				id:       item.productId,
				option:   item.option,
				quantity: item.quantity,
/**/				special:  false
			};

			products.push(product);
		}

		if (
			typeof(post.city) !== 'undefined' &&
			typeof(post.state) !== 'undefined' &&
			typeof(post.street1) !== 'undefined' &&
			typeof(post.zip) !== 'undefined'
		) {
			address = post.street1;
			address += post.street2 == null ? "" : `, ${post.street2}`;
			address += `, ${post.city}, ${post.state} ${post.zip}`;
		}

		let vars = {
			input : {
				"address" : address,
/**/				"appliedRewards" : [],
//				"checkoutId" : post.orderId,
//				"checkoutToken" : uuidv4(),
				"checkoutToken" : post.orderId,
/**/				"deliveryOption" : false,
				"dispensaryId" : this.dispensaryId,
				"embedded" : true,
				"expectedTotal" : checkout.data.checkout.priceSummary.total / 100,
				"isAfterHoursOrder" : false,
/*				"isAnonymous" : false,*/
				"isCurbsidePickupOrder" : false,
				"isDriveThruPickupOrder" : false,
				"isExternalOrder" : false,
/**/				"isGuestOrder" : post.userId == 0 ? true : false,
				"isKioskOrder" : false,
				"isPTPOT" : true,
/**/				"isPreviewOrder" : false,
				"location" : {},
				"medicalCard" : {},
				"medicalOrder" : false,
/**/				"paymentMethod" : post.payment_method,
				"paymentMethodId" : "",
				"products" : products,
				"reservation" : {},
				"reservationType" : "",
				/*"sardineSessionId" : "101e23e6-ef98-42ae-bf58-78d64e773580",*/
				"saveGuestInfo" : false,
				"specialInstructions" : "",
				"utmData" : {},
				"variantSource" : "embedded"
			}
		}

		let client = "";
		if (post.userId == 0) {
			const birthdayParts = post.birthday.split('/');

			vars.input.guestCustomer = {
				firstName:  post.first_name,
				lastName:   post.last_name,
				birthDay:   birthdayParts[1],
				birthMonth: birthdayParts[0],
				birthYear:  birthdayParts[2],
				phone:      this.formatPhoneNumber(post.phone)
			};

			client = this.dutchieClient;
		}
		else {
			vars.input.checkoutId = post.orderId;
			client = this.dutchieAuthClient(this.accessToken);
		}

		return await client.mutate({
			variables: vars,
			mutation: queries.createOrderV2
		}).then(async response => {
			//response.data.createOrderV2.order.forEach(function(order, key, arr) {
			//	arr[key].items = order.orders;
			//	delete(arr[key].orders);
			//});
			if (response.data.createOrderV2.valid == false) {
				throw response.data.createOrderV2.errors;
			}

			response.data.createOrderV2.order.items = response.data.createOrderV2.order.orders;
			delete(response.data.createOrderV2.order.orders);
			return await this.stripTypename(response);
		}).catch(error => {
			throw error;
		});
	}

	async dispensaryCustomers(searchTerm) {
		return await this.loginConsumer(this.adminUser, this.adminPass).then(async response => {
			this.authClientGet = this.dutchieAuthClientGet(response.data.loginConsumer.accessToken);

			return await this.stripTypename(
				await this.authClientGet.query({
					query: queries.dispensaryCustomers,
					variables: {
						"customersFilter": {
							"dispensaryId": this.dispensaryId,
							"search": searchTerm
						},
						"customersSort": {
							"sortBy": "source",
							"sortDirection": "desc"
						},
						"customersPagination": {
							"offset": 0,
							"limit": 100
						}
					}
				}).catch(error => {
					throw error;
				})
			);
		}).catch(error => {
			throw error;
		});
	}

	async consumerSignup(email, password, birthday, emailNotifications, firstName, lastName, phone, textNotifications) {
		this.authClientGet = this.dutchieAuthClientGet(this.accessToken);

		const variables = {
			input: {
				data: {
					embedded: true,
					dispensaryId: this.dispensaryId
				},
				email: email,
				password: password,
				profile: {
					birthday: this.formatDate(new Date(birthday)), //"12/19/1986",
					emailNotifications: emailNotifications,
					firstName: firstName,
					lastName: lastName,
					medicalCard: null,
					phone: this.formatPhoneNumber(phone), //"(281) 433-7909",
					textNotifications: textNotifications
				}
			}
		};

		return await this.client.mutate({
			variables: variables,
			mutation: queries.consumerSignup
		}).then(async response => {
			return await this.stripTypename(response);
		}).catch(async error => {
			throw await error;
		});
	}

	errorStatus(error) {
		const errorMap = {
			BAD_REQUEST:                     400,
			UNAUTHORIZED:                    401,
			SESSION_INVALID:                 401,
			PAYMENT_REQUIRED:                402,
			FORBIDDEN:                       403,
			NOT_FOUND:                       404,
			METHOD_NOT_ALLOWED:              405,
			NOT_ACCEPTABLE:                  406,
			PROXY_AUTHENTICATION_REQUIRED:   407,
			REQUEST_TIMEOUT:                 408,
			CONFLICT:                        409,
			GONE:                            410,
			LENGTH_REQUIRED:                 411,
			PRECONDITION_FAILED:             412,
			PAYLOAD_TOO_LARGE:               413,
			URI_TOO_LONG:                    414,
			UNSUPPORTED_MEDIA_TYPE:          415,
			RANGE_NOT_SATISFIABLE:           416,
			EXPECTATION_FAILED:              417,
			VALIDATIONERROR:                 417,
			MISDIRECTED_REQUEST:             421,
			UNPROCESSABLE_ENTITY:            422,
			LOCKED:                          423,
			FAILED_DEPENDENCY:               424,
			TOO_EARLY:                       425,
			UPGRADE_REQUIRED:                426,
			PRECONDITION_REQUIRED:           428,
			TOO_MANY_REQUESTS:               429,
			REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
			UNAVAILABLE_FOR_LEGAL_REASONS:   451,
			INTERNAL_SERVER_ERROR:           500,
			NOT_IMPLEMENTED:                 501,
			BAD_GATEWAY:                     502,
			SERVICE_UNAVAILABLE:             503,
			GATEWAY_TIMEOUT:                 504,
			HTTP_VERSION_NOT_SUPPORTED:      505,
			VARIANT_ALSO_NEGOTIATES:         506,
			INSUFFICIENT_STORAGE:            507,
			LOOP_DETECTED:                   508,
			NOT_EXTENDED:                    510,
			NETWORK_AUTHENTICATION_REQUIRED: 511
		};

		if (
			typeof(error.graphQLErrors) !== 'undefined' &&
			error.graphQLErrors !== null &&
			typeof(error.graphQLErrors[0]) !== 'undefined' &&
			typeof(error.graphQLErrors[0].extensions) !== 'undefined' &&
			typeof(error.graphQLErrors[0].extensions.errors) !== 'undefined' &&
			typeof(error.graphQLErrors[0].extensions.errors[0]) !== 'undefined' &&
			typeof(error.graphQLErrors[0].extensions.errors[0].status) !== 'undefined'
		) {
			return parseInt(error.graphQLErrors[0].extensions.errors[0].status);
		}
		else if (
			typeof(error.graphQLErrors) !== 'undefined' &&
			error.graphQLErrors !== null &&
			typeof(error.graphQLErrors[0]) !== 'undefined' &&
			typeof(error.graphQLErrors[0].extensions) !== 'undefined' &&
			typeof(error.graphQLErrors[0].extensions.code) !== 'undefined' &&
			Object.keys(errorMap).includes(error.graphQLErrors[0].extensions.code)
		) {
			return errorMap[error.graphQLErrors[0].extensions.code];
		}
		else if (
			typeof(error.networkError) !== 'undefined' &&
			error.networkError !== null &&
			typeof(error.networkError.statusCode) !== 'undefined'
		) {
			return parseInt(error.networkError.statusCode);
		}
		else if (
			typeof(error[0]) !== 'undefined' &&
			typeof(error[0].name) !== 'undefined'
		) {
			return errorMap[error[0].name.toUpperCase()];
		}
		else {
			return 404;
		}
	}

	errorMessage(error) {
		if (
			typeof(error.graphQLErrors) !== 'undefined' &&
			error.graphQLErrors !== null &&
			typeof(error.graphQLErrors[0]) !== 'undefined' &&
			typeof(error.graphQLErrors[0].extensions) !== 'undefined' &&
			typeof(error.graphQLErrors[0].extensions.errors) !== 'undefined' &&
			typeof(error.graphQLErrors[0].extensions.errors[0]) !== 'undefined'
		) {
			return error.graphQLErrors[0].extensions.errors[0].detail;
		}
		else if (
			error.networkError !== null &&
			typeof(error.networkError) !== 'undefined' &&
			typeof(error.networkError.statusCode) !== 'undefined'
		) {
			return error.networkError.message;
		}
		else {
			return "An unknown error has occurred";
		}
	}

	formatPhoneNumber = (str) => {
		//Filter only numbers from the input
		let cleaned = ('' + str).replace(/\D/g, '');

		//Check if the input is of correct length
		let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

		if (match) {
			return '(' + match[1] + ') ' + match[2] + '-' + match[3]
		};

		return null
	};

	formatDate = (date) => {
		let year = date.getFullYear();
		let month = (1 + date.getMonth()).toString().padStart(2, '0');
		let day = date.getDate().toString().padStart(2, '0');

		return month + '/' + day + '/' + year;
	}

	// Remove all of the __typename elements from the responses
	async stripTypename(obj) {
		for (var prop in obj) {
			if (obj[prop] !== null && typeof(obj[prop]) === 'object') {
				obj[prop] = await this.stripTypename(obj[prop]);
			}
			else if (prop == '__typename') {
				delete(obj[prop]);
			}
			else if (prop.substring(0,1) == '_' && prop.substring(1) != '_' && typeof(obj[prop.substring(1)]) === 'undefined') {
				obj[prop.substring(1)] = obj[prop];
				delete(obj[prop]);
			}
		}
		return obj
	}

	/**
	 * Set up four different clients
	 * 1. dutchieAuthClient:    Calls requiring user auth tokens
	 * 2. dutchieAuthClientGet: GET requests requiring user auth tokens
	 * 3. dutchiePlusClient:    Dutchie+ requests
	 * 4. dutchieClient:        Unauthenticated queries to the main domain
	 */
	dutchieAuthClient(userToken) {
		let linkChain = createPersistedQueryLink({
			generateHash: defaultGenerateHash,
		}).concat(
			new HttpLink({
				uri: 'https://dutchie.com/graphql',
			}),
		);

		let authLink = new ApolloLink((operation, forward) => {
			operation.setContext({
			headers: {
				authorization: `${userToken}`,
				"content-type": "application/json"
			}
			});

			return forward(operation);
		});

		return new ApolloClient({
			link: authLink.concat(linkChain),
			cache: new InMemoryCache()
		});
	}

	dutchieAuthClientGet(userToken) {
		let linkChain = createPersistedQueryLink({
			generateHash: defaultGenerateHash,
			useGETForHashedQueries: true
		}).concat(
			new HttpLink({
				uri: 'https://dutchie.com/graphql',
			}),
		);

		let authLink = new ApolloLink((operation, forward) => {
			operation.setContext({
			headers: {
				authorization: `${userToken}`,
				"content-type": "application/json"
			}
			});

			return forward(operation);
		});

		return new ApolloClient({
			link: authLink.concat(linkChain),
			cache: new InMemoryCache()
		});
	}

	dutchiePlusClient(token) {
		let httpLink = new HttpLink({
			uri: 'https://plus.dutchie.com/plus/2021-07/graphql'
		});

		let authLink = new ApolloLink((operation, forward) => {
			operation.setContext({
				headers: {
					authorization: token ? `Bearer ${token}` : '',
					"content-type": "application/json"
				}
			});

			return forward(operation);
		});

		return new ApolloClient({
			link: authLink.concat(httpLink),
			cache: new InMemoryCache()
		});
	}

	dutchieClient() {
		let httpLink = new HttpLink({
			uri: 'https://dutchie.com/graphql',
		});

		let authLink = new ApolloLink((operation, forward) => {
			operation.setContext({
				headers: {
					"content-type": "application/json"
				}
			});

			return forward(operation);
		});

		return new ApolloClient({
			link: authLink.concat(httpLink),
			cache: new InMemoryCache()
		});
	}
}

module.exports = Dutchie;
