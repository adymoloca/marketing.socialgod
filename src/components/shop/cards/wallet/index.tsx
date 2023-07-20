import { Box, BoxProps, Typography, styled } from '@mui/material';
import { Flex } from 'components/common';
import { FC, useContext } from 'react';
import { AuthContext } from 'utils/context/auth';

const Wrapper: FC<BoxProps> = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	maxWidth: '500px',
	borderRadius: 15,
	width: '100%',
	border: `1px solid ${theme.palette.divider}`,
	padding: '25px',
}));

const Wallet: FC<BoxProps> = () => {
	const { user } = useContext(AuthContext);

	return (
		<Wrapper>
			<Flex>
				<Typography fontSize={30}>You currently have</Typography>
			</Flex>
			<Flex justifyEnd flexGrow={2}>
				<Typography
					fontSize={50}
					color={(theme): string => theme.palette.primary.light}>{`${user.tokens}`}</Typography>
				<Typography fontSize={50} fontWeight={600} color={(theme): string => theme.palette.primary.main}>
					credits
				</Typography>
			</Flex>
		</Wrapper>
	);
};

export default Wallet;
