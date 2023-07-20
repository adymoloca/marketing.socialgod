import { TextField, TextFieldProps, Theme, styled } from '@mui/material';
import { ChangeEvent, FC } from 'react';
import { Width } from 'utils/types/style';

interface InputPropsSG extends Omit<TextFieldProps<'outlined'>, 'variant'> {
	// eslint-disable-next-line react/require-default-props
	width?: Width;
	// eslint-disable-next-line react/require-default-props
	onTextChange?: (value: string, name?: string) => void;
}

const StyledInputSG = styled(TextField, {
	shouldForwardProp: (prop) => prop !== 'width',
})(({ width, theme }: { theme: Theme; width?: Width }) => ({
	width: width || theme.spacing(30),
}));

/**
 *
 * @param onTextChange alternative to onChange, it passes the (value, name) - optional
 * @param width is used for the width of the card - optional
 * By default is 240px
 * @exampleStart
 * <InputSG label='example' value={example} onTextChange={(value, name) => setExample(value)} />
 *
 * @exampleEnd
 * @returns a JSX.Element that represent the Card component - reusable component
 */

const handleTextChange = (
	e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	name: InputPropsSG['name'],
	onTextChange: InputPropsSG['onTextChange'],
	onChange: InputPropsSG['onChange']
): void => {
	if (typeof onTextChange !== 'undefined') onTextChange(e.target.value, name);
	else if (typeof onChange !== 'undefined') onChange(e);
};

const InputSG: FC<InputPropsSG> = ({ onTextChange, onChange, ...props }) => (
	<StyledInputSG onChange={(e): void => handleTextChange(e, props.name, onTextChange, onChange)} {...props} />
);

export default InputSG;
