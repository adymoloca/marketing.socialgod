export interface Credentials {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
}

export interface Cookie {
	name: string;
	value: string;
	domain: string;
	path: string;
	expires: number;
	size: number;
	httpOnly: boolean;
	secure: boolean;
	session: boolean;
	sameSite?: string;
	sameParty: boolean;
	sourceScheme: string;
	sourcePort: number;
}

export interface CookiesStack {
	url: string;
	cookiesExpireAt: string;
	cookies: Cookie[];
}

export interface StartConfig {
	browserConfig: BrowserConfig;
	cookiesStack: CookiesStack;
	proxy: string;
	scope: string;
	language: string;
	urlToGo: string;
	platform: string;
	selectors: Selector[];
}

export interface Selector {
	step: number;
	type: string;
	prevSelectors: string[];
	value: string;
	_id: string;
}
export interface ViewPort {
	width: number;
	height: number;
	deviceScaleFactor: number;
}

export interface BrowserConfig {
	os?: string;
	device: string;
	args: string[];
	viewPort: ViewPort;
	path: string;
	userAgent: string;
	_id?: string;
}

export interface IResponseGetBrowserConfig {
	browserConfigs: BrowserConfig[];
}

export interface Config {
	credentials: Credentials;
	startConfig: StartConfig;
	_id: string;
	language: string;
	assignedProxies: string[];
	historyConfigs: any[]; // You can replace "any" with a specific interface if available
	cookiesStacks: CookiesStack[];
	browserConfigs: BrowserConfig[];
}

export interface AllBotsResponse {
	bots: Config[];
}

export interface BotResponse {
	bot: Config;
}
