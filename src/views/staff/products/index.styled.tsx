import { Box, Card, TextField as MuiTextField, TextFieldProps, styled } from '@mui/material';
import { FC } from 'react';

type CustomTextFieldProps = Omit<TextFieldProps, 'margin' | 'required' | 'size' | 'fullWidth'>;

const TextField: FC<CustomTextFieldProps> = (props) => (
	<MuiTextField margin='dense' required size='small' fullWidth {...props} />
);

const FormBox = styled(Box)({
	margin: '5px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});

const FormContainer = styled(Card)({
	width: '300px',
});

export { FormBox, FormContainer, TextField };
