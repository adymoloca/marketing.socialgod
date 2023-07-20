import { FC } from 'react';
import { Typography, TypographyProps, styled } from '@mui/material';

type CustTypographyProps = TypographyProps<'h1', { component: 'h1' }>;

const CustomTypo: FC<CustTypographyProps> = styled(Typography as FC<CustTypographyProps>)(({ theme }) => ({
	fontSize: theme.typography.h4.fontSize,
	width: '100%',
	textAlign: 'left',
	paddingBottom: '30px',
	'&::first-letter': {
		textTransform: 'capitalize',
	},
}));

const Heading: FC<TypographyProps> = ({ children }) => <CustomTypo component='h1'>{children}</CustomTypo>;

export default Heading;
