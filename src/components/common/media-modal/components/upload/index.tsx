import Upload from 'components/common/upload';
import useMedia from 'hooks/fetch-hooks/use-media';
import { Dispatch, SetStateAction } from 'react';
import { Typography } from '@mui/material';
import { UploadWrapper } from '../../index.styled';

interface UploadSectionsProps {
	setPage: Dispatch<SetStateAction<'upload' | 'media'>>;
}

const UploadSection: React.FC<UploadSectionsProps> = ({ setPage }): JSX.Element => {
	const { addMedia } = useMedia();

	const handleUpload = (media: File): void => {
		addMedia(media);
		setPage('media');
	};

	return (
		<UploadWrapper>
			<Typography variant='h5' width={200} textAlign='center'>
				Tap the button below to add an image file to your media folder
			</Typography>
			<Upload onChange={(stream): void => handleUpload(stream as File)} label='Update your image here' />
		</UploadWrapper>
	);
};

export default UploadSection;
