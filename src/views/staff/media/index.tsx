import { Box } from '@mui/material';
import useMedia, { MediaItem } from 'hooks/fetch-hooks/use-media';
import { Upload } from 'components/common';
import { ImageContainer } from './index.styled';

const Media: React.FC = (): JSX.Element => {
	const { data: media, addMedia } = useMedia();
	const handleAddMedia = (file: File): void => {
		addMedia(file);
	};
	return (
		<Box>
			<Upload label='Upload your media here' onChange={(stream): void => handleAddMedia(stream as File)} />
			<Box display='flex' flexWrap='wrap' gap={5} mt={2}>
				{Array.isArray(media) &&
					media?.map(
						(item: MediaItem): JSX.Element => (
							<ImageContainer key={`${item.url}-media`}>
								<Box component='img' src={item.url} width='100%' height='100%' />
							</ImageContainer>
						)
					)}
			</Box>
		</Box>
	);
};
export default Media;
