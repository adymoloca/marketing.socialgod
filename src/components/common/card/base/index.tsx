import React, { ReactNode } from 'react';
import { Card, styled, CardProps, Theme, useTheme } from '@mui/material';
import { Width } from 'utils/types/style';

export interface CardPropsSG extends CardProps {
	// eslint-disable-next-line react/require-default-props
	width?: Width;
	// eslint-disable-next-line react/require-default-props
	height?: Width;
	children: ReactNode;
	hover?: boolean;
}

const StyledCard = styled(Card, {
	shouldForwardProp: (prop) => !['width', 'height', 'resizable', 'hover'].includes(prop as string),
})(({ theme, hover }: { theme: Theme, hover: boolean }) => ({
	width: theme.spacing(50),
	margin: theme.spacing(5),
	height: theme.spacing(32),
	maxWidth: theme.spacing(100),
	maxHeight: theme.spacing(100),
	minHeight: theme.spacing(16),
	minWidth: theme.spacing(16),
	background: `${theme.palette.background.paper}`,
	boxShadow: `${theme.shadows[9]}`,
	overflow: 'auto',
	boxSizing: 'border-box',
	padding: theme.spacing(3),
	':hover': {
		boxShadow: `${theme.shadows[hover ? 20 : 9]}`,
	}
}));

/**
 *
 * @param width is used for the width of the card - optional
 * @param height is used for the height of the card - optional
 * @exampleStart
 * <Card width={500} height={300}>
 * 	<div>
 * 		<h1>Here is the title</h1>
 * 		<p>Here is the description</p>
 * 	</div>
 * </Card>
 * @exampleEnd
 * @returns a JSX.Element that represent the Card component - reusable component
 */

const CardSG: React.FC<CardPropsSG> = ({
	width,
	height,
	children,
	hover
}) => {
	const theme = useTheme();

	return (
		<StyledCard
			style={{
				width, 
				height
			}}
			theme={theme}
			hover={!!hover}
		>
			{children}
		</StyledCard>
	);
};

CardSG.defaultProps = {
	width: 400,
	height: 256,
	hover: false
};

export default CardSG;