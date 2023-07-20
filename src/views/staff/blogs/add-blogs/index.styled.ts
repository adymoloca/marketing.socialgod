import { Box, BoxProps, TextareaAutosize, styled } from '@mui/material';
import { FC } from 'react';

const EditableText: FC<BoxProps> = styled(Box)(() => ({
	cursor: 'pointer',
	':hover': {
		backgroundColor: '#808080',
	},
	width: '100%',
}));

const ModalContent: FC<BoxProps> = styled(Box)(({ theme }) => ({
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	backgroundColor: theme.palette.background.paper,
	border: `2px solid ${theme.palette.primary.main}`,
	boxShadow: '24px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-around',
	alignItems: 'center',
	borderRadius: '20px',
	padding: '20px',
	width: '60%',
	height: '60%',
}));

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
	width: '600px',
	fontWeight: 400,
	lineHeight: 1.5,
	padding: '12px',
	borderRadius: '12px',
	background: `${theme.palette.background.paper}`,
	border: `1px solid ${theme.palette.primary.main}`,
	boxShadow: `0px 2px 2px ${theme.palette.common.black}`,
	resize: 'none',
	overflow: 'auto',

	'&:hover': {
		borderColor: `${theme.palette.primary.main}`,
	},

	' &:focus': {
		borderColor: `${theme.palette.primary.main}`,
		boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,
	},
}));

const AddBlogWrapper: FC<BoxProps> = styled(Box)(() => ({
	width: '80%',
	display: 'flex',
	justifyContent: 'space-around',
	alignItems: 'center',
}));

const EditContainerWrapper: FC<BoxProps> = styled(Box)(() => ({
	width: '90%',
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	gap: '20px',
	alignItems: 'center',
}));

export { EditableText, ModalContent, StyledTextarea, AddBlogWrapper, EditContainerWrapper };
