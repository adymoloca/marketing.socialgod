import { Theme, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { capitalize, uuid } from 'utils/functions';
import { IconWrapper, PaymentWrapper, StyledIcon } from './index.styled';

const FooterPaymentMethods: React.FC = (): JSX.Element => {
	const paymentIcons: string[] = [
		'logos:visa',
		'logos:mastercard',
		'logos:paypal',
		'logos:visaelectron',
		'logos:google-pay',
		'logos:apple-pay',
		'logos:bitcoin',
		'logos:visaelectron',
		'simple-icons:dogecoin',
		'logos:ethereum',
		'formkit:tether',
		'simple-icons:litecoin',
		'simple-icons:polkadot',
		'simple-icons:cardano',
		'fa-brands:amazon-pay',
	];
	const theme = useTheme<Theme>();
	const { t } = useTranslation();

	return (
		<PaymentWrapper>
			<Typography
				component='span'
				sx={{
					fontSize: '1.8rem',
					color: `${theme.palette.primary.dark}`,
				}}>
				{capitalize(t('footer.payment_methods'))}
			</Typography>
			<IconWrapper>
				{paymentIcons.map(
					(item: string): JSX.Element => (
						<StyledIcon icon={item} key={uuid()} />
					)
				)}
			</IconWrapper>
		</PaymentWrapper>
	);
};

export default FooterPaymentMethods;
