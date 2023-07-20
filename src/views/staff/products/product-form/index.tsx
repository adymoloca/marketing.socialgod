import { CardContent, CardHeader, MenuItem } from '@mui/material';
import { ButtonSG, Flex } from 'components/common';
import { IProduct } from 'hooks/fetch-hooks/use-products';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { FormBox, FormContainer, TextField } from '../index.styled';

interface IProps {
	disabled: boolean;
	data?: IProduct;
	submit: (product: IProduct) => void;
}

const initial: IProduct = {
	icon: { name: '', source: '' },
	name: '',
	path: '',
	price: '',
};

const ProductForm: FC<IProps> = ({ disabled, data, submit }) => {
	const [product, setProduct] = useState<IProduct>(data || initial);

	const handleProduct = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			const [key, iconKey] = name.split('.');
			// const productToSet = setProduct((prev)=>
			// 	key === 'icon'
			// 		? { ...prev, icon: { ...prev.icon, [iconKey]: value } }
			// 		: { ...prev, [key]: name === 'price' ? value : value }
			// );
			key === 'icon' &&
				setProduct((prev) => ({
					...prev,
					icon: { ...prev.icon, [iconKey]: value },
				}));
		},
		[setProduct]
	);

	const handleSubmit = useCallback(
		(prod: IProduct) => {
			submit(prod);
			setProduct(initial);
			// eslint-disable-next-line
		},
		[submit]
	);

	return (
		<FormBox id='product-form'>
			<FormContainer>
				<CardHeader title='Products' />
				<CardContent>
					<Flex justifyCenter>
						<TextField
							id='product-name'
							label='Product name'
							name='name'
							autoFocus
							value={product.name}
							onChange={handleProduct}
							disabled={disabled}
						/>
						<TextField
							id='product-price'
							label='Product price'
							name='price'
							type='number'
							InputProps={{
								inputProps: {
									min: 0,
								},
							}}
							value={product.price}
							onChange={handleProduct}
							disabled={disabled}
						/>
						<TextField
							id='icon-name'
							label='Icon name'
							name='icon.name'
							value={product.icon.name}
							onChange={handleProduct}
							disabled={disabled}
						/>
						<TextField
							id='icon-source'
							label='Icon source'
							name='icon.source'
							select
							onChange={handleProduct}
							value={product.icon.source}
							disabled={disabled}>
							<MenuItem value='Iconify'>Iconify</MenuItem>
							<MenuItem value='GoogleFonts'>GoogleFonts</MenuItem>
						</TextField>
						<TextField
							id='product-path'
							label='Product path'
							name='path'
							value={product.path}
							onChange={handleProduct}
							disabled={disabled}
						/>
						<ButtonSG sx={{ m: 3, mb: 2 }} onClick={(): void => handleSubmit(product)} disabled={disabled}>
							{!data ? 'Add' : 'Update'}
						</ButtonSG>
					</Flex>
				</CardContent>
			</FormContainer>
		</FormBox>
	);
};
ProductForm.defaultProps = {
	data: initial,
};
export default ProductForm;
