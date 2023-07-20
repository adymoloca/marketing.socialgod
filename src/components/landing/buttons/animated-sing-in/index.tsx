import React, { FC } from 'react';
import { Login } from '@mui/icons-material';
import { Button, ButtonProps, styled } from '@mui/material';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const CustomSignInButton: FC<ButtonProps> = styled(Button)(({ theme }) => ({
	position: 'relative',
	width: '180px',
	borderRadius: '22px',
	height: '40px',
	boxShadow: 'inset 0px 0px 1px 4px #fff',
	border: `2px solid ${theme?.palette?.primary?.light}`,
	fontSize: '17px',
	fontWeight: '600',
	letterSpacing: 2,
	':hover': {
		backgroundColor: `${theme?.palette?.primary?.main}`,
		boxShadow: 'inset 11px 0px 1px 0px #fff',
	},
	transition: 'all 0.2s ease-in-out',
	'& > span': {
		fontSize: '30px',
		color: '#fff',
	},
	'& > span > svg': {
		padding: '0',
		position: 'absolute',
		top: '6px',
		left: '12px',
		borderRadius: '50%',
		width: '25px',
		height: '25px',
		boxShadow: 'none',
		border: 'none',
		backgroundColor: `${theme?.palette?.primary?.main}`,
		transition: 'all 0.2s ease-in-out',
	},
	'&:hover > span > svg': {
		padding: '8px',
		top: '-4px',
		left: '-8px',
		width: '45px',
		height: '45px',
		boxShadow: 'inset 0px 0px 1px 4px #fff',
		border: `2px solid ${theme?.palette?.primary?.light}`,
		backgroundColor: `${theme?.palette?.primary?.main}`,
	},
}));

const SignInButton: FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<CustomSignInButton
				aria-label='sing in'
				onClick={(): void => navigate('/sign-in')}
				startIcon={<Login />}>
				{t('sign_in')}
			</CustomSignInButton>
		</div>
	);
};

export default SignInButton;
