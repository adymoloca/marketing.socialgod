import { Box, Button, CircularProgress } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useCreateBot from 'hooks/fetch-hooks/use-create-bot';
import { useNavigate } from 'react-router';
import { BotObject } from '../ParentCreateBot';
import CredentialsForm from './CredentialsForm';

interface IProps {
	data: BotObject[];
	setData: React.Dispatch<React.SetStateAction<BotObject[]>>;
	accountsNumber: number;
	handleAccounts: React.Dispatch<React.SetStateAction<number>>;
}

const CreatePreSet: FC<IProps> = (props) => {
	const { data, setData, accountsNumber, handleAccounts } = props;
	const { t } = useTranslation();
	const { postBots, loading, message, setMessage } = useCreateBot();
	const navigate = useNavigate();

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, values: BotObject[]): void => {
		e.preventDefault();
		const newData = { bots: [...values] };
		postBots(newData);
	};

	const isDisabled = (values: BotObject[]): boolean => {
		for (let i = 0; i < values.length; i++) {
			if (
				values[i]?.credentials?.username.length < 5 ||
				values[i]?.credentials?.password.length < 8 ||
				values[i]?.credentials?.firstName.length < 2 ||
				values[i]?.credentials?.lastName.length < 2 ||
				values[i]?.language.length < 2 ||
				loading
			) {
				return true;
			}
		}
		return false;
	};

	useEffect(() => {
		if (message && message?.length > 0) {
			setData([{ credentials: { firstName: '', lastName: '', username: '', password: '' }, language: '' }]);
			setMessage('');
			navigate('/staff/config-bots');
		} else console.log(message);
	}, [message, setMessage, setData, navigate]);

	return (
		<>
			<Box
				sx={{
					my: 4,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'start',
					alignItems: 'start',
					width: '100%',
				}}>
				{data?.map((el, index) => (
					<CredentialsForm
						key={`fromic-for-user-${el.credentials.firstName}-${el.credentials.lastName}`}
						index={index}
						data={data}
						setData={setData}
						accoutsNumber={accountsNumber}
						setAccountsNumber={handleAccounts}
					/>
				))}
			</Box>
			<Button
				onClick={(e): void => handleSubmit(e, data)}
				disabled={isDisabled(data)}
				sx={{ mb: 2, width: '300px' }}>
				{loading ? <CircularProgress size='24px' /> : <>{t('create_account')}</>}
			</Button>
		</>
	);
};

export default CreatePreSet;
