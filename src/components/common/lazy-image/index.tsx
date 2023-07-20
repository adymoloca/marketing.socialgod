import { useIntersection } from 'hooks/use-intersection';
import { FC, HTMLProps, useCallback, useId, useRef, useState } from 'react';
import DummyImage from 'assets/images/dummy-image-sbd.webp';
import { Box } from '@mui/material';
import Image from '../image';

const LazyImage: FC<HTMLProps<HTMLImageElement>> = ({ name, src }) => {
	const id = useId();
	const [url, setUrl] = useState<string>('');
	const imgRef = useRef<HTMLImageElement | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	const useUrl = useCallback(() => imgRef.current?.src !== src && src && setUrl(src), [src]);

	useIntersection(imgRef, useUrl, []);

	return (
		<Box ref={imgRef}>
			<Image alt={name} id={`lazy-img-${id}`} src={url} loading='lazy' onLoad={(): void => setIsLoaded(true)} />
			<Image
				alt={`${name} thumb`}
				id={`lazy-img-${id}`}
				src={DummyImage}
				style={{ display: isLoaded ? 'none' : 'block' }}
			/>
		</Box>
	);
};

export default LazyImage;
