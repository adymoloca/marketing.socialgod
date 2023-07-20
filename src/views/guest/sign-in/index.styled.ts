import { Box, BoxProps, Grid, GridProps, Typography, TypographyProps, styled } from '@mui/material';
import { FC } from 'react';

const LogoWrapper: FC<BoxProps> = styled(Box)(() => ({
	display: 'flex',
	width: '100%',
	justifyContent: 'space-between',
	alignItems: 'center',
	paddingLeft: 2,
	paddingRight: 2,
}));
interface AuthGridProps extends GridProps {
	component: React.ElementType;
	elevation: number;
	square: boolean;
}
const AuthGrid: FC<AuthGridProps> = styled(Grid)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	flexDirection: 'column',
}));
const BottomAuthWrapper: FC<BoxProps> = styled(Box)(() => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	p: {
		md: 3,
		xs: 0,
	},
	textAlign: 'center',
	alignItems: 'center',
}));
const LegalInfoBox: FC<BoxProps> = styled(Box)(() => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	flexWrap: 'wrap',
}));
const HighlightedTypography: FC<TypographyProps> = styled(Typography)(({ theme }) => ({
	color: theme.palette.primary.main,
	fontWeight: 800,
	cursor: 'pointer',
	marginRight: '8px',
}));
const ErrorMessage: FC<TypographyProps> = styled(Typography)(({ theme }) => ({
	color: theme.palette.error.main,
	fontSize: '10px',
	marginLeft: '10px',
}));
export { LogoWrapper, AuthGrid, BottomAuthWrapper, LegalInfoBox, HighlightedTypography, ErrorMessage };
