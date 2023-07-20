import { Box, BoxProps, styled } from '@mui/material';
import CommonCarousell from 'components/common/carousel';
import React, { FC } from 'react';
import { uuid } from 'utils/functions';

const cards = [
	{ title: 'Card 1', text: ' eget dolor vel ligula hendrerit venenatis.' },
	{ title: 'Card 2', text: ' risus quis varius posuere. Sed finibus leo sit amet sem vulputate, ' },
	{ title: 'Card 3', text: ' urna finibus, id lacinia odio vestibulum.' },
	{ title: 'Card 4', text: ' Sed tempus nisl non posuere porttitor.' },
	{ title: 'Card 5', text: ' Ut at tellus interdum, lacinia justo non, dignissim ligula. Morbi nec mauris nt.' },
	{ title: 'Card 6', text: ', nec pellentesque velit consectetur. Mauris dignissim venenaa.' },
	{ title: 'Card 7', text: ' justo id auctor. In fermentum orci eget dolor dictum tristique.' },
	{ title: 'Card 8', text: ' id mi magna. Curabitur dignissim dolor egel, lobortis lectus.' },
	{ title: 'Card 9', text: ' n facilisis mauris enim vitae tortor.' },
	{ title: 'Card 10', text: 'Nulla consectetur urna et lectus pulvinar, nec hendrerit es mauris eleifend a.' }
];

// Ur card conponent that u wanna map

const Card: FC<BoxProps> = styled(Box as FC<BoxProps>)
(() => ({
	backgroundColor: '#fff',
	minWidth: '500px',
	width: '500px',
	height: '500px',
	border: '1px solid',
}));

// Use CommonCarousell component to wrap the card u wanna map
// Best for desktop view, ned implementation for mobile in the furture

const Animations: FC = (): JSX.Element => (
	<>
		{/* The component require the height of card, width and number of elements to work properly */}
		<CommonCarousell shadowHeight={500} cardWidth={500} length={cards?.length}>
			{cards.map(({ title, text }, _i) => (
				<Card key={`test-${title}-${text}-${uuid()}`} >
					<h3 className="card__title">{title}</h3>
					<p className="card__text">{text}</p>
				</Card>
			))}
		</CommonCarousell>
	</>
);

export default Animations;