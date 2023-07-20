import React, { FC, useEffect } from 'react';
import { Flex } from 'components/common';
import { Icon } from '@iconify/react';
import { Link } from '@mui/material';
import usePartners from 'hooks/fetch-hooks/use-partners';
import { IPartner } from 'hooks/fetch-hooks/use-partners/index.actions';
import { uuid } from 'utils/functions';
import { SliderContainer } from '../components/slide-show/SliderContiner';
import { SliderList } from '../components/slide-show/SliderList';
import { SliderItem } from '../components/slide-show/SliderItem';

const PartnersSlideshow: FC = (): JSX.Element => {
	const { data, getPartners } = usePartners();

	useEffect(() => {
		getPartners('guest');
		// eslint-disable-next-line
	}, []);

	const doublePartners: IPartner[] = Array.isArray(data) ? [...data, ...data] : [];

	return (
		<Flex sx={{ display: 'grid', placeItems: 'center' }}>
			<SliderContainer>
				<SliderList direction='left' duration={10} 
					sx={{ width: `${250 * (doublePartners?.length ?? 0)}px!important` }}>
					{doublePartners?.map((partener, _index) => (
						<SliderItem key={`${partener?._id}-${uuid()}`}>
							<Link href={partener?.link ? partener.link : ''} target='_blank'>
								<Icon icon={partener?.logo} />
							</Link>
						</SliderItem>
					))}
				</SliderList>
			</SliderContainer>
		</Flex>
	);
};

export default PartnersSlideshow;
