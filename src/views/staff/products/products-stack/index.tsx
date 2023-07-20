import { IProduct } from 'hooks/fetch-hooks/use-products';
import React, { FC } from 'react';
import { Stack, Card, CardContent, Typography, Icon, Divider, Button, CircularProgress, Box } from '@mui/material';
import { Icon as Iconify } from '@iconify/react';
import { Flex } from 'components/common';
import { stateSetter } from 'utils/types/state';

interface IProps {
	products: IProduct | IProduct[] | null;
	action: (id: string) => void;
	productForEdit: stateSetter<string>;
	loading: boolean;
}

const IconRenderer = ({ product }: { product: IProduct }): JSX.Element => {
	const isGoogle = product.icon.source === 'GoogleFonts';

	const data = isGoogle ? (
		<Icon fontSize='large'>{product.icon.name}</Icon>
	) : (
		<Iconify fontSize='large' icon={product.icon.name} />
	);

	return data;
};

const ProductsStack: FC<IProps> = ({ products, action, productForEdit, loading }) =>
	loading ? (
		<Box display='flex' alignItems='center' justifyContent='center' width='100%'>
			<CircularProgress size={100} />
		</Box>
	) : (
		<Stack direction='row' flexWrap='wrap' gap={2} px={2} sx={{ height: 'min-content' }}>
			{Array.isArray(products) &&
				products.map((product: IProduct) => (
					<Card
						onClick={(): void => productForEdit(product?._id || '')}
						sx={{ minWidth: 200, height: 200, cursor: 'pointer' }}
						key={product._id}>
						<CardContent>
							<Flex justifyCenter>
								<Typography variant='h4'> {product.name} </Typography>
							</Flex>
							<Divider />
							<IconRenderer product={product} />
							<Typography variant='h6' sx={{ ml: 1 }}>
								<strong>Path:</strong> {product.path}
							</Typography>

							<Typography variant='h6' sx={{ ml: 1 }}>
								<strong>Price:</strong> {product.price}
							</Typography>
							<Button
								onClick={(event): void => {
									event.stopPropagation();
									action(product._id || '');
									productForEdit('');
								}}>
								Delete
							</Button>
						</CardContent>
					</Card>
				))}
		</Stack>
	);

export default ProductsStack;
