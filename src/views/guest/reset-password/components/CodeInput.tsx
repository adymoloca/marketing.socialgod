import React, {
	Dispatch,
	SetStateAction,
	useState,
	useRef,
	FC,
	useImperativeHandle,
	useEffect,
	forwardRef,
	useCallback,
} from 'react';
import { Grid, TextField, TextFieldProps, Typography, styled } from '@mui/material';
import { stateSetter } from 'utils/types/state';
import useConsoleLog from 'hooks/use-console-log';

interface ISingleProps {
	value: string;
	handleChange: (value: string, index: number) => void;
	index: number;
	disabled: boolean;
	handleFocus: Dispatch<SetStateAction<number>>;
}
export interface CodeInputRef {
	focus: () => void;
}

interface CodeInputProps {
	setActivationCode: any;
	onCodeEntered?: stateSetter<string>;
	codeProp: any;
}

const StyledTextField: FC<TextFieldProps> = styled(TextField as FC<TextFieldProps>, {
	shouldForwardProp: (prop: string) => prop !== 'value',
})(({ value }) => ({
	maxWidth: '60px',
	aspectRatio: '1/1 !important',
	fontSize: '40px',
	padding: 0,
	margin: 0,
	textAlign: 'center',
	display: 'flex',
	justifyContent: 'center',
	'& > label': {
		width: '100%',
		display: 'none ',
		left: 0,
		top: -10,
		color: '#696969',
		'&[data-shrink="false"]': {
			display: value !== '' ? 'none' : 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
			top: -10,
		},
	},
	'& > div > fieldset > legend > span': {
		display: 'none !important',
	},
	'& > div': {
		height: '100% !important',
	},
}));

const SingleInput = forwardRef((props: ISingleProps, ref: React.Ref<CodeInputRef> | null) => {
	const { value, handleChange, index, handleFocus, disabled } = props;

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		index === 0 && value === '' && handleFocus(0);
	}, [value, index, handleFocus]);

	useImperativeHandle(ref, () => ({
		focus: (): void => {
			if (inputRef.current) {
				inputRef.current.focus();
			}
		},
	}));

	return (
		<StyledTextField
			variant='outlined'
			label={
				<Typography fontSize='40px' sx={{ width: '100%' }}>
					{' '}
				</Typography>
			}
			autoComplete='off'
			value={value}
			type='text'
			inputRef={inputRef}
			disabled={disabled}
			onKeyDown={(e): boolean | void =>
				e.key === 'Backspace' && index !== 0 && !value && handleFocus((prev: number) => prev - 1)
			}
			onChange={(e): void => handleChange(e.target.value, index)}
			key={`code-single-input-index-${index}`}
			inputProps={{ maxLength: 1, style: { padding: 0, margin: 0, textAlign: 'center' } }}
		/>
	);
});

const emptyArray = ['1', '2', '3', '4', '5', '6'];

const CodeInput: FC<CodeInputProps> = ({ setActivationCode, onCodeEntered, codeProp }) => {
	const [focusOn, setFocusOn] = useState<number>(0);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (newValue: string, index: number): void => {
		const array = [...`${codeProp}`];
		array.splice(index, 1, newValue);
		onCodeEntered && onCodeEntered(array.join(''));
		index < 5 && newValue !== '' && setFocusOn((prev) => prev + 1);
	};

	const codeEntered = useCallback(() => {
		setActivationCode(codeProp);
	}, [codeProp, setActivationCode]);

	useEffect(() => {
		focusOn === 5 && codeProp.length === focusOn + 1 && codeEntered();
	}, [codeProp, focusOn, codeEntered]);

	useEffect(() => {
		inputRef.current && inputRef.current.focus();
		console.log(inputRef);
	}, [focusOn]);

	useConsoleLog(focusOn);

	return (
		<Grid
			container
			sx={{ justifyContent: 'space-between', columnGap: 1, marginY: 3, display: 'flex', flexWrap: 'nowrap' }}
		>
			{emptyArray.map((el: string, index: number) => (
				<SingleInput
					value={codeProp.split('')[index]}
					key={`codeProp-input-index-${el}`}
					ref={focusOn === index ? inputRef : null}
					handleFocus={setFocusOn}
					handleChange={handleChange}
					index={index}
					disabled={focusOn !== index}
				/>
			))}
		</Grid>
	);
};

CodeInput.defaultProps = {
	onCodeEntered: (): void => {},
};

export default CodeInput;
