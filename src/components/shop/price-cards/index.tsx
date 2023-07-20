import { Flex } from 'components/common';
import PriceCard from './card';
import CardData from './data/card-data.json';
import { PriceCardInterface } from './index.interfaces';

const PriceCardSection: React.FC = (): JSX.Element => (
	<Flex gap={4} flexWrap='wrap' justifyCenter>
		{CardData.map((cardData: PriceCardInterface): JSX.Element => (
			<PriceCard key={`${cardData.icon}-${cardData.benefits}`} {...cardData}/>
		))}
	</Flex>
);

export default PriceCardSection;