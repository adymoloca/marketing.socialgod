import React, { FC, useCallback, useEffect } from 'react';
import { Grid } from '@mui/material';
import CreatePreSet from './components/CreatePreSet';

export interface SentObject {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
}

export interface BotObject {
	language: string;
	credentials: SentObject;
}

const ParentCreateBot: FC = () => {
	const [accountsNumber, setAccountsNumber] = React.useState<number>(1);
	const [data, setData] = React.useState<BotObject[]>([
		{ credentials: { firstName: '', lastName: '', username: '', password: '' }, language: '' },
	]);

	// **********************************| FOR CUSTOM |**************************************************************

	// const createDataArray = useCallback((numElements: number) => {
	//     const arr: BotCustomObject[] = [];
	//     for (let i = data?.length; i < numElements; i++) {
	//         arr.push({credentials:{ email: '', password: '' }, language: ''});
	//     }
	//     return setData((prev) => [...prev, ...arr]);
	// }, [setData, data?.length])

	// const removeLastElement = useCallback((numElements: number) => {
	//     const arr: BotCustomObject[] = data;
	//     for (let i = data?.length; i > numElements; i--) {
	//         arr.pop();
	//     }
	//         return setData([...arr]);
	//     // eslint-disable-next-line
	// }, [setData, data])

	// **********************************| FOR PRESET |**************************************************************

	const createDataArray = useCallback(
		(numElements: number) => {
			const arr: BotObject[] = [];
			for (let i = data?.length; i < numElements; i++) {
				arr.push({ credentials: { firstName: '', lastName: '', username: '', password: '' }, language: '' });
			}
			return setData((prev) => [...prev, ...arr]);
		},
		[setData, data?.length]
	);

	const removeLastElement = useCallback(
		(numElements: number) => {
			const arr: BotObject[] = data;
			for (let i = data?.length; i > numElements; i--) {
				arr.pop();
			}
			return setData([...arr]);
			// eslint-disable-next-line
		},
		[setData, data]
	);

	useEffect(() => {
		if (data?.length !== accountsNumber)
			if (data?.length < accountsNumber) createDataArray(accountsNumber);
			else removeLastElement(accountsNumber);
	}, [createDataArray, removeLastElement, accountsNumber, data?.length]);

	return (
		<Grid container sx={{ justifyContent: 'start' }}>
			<CreatePreSet
				accountsNumber={accountsNumber}
				handleAccounts={setAccountsNumber}
				data={data}
				setData={setData}
			/>
		</Grid>
	);
};

export default ParentCreateBot;
