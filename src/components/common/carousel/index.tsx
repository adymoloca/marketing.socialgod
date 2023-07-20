import React, { FC, useState } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, BoxProps, Button, styled } from '@mui/material';

const Wrapper: FC<BoxProps> = styled(Box as FC<BoxProps>)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	minHeight: '400px',
	height: 'auto',
	width: '100%',
	margin: '18px 0',
}));

const Carousel: FC<BoxProps> = styled(Box as FC<BoxProps>)(() => ({
	position: 'relative',
	width: '100%',
	maxWidth: 1200,
	display: 'flex',
	overflow: 'hidden',
	scrollBehavior: 'smooth',
	gap: '30px',
	padding: '12px 0',
	// boxShadow: '0px 9px 7px 0px rgba(105,105,105,.4)',
}));
interface IBlurBox extends BoxProps {
	side: 'right' | 'left';
	shadowHeight: number;
}

const BluredBox: FC<IBlurBox> = styled(Box as FC<IBlurBox>, {
	shouldForwardProp: (prop: string) => prop !== 'side' && prop !== 'shadowHeight',
})(({ side, shadowHeight }) => ({
	height: `${shadowHeight}px`,
	width: '100px',
	backgroundImage:
		side === 'left'
			? `linear-gradient(
                90deg,
                hsl(0deg 0% 100%) 0%,
                hsl(0deg 0% 98%) 56%,
                hsl(0deg 0% 96%) 100%
            )`
			: `linear-gradient(
                270deg,
                hsl(0deg 0% 100%) 0%,
                hsl(0deg 0% 98%) 56%,
                hsl(0deg 0% 96%) 100%
            )`,
	display: 'flex',
	alignItems: 'center',
	justifyContent: side,
}));

interface IDrag {
	isDragged: boolean;
	prevPageX: number;
	prevScrollLeft: number;
}

interface IProps {
	cardWidth: number;
	children: React.ReactNode;
	length: number;
	shadowHeight: number;
}

const CommonCarousell: FC<IProps> = (props: IProps) => {
	const { cardWidth, children, length, shadowHeight } = props;
	const carousel = document.querySelector('.carousel');
	const [isDragged, setIsDragged] = useState<IDrag>({ isDragged: false, prevPageX: 0, prevScrollLeft: 0 });

	const handleDragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		const dragObject: IDrag = {
			isDragged: true,
			prevPageX: e.pageX,
			prevScrollLeft: carousel?.scrollLeft ? carousel.scrollLeft : 0,
		};
		setIsDragged(dragObject);
	};

	const handleDragStop = (): void => setIsDragged((prev) => ({ ...prev, isDragged: false }));

	const handleNext = (action: 'prev' | 'next'): void => {
		if (carousel) {
			if (action === 'next') {
				carousel.scrollLeft = isDragged?.prevScrollLeft || 0 + (cardWidth + 30);
				setIsDragged((prev) => ({ ...prev, prevScrollLeft: (prev?.prevScrollLeft || 0) + (cardWidth + 30) }));
				console.log('next value', isDragged?.prevScrollLeft);
			} else if (action === 'prev') {
				carousel.scrollLeft = (isDragged?.prevScrollLeft || 0) - (cardWidth + 30);
				setIsDragged((prev) => ({ ...prev, prevScrollLeft: (prev?.prevScrollLeft || 0) - (cardWidth + 30) }));
				console.log('prev value', isDragged?.prevScrollLeft);
			}
		}
	};
	return (
		<Wrapper>
			<BluredBox shadowHeight={shadowHeight} side='left'>
				<Button
					disabled={isDragged?.prevScrollLeft === 0}
					sx={{ zIndex: 1 }}
					onClick={(): void => handleNext('prev')}>
					<ArrowBack />
				</Button>
			</BluredBox>
			<Carousel
				className='carousel'
				onMouseOut={(): void => handleDragStop()}
				onMouseDown={(e): void => handleDragStart(e)}
				onMouseUp={(): void => handleDragStop()}>
				{children}
			</Carousel>
			<BluredBox shadowHeight={shadowHeight} side='right'>
				<Button
					disabled={isDragged?.prevScrollLeft > length * (cardWidth + 30) - 1250}
					sx={{ zIndex: 1 }}
					onClick={(): void => handleNext('next')}>
					<ArrowForward />
				</Button>
			</BluredBox>
		</Wrapper>
	);
};

export default CommonCarousell;
