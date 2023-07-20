import { Box, BoxProps, styled } from '@mui/material';
import { FC } from 'react';

const ImageContainer: FC<BoxProps> = styled(Box)(({ theme }) => ({
	width: '200px',
	height: '200px',
	border: `1px solid ${theme.palette.primary.main}`,
}));

export { ImageContainer };
