import { FC } from 'react';
import { Flex } from 'components/common';
import BackButton from 'components/shop/button/back';
import { useTranslation } from 'react-i18next';
import { SettingsSectionProps } from '..';

const Display: FC<SettingsSectionProps> = ({ goBack }) => {
	const { t } = useTranslation();

	return (
		<Flex column gap={2} alignStart>
			<BackButton handler={goBack} title={t('display') ?? ''} />
		</Flex>
	);
};

export default Display;
