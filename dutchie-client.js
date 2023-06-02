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
	token = null;
	accessToken = null;
	refreshToken = null;

	client = null;
	authClient = null;
	authClientGet = null;
	plusClient = null;

	constructor(retailerId, token) {
		this.retailerId = retailerId;
		this.token = token;
		this.client = this.dutchieClient();
		this.plusClient = this.dutchiePlusClient(this.token);
	}

	async menuQuery() {
		return this.plusClient.query({
			variables: {retailerId: this.retailerId},
			query: queries.menuQuery
		});
	}

	async loginConsumer(email, password) {
		return this.client.mutate({
			variables: {email: `${email}`, password: `${password}`},
			mutation: queries.loginConsumer
		});
	}

	async meConsumer() {
		this.authClientGet = this.dutchieAuthClientGet(this.accessToken);

		return this.authClientGet.query({
			query: queries.meConsumer
		});
	}

	async filteredOrders(ordersFilter, ordersSort, ordersPagination) {
		this.authClientGet = this.dutchieAuthClientGet(this.accessToken);

		return this.authClientGet.query({
			variables: {ordersFilter: ordersFilter, ordersSort: ordersSort, ordersPagination: ordersPagination},
			query: queries.filteredOrders
		}).then(response => {
			response.data.filteredOrders.orders.forEach(function(order, key, arr) {
				arr[key].items = order.orders;
				delete(arr[key].orders);
			});
			return response;
		}).catch(error => {
			throw error;
		});
	}

	errorStatus(error) {
		if (
			typeof(error.graphQLErrors) !== 'undefined' &&
			typeof(error.graphQLErrors[0].extensions) !== 'undefined' &&
			typeof(error.graphQLErrors[0].extensions.errors) !== 'undefined' &&
			typeof(error.graphQLErrors[0].extensions.errors[0].status) !== 'undefined' 
		) {
			return parseInt(error.graphQLErrors[0].extensions.errors[0].status);
		}
		else {
			return 404;
		}
	}

	/**
	 * Set up four different clients
	 * 1. Calls requiring user auth tokens
	 * 2. GET requests requiring user auth tokens
	 * 3. Dutchie+ requests
	 * 4. Unauthenticated queries to the main domain
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
