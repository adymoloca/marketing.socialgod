import { styled, Box, BoxProps } from '@mui/material';
import { FC } from 'react';

const extendedProps = ['column', 'justifyCenter', 'justifyEnd', 'alignStart'];

interface FlexProps extends Omit<BoxProps, 'display'> {
	column?: boolean;
	justifyCenter?: boolean;
	justifyEnd?: boolean;
	alignStart?: boolean;
}

const Flex: FC<FlexProps> = styled(Box as FC<FlexProps>, {
	shouldForwardProp: (prop: string) => !extendedProps.includes(prop),
})(({ column = false, justifyCenter = false, justifyEnd = false, alignStart = false }) => ({
	display: 'flex',
	flexWrap: 'wrap',
	flexDirection: column ? 'column' : 'row',
	justifyContent: justifyCenter ? 'center' : (justifyEnd && 'flex-end') || 'flex-start',
	alignItems: alignStart ? 'flex-start' : 'center',
}));

export default Flex;
