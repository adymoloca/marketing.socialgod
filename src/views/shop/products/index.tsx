import { Flex, Heading } from 'components/common';
import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import usePackages from 'hooks/fetch-hooks/use-packages';
import ProductCard from './productCard';

const Products: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [selectedProduct, setSelectedProduct] = useState<string>('');

	const { getPackage, data } = usePackages();

	useEffect(() => {
		getPackage('client');
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<Heading>{t('products')}</Heading>
			<Flex justifyCenter gap={3} pb={3}>
				{data.map(({ ...item }) => (
					<ProductCard
						key={`${item?.name}-${item?.description}`}
						{...item}
						selectProduct={setSelectedProduct}
						handleClick={(): void => navigate('../checkout', { state: { packageId: item?._id } })}
						isSelected={item._id === selectedProduct}
					/>
				))}
			</Flex>
		</>
	);
};

export default Products;
