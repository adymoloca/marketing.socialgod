export interface IPackage {
	name: string;
	description: string;
	tokens: number;
	initialPrice: IPackagePrice;
	discount: IPackageDiscount;
}

export interface IResponsePackage {
	_id: string;
	name: string;
	description: string;
	tokens: number;
	initialPrices: IPackagePrice[];
	discount: IPackageDiscount;
	discounts: IPackageDiscount[];
	finalPrices: IPackagePrice[];
}

export interface IPackagePrice {
	currency: CurrencyOptions;
	value: number;
	_id?: string;
}

export interface IPackageDiscount {
	type: 0 | 1 | 2;
	value?: number;
	currency?: CurrencyOptions;
}

export type CurrencyOptions = 'ron' | 'eur' | 'usd' | 'btc' | 'eth';
