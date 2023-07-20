import { FC } from 'react';
import { List, ListProps, styled } from '@mui/material';

const props: string[] = ['direction', 'duration'];

export interface ISliderList extends ListProps {
	direction: 'left' | 'right';
	duration: number;
}

export const SliderList: FC<ISliderList> = styled(List as FC<ISliderList>, {
	shouldForwardProp: (prop: string) => !props.includes(prop),
})(({direction, duration}: ISliderList ) => ({
	listStyle: 'none',
	width: '100%',
	display: 'flex',
	justifyContent: 'space-around',
	'@keyframes slideLeft': {
		'100%': {
			transform: 'translateX(calc(-100%/2))',
		},
	},
	'@keyframes slideRight': {
		'100%': {
			transform: 'translateX(calc(100%/2))',
		},
	},
	animation: `${direction === 'left' ? 'slideLeft' : 'slideRight'} ${duration}s linear infinite`,
	':hover': {
		animationPlayState: 'paused',
	},
}));
