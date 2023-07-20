import styled from '@emotion/styled';
import { Theme, Button as MuiButton } from '@mui/material';

export const ButtonStyled = styled(MuiButton)
(({ theme, shadow, hover }: { theme: Theme; shadow: boolean | undefined, hover: boolean }) => ({
	maxWidth: theme.spacing(40),
	maxHeight: theme.spacing(40),
	minHeight: theme.spacing(4),
	minWidth: theme.spacing(20),
	margin: theme.spacing(2),
	textTransform: 'none',
	overflow: 'auto',
	boxSizing: 'border-box',
	boxShadow: shadow ? `${theme.shadows[9]}` : `${theme.shadows[0]}`,
	transition: 'transform 0.3s ease',
	borderRadius: theme.shape.borderRadius,
	':hover':( hover ? {
		boxShadow: shadow ? `${theme.shadows[9]}` : `${theme.shadows[0]}`,
		transform: `scale(${hover ? 0.95 : 1})`,
		backgroundColor: theme.palette.primary.main
	} : {
		boxShadow: shadow ? `${theme.shadows[9]}` : `${theme.shadows[0]}`,
	})
}));
