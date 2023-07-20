import { AxiosResponse } from 'axios';
import { AES, enc } from 'crypto-js';
import config from 'env.config';

const crypto = config?.crypto?.crypto_key;

export const encryptJS = (plain: string): string => AES.encrypt(`${plain}`, crypto).toString();

export const decryptJS = (encrypted: string): string => {
	const bytes = AES.decrypt(encrypted, crypto);
	return String(bytes.toString(enc.Utf8));
};

export const encryptData = (sentData: any): { data: string } => {
	const stringData = JSON.stringify(sentData);
	const encData = encryptJS(stringData);

	return { data: encData };
};

export const decryptData = (dataResponse: AxiosResponse): any => {
	// eslint-disable-next-line @typescript-eslint/no-shadow
	const enc = String(dataResponse?.data?.data);
	const dec = decryptJS(enc);
	const data = JSON.parse(dec);
	return data;
};
