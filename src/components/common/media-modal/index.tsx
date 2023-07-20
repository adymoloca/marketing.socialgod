import { Box, Button, Modal } from '@mui/material';
import { useState } from 'react';
import { MediaModalWrapper } from './index.styled';
import MediaSection from './components/media';
import UploadSection from './components/upload';

interface MediaModalProps {
	open: boolean;
	handleClose: VoidFunction;
	handleImageClick: (value: string, type: string, autoClose?: boolean) => void;
}

const MediaModal: React.FC<MediaModalProps> = ({ open, handleClose, handleImageClick }): JSX.Element => {
	const [page, setPage] = useState<'upload' | 'media'>('media');

	return (
		<Modal open={open} onClose={handleClose}>
			<MediaModalWrapper>
				<Box>
					<Button onClick={(): void => setPage('upload')}>Upload</Button>
					<Button onClick={(): void => setPage('media')}>Media</Button>
				</Box>
				{page === 'media' ? (
					<MediaSection handleImageClick={handleImageClick} />
				) : (
					<UploadSection setPage={setPage} />
				)}
			</MediaModalWrapper>
		</Modal>
	);
};

export default MediaModal;
