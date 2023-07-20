import { ArrowBack } from '@mui/icons-material';
import { IconButton, Typography, capitalize } from '@mui/material';
import { Flex } from 'components/common';
import { FC } from 'react';
import { To, useNavigate } from 'react-router';

interface BackButtonProps {
	to?: To;
	handler?: () => void;
	title?: string;
}

const BackButton: FC<BackButtonProps> = ({ to = -1, title = '', handler }) => {
	const navigate = useNavigate();

	return (
		<Flex gap={1}>
			<IconButton onClick={handler || ((): void => navigate(to as To))}>
				<ArrowBack />
			</IconButton>
			<Typography variant='h5'>{capitalize(title)}</Typography>
		</Flex>
	);
};

BackButton.defaultProps = {
	handler: (): void => {},
	title: '',
	to: '',
};

export default BackButton;
