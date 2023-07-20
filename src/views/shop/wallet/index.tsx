import { Flex, Heading } from 'components/common';
import { Wallet as WalletCard } from 'components/shop';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Wallet: FC = () => {
	const { t } = useTranslation();

	return (
		<>
			<Heading>{t('wallet')}</Heading>
			<Flex justifyCenter pb={3}>
				<WalletCard />
			</Flex>
		</>
	);
};

export default Wallet;
