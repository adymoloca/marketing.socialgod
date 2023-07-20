import { Box, BoxProps, Button, ButtonProps, styled } from '@mui/material';
import { FC } from 'react';

const SectionsWrapper: FC<BoxProps> = styled(Box)(({ theme }) => ({
	display: 'flex',
	maxWidth: '1200px',
	width: '100%',
	justifySelf: 'center',
	[theme.breakpoints.up('md')]: {
		justifyContent: 'space-between',
	},
	[theme.breakpoints.down('md')]: {
		justifyContent: 'flex-start',
	},
	flexWrap: 'wrap'
}));

const ButtonText: FC<ButtonProps> = styled(Button)(() => ({
	display: 'flex',
	justifyContent: 'flex-start',
	textTransform: 'none',
	height: '40px',
}));

const SectionWrapper: FC<BoxProps> = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	margin: '24px 0',
	width: 'auto',
}));

export { SectionsWrapper, ButtonText, SectionWrapper };