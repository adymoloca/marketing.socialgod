import { Box, Grid, Paper } from '@mui/material';
import { FC, useState, useCallback } from 'react';
import useProducts, { IProduct } from 'hooks/fetch-hooks/use-products';
import { Flex } from 'components/common';
import { isArray } from 'utils/functions';
import SelectService from './select-service';
import ProductForm from './product-form';
import ProductsStack from './products-stack';

const Products: FC = () => {
	const [service, setService] = useState<string>('');
	const [productSelected, setProductSelected] = useState<string>('');
	const { data: products, addProduct, updateProduct, removeProduct, loading } = useProducts(service);

	const handleSelectService = useCallback(
		(selected: string) => {
			setService(selected);
			!!productSelected && setProductSelected('');
		},
		[productSelected]
	);

	const handleSubmit = useCallback(
		async (product: IProduct) => {
			const callbackNeeded = productSelected ? updateProduct : addProduct;
			callbackNeeded(product);
			!!productSelected && setProductSelected('');
		},
		[productSelected, updateProduct, addProduct]
	);

	return (
		<Grid item xs={12} sm={8} md={5} component={Paper} square>
			<Box display='flex'>
				<Flex column alignStart id='aside'>
					<SelectService service={service} setService={handleSelectService} />
					<ProductForm
						key={productSelected}
						data={isArray(products) ? products.find((el) => el._id === productSelected) : undefined}
						disabled={!service}
						submit={handleSubmit}
					/>
				</Flex>
				<ProductsStack
					products={products}
					action={removeProduct}
					productForEdit={setProductSelected}
					loading={loading}
				/>
			</Box>
		</Grid>
	);
};

export default Products;
