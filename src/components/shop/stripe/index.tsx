/* eslint-disable jsx-a11y/label-has-associated-control */
import './index.css';
import React, { useState, useMemo, useContext } from 'react';
import {
	// CardElement,
	useStripe,
	useElements,
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
} from '@stripe/react-stripe-js';
import { Box, Button, CircularProgress } from '@mui/material';
import { FontSize, useResponsiveFontSize } from 'utils/hoc/use-responsive-fontSize';
import { requestClient } from 'utils/config/axios';
import { CurrencyOptions, IResponsePackage } from 'utils/interfaces/packages';
import { useNavigate } from 'react-router';
import { AuthContext } from 'utils/context/auth';
import { encryptJS } from 'utils/functions/decript';

interface UseOptionsReturnType {
	style: {
		base: {
			fontSize: FontSize;
			color: string;
			letterSpacing: string;
			fontFamily: string;
			'::placeholder': {
				color: string;
			};
		};
		invalid: {
			color: string;
		};
	};
}

const useOptions = (): UseOptionsReturnType => {
	const fontSize = useResponsiveFontSize();
	const options = useMemo(
		() => ({
			style: {
				base: {
					fontSize,
					color: '#424770',
					letterSpacing: '0.025em',
					fontFamily: 'Source Code Pro, monospace',
					'::placeholder': {
						color: '#aab7c4',
					},
				},
				invalid: {
					color: '#9e2146',
				},
			},
		}),
		[fontSize]
	);

	return options;
};

interface IProps {
	dataId: IResponsePackage;
	currency: CurrencyOptions;
}

const PaymentForm: React.FC<IProps> = (props) => {
	const { dataId, currency } = props;

	const { updateUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const stripe = useStripe();
	const elements = useElements();
	const options = useOptions();
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = async (event: React.FormEvent): Promise<void> => {
		event.preventDefault();
		setLoading(true);

		if (!stripe || !elements) {
			return;
		}

		const cardElement = elements.getElement(CardNumberElement);
		// const cardElement = elements.getElement(CardElement);

		if (!cardElement) {
			return;
		}

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
		});

		if (error) {
			setErrorMessage(error?.message as string);
			return;
		}
		try {
			const sentData = { paymentMethodId: paymentMethod.id, currency };
			const stringData = JSON.stringify(sentData);
			const encData = encryptJS(stringData);
			const response = await requestClient.patch(`packages/${dataId?._id}/purchase`, { data: encData });
			const data = await response.data;
			response.status === 200 &&
				data.message === 'Package successfully purchased.' &&
				updateUser((user) => ({
					...user,
					tokens: user.tokens + (dataId?.tokens || 0), // PUT there dynamic amount
				}));
			setLoading(false);
			navigate('/shop/dashboard');
		} catch (errorMess) {
			console.log('Eroare: ', errorMess);
		}
	};

	return (
		<Box
			sx={{
				width: 500,
				height: 300,
			}}>
			{
				// added to avoid lint warning
				<div>{errorMessage}</div>
			}
			<form id='paymentForm' onSubmit={handleSubmit}>
				<label>
					Card number
					<CardNumberElement
						options={options}
						onReady={(): void => {
							console.log('CardNumberElement [ready]');
						}}
						onChange={(event): void => {
							console.log('CardNumberElement [change]', event);
						}}
						onBlur={(): void => {
							console.log('CardNumberElement [blur]');
						}}
						onFocus={(): void => {
							console.log('CardNumberElement [focus]');
						}}
					/>
				</label>
				<label>
					Expiration date
					<CardExpiryElement
						options={options}
						onReady={(): void => {
							console.log('CardNumberElement [ready]');
						}}
						onChange={(event): void => {
							console.log('CardNumberElement [change]', event);
						}}
						onBlur={(): void => {
							console.log('CardNumberElement [blur]');
						}}
						onFocus={(): void => {
							console.log('CardNumberElement [focus]');
						}}
					/>
				</label>
				<label>
					CVC
					<CardCvcElement
						options={options}
						onReady={(): void => {
							console.log('CardNumberElement [ready]');
						}}
						onChange={(event): void => {
							console.log('CardNumberElement [change]', event);
						}}
						onBlur={(): void => {
							console.log('CardNumberElement [blur]');
						}}
						onFocus={(): void => {
							console.log('CardNumberElement [focus]');
						}}
					/>
				</label>
				<Button sx={{ minWidth: '120px' }}  type='submit' disabled={!stripe || loading}>
					{loading ? <CircularProgress size={24} /> : 'Pay now'}
				</Button>
			</form>
			{/* <form onSubmit={handleSubmit}>
        <div>
          <label>
            Card details
            <CardElement />
          </label>
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit">Pay</button>
      </form> */}
		</Box>
	);
};

export default PaymentForm;
