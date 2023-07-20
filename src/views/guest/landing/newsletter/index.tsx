import * as Yup from 'yup';
import {
	CircularProgress,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Typography,
	Box,
} from '@mui/material';
import { ErrorMessage, Formik } from 'formik';
import { ButtonSG } from 'components/common';
import { capitalize, uuid } from 'utils/functions';
import { useTranslation } from 'react-i18next';
import useSubscribe from 'hooks/fetch-hooks/use-subscribe';
import { FC } from 'react';

export interface IValuesProps {
	email: string;
	categories: string[];
}
const Newsletter: FC = (): JSX.Element => {
	const { t } = useTranslation();
	const { sendSubscribe, loadingSubscribe, categories } = useSubscribe();
	const submitAction = (values: IValuesProps, actions: { resetForm: () => void }): void => {
		const formatedAccess = values.categories?.length === categories.length ? ['All'] : values.categories;
		const sendData = { ...values, categories: formatedAccess };
		sendSubscribe(sendData);
		actions.resetForm();
	};
	const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const isValid = (value: string): boolean => regex.test(value);

	function isDisabled(values: IValuesProps): boolean {
		return !values?.email || values?.categories?.length < 1 || !isValid(values?.email);
	}
	const YupValidation = Yup.object().shape({
		email: Yup.string()
			.required('Required field')
			.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Enter a valid email!'),
	});

	return (
		<Box
			sx={{
				maxWidth: '1200px',
				width: '100%',
				height: 'auto',
				display: 'flex',
				flexWrap: 'wrap',
				alignItems: 'flex-end',
				justifyContent: { lg: 'space-between', xs: 'center' },
				mb: { md: '100px', xs: '10px' },
			}}
		>
			<Formik
				initialValues={{
					email: '',
					categories: ['All'],
				}}
				validationSchema={YupValidation}
				onSubmit={submitAction}
			>
				{({ errors, handleBlur, handleChange, handleSubmit, touched, values }): JSX.Element => (
					<form
						noValidate
						onSubmit={handleSubmit}
						style={{
							width: '100%',
							maxWidth: '600px',
							display: 'flex',
							flexDirection: 'column',
							gap: '18px',
						}}
					>
						<Grid item xs={12}>
							<FormControl fullWidth error={Boolean(touched.email && errors.email)}>
								<InputLabel htmlFor='outlined-adornment-email'>{capitalize(t('email'))}</InputLabel>
								<OutlinedInput
									id='outlined-adornment-email'
									type='text'
									value={values.email}
									name='email'
									label='Email'
									onBlur={handleBlur}
									onChange={handleChange}
									inputProps={{ maxLength: '40' }}
								/>
								{touched.email && errors.email && (
									<ErrorMessage
										name='email'
										render={(msg): JSX.Element => (
											<Typography
												sx={{
													fontSize: '12px',
													color: 'red',
													paddingLeft: '10px',
												}}
											>
												{msg}
											</Typography>
										)}
									/>
								)}
							</FormControl>
						</Grid>

						<FormControl fullWidth error={Boolean(touched.categories && errors.categories)}>
							<InputLabel id='select-category-label'>Category</InputLabel>
							<Select
								labelId='select-categories-label'
								id='select-categories'
								label={capitalize(t('categories'))}
								name='categories'
								multiple
								value={[...(values.categories || ['All'])]}
								onBlur={handleBlur}
								onChange={handleChange}
							>
								{categories.length < 1 ? (
									<CircularProgress size={20} />
								) : (
									categories?.map((category, _index) => (
										<MenuItem key={`category-${uuid()}`} value={category}>
											{capitalize(category)}
										</MenuItem>
									))
								)}
							</Select>
							{touched.categories && errors.categories && (
								<ErrorMessage
									name='email'
									render={(msg): JSX.Element => (
										<Typography
											sx={{
												fontSize: '12px',
												color: 'red',
												paddingLeft: '10px',
											}}
										>
											{msg}
										</Typography>
									)}
								/>
							)}
						</FormControl>
						<ButtonSG
							name='subscribe'
							disabled={isDisabled(values)}
							type='submit'
							sx={{ mt: 2, width: '200px' }}
						>
							{loadingSubscribe ? <CircularProgress size={20} /> : 'subscribe'}
						</ButtonSG>
					</form>
				)}
			</Formik>
			<Box
				component='img'
				src='https://storage.googleapis.com/sbdcloud/1687779585103-newsletterr.jpg'
				alt='test'
				sx={{
					minWidth: '250px',
					minHeight: '250px',
					width: { md: '500px', xs: 'auto' },
					height: { md: '400px', xs: 'auto' },
					maxWidth: { md: '500px', xs: '100%' },
					maxHeight: { md: '500px', xs: '350px' },
					mb: { xs: 0, lg: '100px' },
				}}
			/>
		</Box>
	);
};

export default Newsletter;
