import { styled } from '@mui/material';
import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export const NavButton: FC<LinkProps> = styled(Link)(({ theme }) => ({
	position: 'relative',
	fontSize: theme.spacing(2),
	borderRadius: 0,
	color: theme.palette.common.black,
	padding: '0 8px',
	marginTop: '20px',
	textTransform: 'none',
	textDecoration: 'none',
	'&: hover': {
		color: theme.palette.primary.main
	},
}));
