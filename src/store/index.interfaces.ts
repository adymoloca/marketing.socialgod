export interface Utils {
	isUserValid: boolean;
	isDrawerOpen: boolean;
	serviceId: string;
	platform: string;
}

export interface Routes {
	shop: string[];
}

export interface AppState {
	utils: Utils;
	routes: Routes;
}
