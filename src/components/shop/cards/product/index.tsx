import { Box, BoxProps, Typography, TypographyProps, styled } from '@mui/material';
import { ButtonSG } from 'components/common';
import { FC } from 'react';
import { IResponsePackage } from 'utils/interfaces/packages';

interface ProductProps extends IResponsePackage {
	handleClick: () => void;
}

const Wrapper: FC<BoxProps> = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	textAlign: 'center',
	height: '500px',
	width: '230px',
	borderRadius: 15,
	border: `1px solid ${theme.palette.divider}`,
	padding: '10px',
	'&:hover': {
		backgroundColor: `${theme.palette.info.light}15`,
	},
}));

const Text: FC<TypographyProps> = styled(Typography)({
	width: '100%',
});

const Product: FC<ProductProps> = ({ discount, name, tokens, handleClick, description }) => (
	<Wrapper>
		<Text fontSize={22} flexGrow={2}>
			{name}
		</Text>
		<Text flexGrow={2}>{tokens}</Text>
		{discount && (
			<Text color={(theme): string => theme.palette.info.light} flexGrow={2}>{`${discount?.value} ${
				discount?.type === 1 ? '%' : (discount?.type === 2 && 'units') || ''
			} discount`}</Text>
		)}
		<Box flexGrow={2}>
			<ButtonSG onClick={handleClick}>
				BUY NOW
			</ButtonSG>
		</Box>
		<Text flexGrow={2}>{description}</Text>
	</Wrapper>
);

export default Product;
