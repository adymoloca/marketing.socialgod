const API_URL = String(process.env.REACT_APP_API_URL);
const API_ADMIN_URL = String(process.env.REACT_APP_API_ADMIN_URL);
const API_CLIENT_URL = String(process.env.REACT_APP_API_CLIENT_URL);
const API_GUESTS_URL = String(process.env.REACT_APP_API_GUESTS_URL);
const STRIPE_API_KEY = String(process.env.REACT_APP_STRIPE_API_KEY);
const CRYPTO_KEY = String(process.env.REACT_APP_CRYPTO_JS_SK);

const config = {
	api: {
		url: API_URL,
		urlAdmin: API_ADMIN_URL,
		urlClient: API_CLIENT_URL,
		urlGuests: API_GUESTS_URL,
	},
	stripe: {
		key: STRIPE_API_KEY,
	},
	crypto: {
		crypto_key: CRYPTO_KEY,
	},
};

export default config;
