import { FC, useEffect, useState } from 'react';
import { Heading } from 'components/common';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from 'components/shop/stripe';
import { useLocation } from 'react-router';
import { Box } from '@mui/material';
import { CurrencyOptions } from 'utils/interfaces/packages';
import usePackages from 'hooks/fetch-hooks/use-packages';
import PackagePresentation from './components/PackagePresentation';
import config from '../../../env.config';

const stripePromise = loadStripe(config?.stripe?.key);

const Checkout: FC = () => {
	const { t } = useTranslation();
	const { state } = useLocation();

	const { loading, dataId, getPackageById } = usePackages();

	useEffect(() => {
		getPackageById('client', state?.packageId);
		// eslint-disable-next-line
	}, []);

	const [currency, setCurrency] = useState<CurrencyOptions>('ron');

	return (
		<>
			<Heading>{t('checkout')}</Heading>
			<Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
				<Box sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
					<Elements stripe={stripePromise}>
						<PaymentForm dataId={dataId} currency={currency} />
					</Elements>
				</Box>
				<Box sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
					<PackagePresentation
						loading={loading}
						dataId={dataId}
						currency={currency}
						setCurrency={setCurrency}
					/>
				</Box>
			</Box>
		</>
	);
};

export default Checkout;
