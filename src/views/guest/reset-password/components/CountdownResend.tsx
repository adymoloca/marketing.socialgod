import { Typography, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';
import { AuthContext } from 'utils/context/auth';

interface IProps {
	email: string;
}
const CountdownTimer: React.FC<IProps> = (props) => {
	const { email } = props;
	const [countdown, setCountdown] = useState<number>(10);
	const [displayText, setDisplayText] = useState<boolean>(true);

	const { recovery } = useContext(AuthContext);

	const theme = useTheme();

	const handleClick = ():void => {
		setDisplayText(false);
		setCountdown(30);

		const timer = setInterval(() => {
			setCountdown((prevCount) => prevCount - 1);
		}, 1000);

		setTimeout(() => {
			clearInterval(timer);
			setDisplayText(true);
		}, 30000);
	};

	const handleResend = ():void => {
		handleClick();
		recovery(email);
	};

	return (
		<div>
			{/* 
            <button onClick={handleClick}>Click Me</button>
            <Typography variant="h6">{displayText}</Typography> */}
			{displayText ? (
				<Typography
					sx={{
						fontSize: '14px',
						textDecoration: 'underline',
						color: `${theme.palette.primary.main}`,
						cursor: 'pointer',
					}}
					onClick={():void => handleResend()}
				>
					Resend recovery code!
				</Typography>
			) : (
				<Typography sx={{ fontSize: '16px', color: `${theme.palette.primary.main}` }}>{countdown}</Typography>
			)}
		</div>
	);
};

export default CountdownTimer;
