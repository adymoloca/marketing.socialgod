import React, { FC, Fragment, useCallback, useEffect } from 'react';
import { Box, CircularProgress, Divider, Grid } from '@mui/material';
import { ButtonSG } from 'components/common';
import { Add } from '@mui/icons-material';
import useProxy from 'hooks/fetch-hooks/use-proxy';
import { useTranslation } from 'react-i18next';
import { capitalize, uuid } from 'utils/functions';
import MultipleProxysInput from '../../components/MultipleProxysInput';
import { ISetter } from '../..';

export interface IProxyObject {
	platform: string;
	type: number;
	proxies: string[];
}
export interface ISendData {
	proxies: IProxyObject[];
}

const AddProxyForm: FC<ISetter> = (setter) => {
	const { setTabValue } = setter;
	const { t } = useTranslation();

	const [accountsNumber, setAccountsNumber] = React.useState<number>(1);
	const [data, setData] = React.useState<ISendData>({ proxies: [{ platform: '', type: 0, proxies: [''] }] });

	const { loading, postProxies, message, setMessage } = useProxy();

	const handleAdd = (maxVal: number): void => {
		maxVal < 6 && setAccountsNumber(maxVal + 1);
	};

	const createDataArray = useCallback(
		(numElements: number, dataProxies: IProxyObject[]) => {
			const arr: IProxyObject[] = [];
			for (let i = dataProxies?.length; i < numElements; i++) {
				arr.push({ platform: '', type: 0, proxies: [] });
			}
			return setData((prev) => ({ proxies: [...(prev?.proxies || []), ...arr] }));
		},
		[setData]
	);

	const removeLastElement = useCallback(
		(numElements: number, dataProxies: IProxyObject[]) => {
			const arr: IProxyObject[] = dataProxies;
			for (let i = dataProxies?.length; i > numElements; i--) {
				arr.pop();
			}
			return setData({ proxies: [...arr] });
		},
		[setData]
	);

	const handleSubmit = (values: ISendData): void => {
		postProxies(values);
	};

	const isDisabled = (values: IProxyObject[]): boolean => {
		for (let i = 0; i < values.length; i++) {
			const interestObject = values[i];
			if (interestObject?.proxies?.length > 0) {
				for (let j = 0; j < interestObject?.proxies.length; j++) {
					if (interestObject?.proxies[j]?.length < 5 || loading) {
						return true;
					}
				}
			} else return true;
		}
		return false;
	};

	useEffect(() => {
		if (data?.proxies?.length !== accountsNumber)
			if (data?.proxies?.length < accountsNumber) createDataArray(accountsNumber, data?.proxies);
			else removeLastElement(accountsNumber, data?.proxies);
		// eslint-disable-next-line
	}, [createDataArray, removeLastElement, accountsNumber, data?.proxies]);

	useEffect(() => {
		if (message && message?.length > 0) {
			console.log('use effect if', message);
			setMessage('');
			setTabValue(0);
		}
	}, [message, setMessage, setTabValue]);

	return (
		<Grid container sx={{ justifyContent: 'start', gap: 4 }}>
			{data?.proxies?.map((account, index) => (
				<Fragment key={`${account.platform}-${uuid()}`}>
					{index > 0 && <Divider sx={{ color: '#696969', height: '3px', width: '100%' }} />}
					<MultipleProxysInput
						data={data}
						setData={setData}
						accoutsNumber={accountsNumber}
						setAccountsNumber={setAccountsNumber}
						index={index}
					/>
				</Fragment>
			))}
			<Box sx={{ width: '100%', display: 'flex', gap: 3 }}>
				<ButtonSG
					onClick={(): void => handleSubmit(data)}
					disabled={isDisabled(data?.proxies)}
					type='submit'
					sx={{ width: '300px' }}>
					{loading ? (
						<CircularProgress size='24px' sx={{ color: '#fff' }} />
					) : (
						`${capitalize(t('add_proxies'))}`
					)}
				</ButtonSG>
				<ButtonSG
					disabled={accountsNumber === 6}
					onClick={(): void => handleAdd(accountsNumber)}>
					<Add />
				</ButtonSG>
			</Box>
		</Grid>
	);
};

export default AddProxyForm;
