import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { IButtonSG } from './index.interfaces';
import { ButtonStyled } from './index.styled';

const ButtonSG: FC<IButtonSG> = ({ children, shadow, hover, width, ...other }) => {
	const theme = useTheme();
	/**
 *
 * @param children is used for the children of the button - optional
 * @param shadow is used for the shadows of the button - optional
 * @param hover is used for the hover animation of the button - optional
 * @param width is used for the width of the button - optional
 * @exampleStart
	<Button
		shadow //optional
		hover //optional
		width={100} //optional
		name='Button'
		sx={{ mt: 2, width: '200px' }}
	>
	Click // children
	</Button>
 * @exampleEnd
 * @returns a JSX.Element that represent the Button component - reusable component
 */
	return (
		<ButtonStyled style={{width: `${width}px`}} theme={theme} shadow={shadow} hover={!!hover} {...other}>
			{children}
		</ButtonStyled>
	);
};

ButtonSG.defaultProps = {
	children: 'Click',
};
export default ButtonSG;
