import { Box, BoxProps } from '@mui/material';
import { HTMLProps, Ref } from 'react';

interface ImageProps extends HTMLProps<HTMLImageElement> {
	loading?: 'lazy' | 'eager';
}

const Image: React.FC<ImageProps> = ({ src, style, loading, ref, ...others }): JSX.Element => {
	const boxProps: BoxProps = { ...others, style };
	return <Box component='img' src={src} loading={loading} ref={ref as Ref<HTMLImageElement>} {...boxProps} />;
};

export default Image;
