const serverless = require("serverless-http");
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = 3000;

const CryptoJSAesJson = require('./crypto-js-aes');
const Dutchie = require('./dutchie-client');
const Foxy = require('./foxy-client');

const cookieKey = process.env.cookieKey;
const token = 'public-eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJBUEktQ0xJRU5UIiwiZXhwIjozMzIwNjYyNjg4NSwiaWF0IjoxNjQ5NzE4MDg1LCJpc3MiOiJodHRwczovL2R1dGNoaWUuY29tIiwianRpIjoiNzVkMzcyOGUtYTRkOC00MTliLTg5YzktNmI2MzRkOWVjOWRhIiwiZW50ZXJwcmlzZV9pZCI6IjE3MmY2NWMzLTczZTctNDU5ZC1hZTM1LTA4OTdiMjE2MDI3OCIsInV1aWQiOiI2NzVmYWRlOC03YWU3LTQ2NmEtOTAyYS1iOTQ4NjQ0ZjhmMWYifQ.JcqHRAMTyB_cF6uVQ-4toM3K3njIkX-dMvUUfxznIrY';
const retailerId = "48763c11-5642-48ed-9b17-17852c4fd88f";

const foxy_client_id     = process.env.foxy_client_id;
const foxy_client_secret = process.env.foxy_client_secret;
const foxy_access_token  = process.env.foxy_access_token;
const foxy_refresh_token = process.env.foxy_refresh_token;

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

const dutchie = new Dutchie(retailerId, token);
const foxy = new Foxy(foxy_refresh_token, foxy_client_secret, foxy_client_id);

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

app.post('/login', (req, res) => {
	let post = req.body;
	let cookies = parseCookies(req.headers.cookie);

	dutchie.loginConsumer(post.email, post.password).then(response => {
		response = stripTypename(response);
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

		if (post.redirect) {
			res.redirect(post.redirect);
		}
		else {
			res.send(JSON.stringify(response));
		}
	}).catch(error => {
		if (dutchie.errorStatus(error) == 422) {
			foxy.validateCustomer(post.email, post.password).then(customer => {
				if (customer) {
					customer._links['fx:transactions'].get()
						.then(transactionsResponse =>
							transactionsResponse.json()
						).then(transactions => {
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

app.get('/menu', (req, res) => {
	dutchie.menuQuery().then(response => {
		response = stripTypename(response);
		res.send(JSON.stringify(response));
	}).catch(error => {
		res.status(dutchie.errorStatus(error));
		res.send(JSON.stringify(error));
	});
});

app.get('/orders', (req, res) => {
	let cookies = parseCookies(req.headers.cookie);
	dutchie.accessToken = cookies.dutchie_access_token;

	dutchie.filteredOrders({"userId":cookies.dutchie_user_id}, {"sortBy":"createdAt","sortDirection":"desc"}, {"limit":20}).then(response => {
		response = stripTypename(response);
		res.send(JSON.stringify(response));
	}).catch(error => {
		res.status(dutchie.errorStatus(error));
		res.send(JSON.stringify(error));
	});
});

app.get('/user', (req, res) => {
	let cookies = parseCookies(req.headers.cookie);
	dutchie.accessToken = cookies.dutchie_access_token;

	dutchie.meConsumer().then(response => {
		response = stripTypename(response);
		res.send(JSON.stringify(response));
	}).catch(error => {
		res.status(dutchie.errorStatus(error));
		res.send(JSON.stringify(error));
	});
});

/***/
app.listen(port, () => {
	console.log('Express is listening on port 3000');
});
/***/

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

function stripTypename(obj) {
	for (var prop in obj) {
		if (obj[prop] !== null && typeof(obj[prop]) === 'object') {
			obj[prop] = stripTypename(obj[prop]);
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

module.exports.handler = serverless(app);