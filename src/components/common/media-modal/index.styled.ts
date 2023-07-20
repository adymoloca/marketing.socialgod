import { Box, BoxProps, styled } from '@mui/material';
import { FC } from 'react';

const MediaModalWrapper: FC<BoxProps> = styled(Box)(({ theme }) => ({
	width: '90%',
	height: '90%',
	backgroundColor: theme.palette.background.paper,
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	padding: '25px',
	overflow: 'auto',
}));

const UploadWrapper: FC<BoxProps> = styled(Box)(() => ({
	width: '100%',
	height: '95%',
	border: '10px dashed #808080',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
}));

export { MediaModalWrapper, UploadWrapper };
