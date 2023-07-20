import { MenuItem, Select, SelectProps, capitalize } from '@mui/material';
import { Flex } from 'components/common';
import useLocalStorage from 'hooks/use-local-storage';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import BackButton from 'components/shop/button/back';
import locales from '../data/locales.json';
import { SettingsSectionProps } from '..';

const Language: FC<SettingsSectionProps> = ({ goBack }) => {
	const { t, i18n } = useTranslation();
	const [lang, setLang] = useLocalStorage('reddit_shop_lang');

	const changeLang: SelectProps['onChange'] = (e) => {
		const newL = e.target.value as unknown as string;
		setLang(newL);
		i18n.changeLanguage(newL);
	};

	return (
		<Flex column gap={2} alignStart>
			<BackButton handler={goBack} title={t('language') ?? ''} />
			<Select value={lang || 'en'} onChange={changeLang} sx={{ minWidth: '200px', textAlign: 'left' }}>
				{locales.map((el) => (
					<MenuItem key={`${el.value}`} value={el.value}>
						{capitalize(t(el.label))}
					</MenuItem>
				))}
			</Select>
		</Flex>
	);
};

export default Language;
