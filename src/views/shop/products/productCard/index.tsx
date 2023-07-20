import { FC } from 'react';
import { BoxProps, Box, styled, Typography, TypographyProps } from '@mui/material';
import { ButtonSG } from 'components/common';
import { stateSetter } from 'utils/types/state';
import { IPackageDiscount } from 'utils/interfaces/packages';

interface ProductProps {
	_id: string;
	name: string;
	description: string;
	tokens: number;
	discount: IPackageDiscount;
	isSelected: boolean;
	handleClick: () => void;
	selectProduct: stateSetter<string>;
}

interface ExtendedBoxProps extends BoxProps {
	isSelected?: boolean;
}

const Wrapper: FC<ExtendedBoxProps> = styled(Box, {
	shouldForwardProp: (prop: string) => !['isSelected'].includes(prop),
})<ExtendedBoxProps>(({ theme, isSelected }) => ({
	display: 'flex',
	flexDirection: 'column',
	textAlign: 'center',
	height: '400px',
	width: '180x',
	marginBottom: '11px',
	marginTop: '11px',
	borderRadius: 15,
	border: `1px solid ${theme.palette.divider}`,
	padding: '10px',
	'&:hover': {
		backgroundColor: `${theme.palette.info.light}15`,
	},
	...(isSelected && {
		transform: 'scale(1.2)',
		transition: 'transform 0.3s ease-in-out',
		border: 3,
		borderStyle: 'solid',
		borderColor: `${theme.palette.primary.main}`,
	}),
}));

Wrapper.defaultProps = {
	isSelected: false,
};

const Text: FC<TypographyProps> = styled(Typography)({
	width: '100%',
});

const ProductCard: FC<ProductProps> = ({
	name = '',
	discount,
	tokens,
	handleClick,
	description,
	_id,
	isSelected = false,
	selectProduct,
}) => (
	<Wrapper isSelected={isSelected} onClick={(): void => selectProduct(_id || '')}>
		<Text color={(theme): string => theme.palette.success.light} fontWeight={700} minHeight='10%'>
			{name}
		</Text>
		<Text fontSize={22} flexGrow={2}>
			{tokens}
		</Text>
		{discount && (
			<Text color={(theme): string => theme.palette.info.light} flexGrow={2}>{`${discount?.value} ${
				discount?.type === 1 ? '%' : discount?.type === 2 && 'units'
			} discount`}</Text>
		)}
		<Box flexGrow={2}>
			<ButtonSG  onClick={handleClick}>
				Buy now
			</ButtonSG>
		</Box>
		<Text flexGrow={2}>{description}</Text>
	</Wrapper>
);

export default ProductCard;
