import React from 'react';
import { useNavigate } from 'react-router';
import { Box, InputLabel, MenuItem, Select, SelectProps, Typography, capitalize, useTheme } from '@mui/material';
import { Flex, Heading } from 'components/common/index';
import useLocalStorage from 'hooks/use-local-storage';
import { useTranslation } from 'react-i18next';
import locales from './locales.json';

const Settings = (): JSX.Element => {
	const theme = useTheme();
	const { t, i18n } = useTranslation();
	const [lang, setLang] = useLocalStorage('reddit_shop_lang');
	const navigate = useNavigate();
	const changeLang: SelectProps['onChange'] = (e) => {
		const newL = e.target.value as unknown as string;
		setLang(newL);
		i18n.changeLanguage(newL);
	};
	return (
		<Flex justifyCenter>
			<Box sx={{ width: '80%' }}>
				<Heading>{t('settings')}</Heading>
				<Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<InputLabel sx={{ color: '#000' }}>{capitalize(t('language'))}</InputLabel>
					<Select
						value={lang || 'en'}
						onChange={changeLang}
						sx={{ minWidth: '200px', textAlign: 'left', height: '40px' }}>
						{locales.map((el) => (
							<MenuItem key={el.value} value={el.value}>
								{capitalize(t(el.label))}
							</MenuItem>
						))}
					</Select>
				</Box>
				<Box
					sx={{
						width: '100%',
						height: '50px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<Typography>{capitalize(t('privacy_and_security'))}</Typography>
					<Typography
						sx={{ cursor: 'pointer', color: `${theme.palette.primary.main}` }}
						onClick={(): void => navigate('/staff/admin-password')}>
						{capitalize(t('change_password'))}
					</Typography>
				</Box>
			</Box>
		</Flex>
	);
};
export default Settings;
