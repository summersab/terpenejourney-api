const ApolloClient = require('apollo-boost').ApolloClient;
const createPersistedQueryLink = require('@apollo/client/link/persisted-queries').createPersistedQueryLink;
const HttpLink = require('apollo-link-http').createHttpLink;
const ApolloLink = require('apollo-link').ApolloLink;
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache;
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
	accessToken = null;
	refreshToken = null;

	client = null;
	authClient = null;
	authClientGet = null;
	plusClient = null;

	constructor(retailerId, dispensaryId, token) {
		this.retailerId = retailerId;
		this.dispensaryId = dispensaryId;
		this.token = token;
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

	async filteredOrders(ordersFilter, ordersSort, ordersPagination) {
		this.authClientGet = this.dutchieAuthClientGet(this.accessToken);

		return await this.authClientGet.query({
			variables: {
				ordersFilter: ordersFilter,
				ordersSort: ordersSort,
				ordersPagination: ordersPagination
			},
			query: queries.filteredOrders
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

	async createOrder(orderId, userId) {
		const checkout = await this.fetchCartDetails(orderId);
		return await this.client.query({
			variables: {ordersFilter: ordersFilter, ordersSort: ordersSort, ordersPagination: ordersPagination},
			query: queries.createOrder
		}).then(async response => {
			response.data.createOrder.orders.forEach(function(order, key, arr) {
				arr[key].items = order.orders;
				delete(arr[key].orders);
			});
			return await this.stripTypename(response);
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

		this.client.mutate({
			variables: variables,
			mutation: queries.consumerSignup
		}).then(async response => {
			return await this.stripTypename(response);
		}).catch(error => {
			throw error;
		});
	}

	errorStatus(error) {
		if (
			typeof(error.graphQLErrors) !== 'undefined' &&
			typeof(error.graphQLErrors[0]) !== 'undefined' &&
			typeof(error.graphQLErrors[0].extensions) !== 'undefined' &&
			typeof(error.graphQLErrors[0].extensions.errors) !== 'undefined' &&
			typeof(error.graphQLErrors[0].extensions.errors[0]) !== 'undefined' &&
			typeof(error.graphQLErrors[0].extensions.errors[0].status) !== 'undefined' 
		) {
			return parseInt(error.graphQLErrors[0].extensions.errors[0].status);
		}
		else if (
			typeof(error.networkError) !== 'undefined' &&
			typeof(error.networkError.statusCode) !== 'undefined'
		) {
			return parseInt(error.networkError.statusCode);
		}
		else {
			return 404;
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
