import { Box } from '@mui/material';
import { uuid } from 'utils/functions';
import useMedia, { MediaItem } from 'hooks/fetch-hooks/use-media';
import { ImageContainer } from 'views/staff/media/index.styled';

interface MediaSectionProps {
	handleImageClick: (v: string, t: string, p: boolean) => void;
}

const MediaSection: React.FC<MediaSectionProps> = ({ handleImageClick }): JSX.Element => {
	const { data: media } = useMedia();

	return (
		<Box display='flex' flexWrap='wrap' gap={5} mt={2}>
			{Array.isArray(media) &&
				media?.map(
					(item: MediaItem): JSX.Element => (
						<ImageContainer key={uuid()} onClick={(): void => handleImageClick(item.url, 'content', true)}>
							<Box component='img' src={item.url} width='100%' height='100%' />
						</ImageContainer>
					)
				)}
		</Box>
	);
};

export default MediaSection;
