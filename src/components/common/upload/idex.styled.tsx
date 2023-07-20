import styled from '@emotion/styled';
import { FC, HTMLProps } from 'react';
import { Box, IconButton, BoxProps, styled as muiStyled, IconButtonProps } from '@mui/material';
import { CloseTwoTone } from '@mui/icons-material';

interface ExtendedBoxProps extends Omit<BoxProps, 'component' | 'src'> {
	file: string;
}

const CustomBox: FC<ExtendedBoxProps> = (props: ExtendedBoxProps) => {
	const { file, ...otherProps } = props;
	return <Box component='img' src={file} {...otherProps} />;
};
// eslint-disable-next-line jsx-a11y/label-has-associated-control
const CustomLabel: FC<HTMLProps<HTMLLabelElement>> = (props: HTMLProps<HTMLLabelElement>) => <label {...props} />;
const CustomRemoveButton: FC<IconButtonProps> = (props: IconButtonProps) => (
	<IconButton {...props}>
		<CloseTwoTone color='error' />
	</IconButton>
);

const ImageBox: FC<ExtendedBoxProps> = muiStyled(CustomBox as FC<ExtendedBoxProps>)({
	height: '80px',
	width: '80px',
	objectFit: 'cover',
	objectPosition: 'center',
});

const SimpleUploadLabel: FC<HTMLProps<HTMLLabelElement>> = styled(
	CustomLabel as unknown as FC<HTMLProps<HTMLLabelElement>>
)({
	height: '40px',
	minWidth: '80px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
	color: '#a0a0a0',
	border: 'dashed 1px #a0a0a0',
	borderRadius: '4px',
	'&:hover': {
		backgroundColor: '#f9f9f9',
	},
	transition: 'background-color 0.5s ease',
});

const FileName = muiStyled(Box)({
	height: '40px',
	width: '80px',
	textOverflow: 'ellipsis',
	textAlign: 'center',
	fontSize: '14px',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
});

const RemoveButton = muiStyled(CustomRemoveButton)(() => ({
	position: 'absolute',
	height: '10px',
	width: '10px',
	top: '3px',
	right: '3px',
	opacity: '50%',
	'&:hover': {
		opacity: '100%',
	},
	transition: 'opacity 0.5s ease',
}));

export { ImageBox, SimpleUploadLabel, FileName, RemoveButton };
