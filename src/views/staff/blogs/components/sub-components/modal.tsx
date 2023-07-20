/* eslint-disable jsx-a11y/label-has-associated-control */
/* Imports go  here */
import { Box, Button, Icon, IconButton, Input, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import MediaModal from 'components/common/media-modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { uuid } from 'utils/functions';
import { ModalContent, StyledTextarea } from '../../add-blogs/index.styled';
import { IBlogComponent } from '../../add-blogs/index.interfaces';
import { handleFlexAlign } from '../../functions';

interface IProps {
	open: boolean;
	handleClose: VoidFunction;
	blog: IBlogComponent[];
	currentIndex: number;
	handleInputChange: (value: string, type: string) => void;
	handleDelete: (index: number) => void;
}

const BlogAddModal: React.FC<IProps> = (props): JSX.Element => {
	const { open, handleClose, blog, currentIndex, handleInputChange, handleDelete } = props;
	const [currentElement, setCurrentElement] = useState<IBlogComponent>(blog[currentIndex]);
	const [refeshElement, setRefreshElement] = useState<boolean>(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { type, content, link, deletable, ...styling } = currentElement;

	const handleChange = (value: string, typeParsed: string, autoClose?: boolean): void => {
		handleInputChange(value, typeParsed);
		setRefreshElement((prev) => !prev);
		autoClose && handleClose();
	};

	useEffect(() => {
		setCurrentElement(blog[currentIndex]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentIndex, refeshElement]);

	return 'image' in currentElement ? (
		<MediaModal open={open} handleClose={handleClose} handleImageClick={handleChange} />
	) : (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'>
			<ModalContent gap={2}>
				{blog.length && (
					<StyledTextarea
						maxLength={1000}
						value={currentElement.content}
						onChange={(e): void => handleChange(e.target.value, 'content')}
						autoFocus
						minRows={7}
						maxRows={10}
						style={{
							...styling,
							fontSize: `${styling.fontSize}px`,
							justifyContent: handleFlexAlign(styling.textAlign),
						}}
					/>
				)}
				<Box display='flex' flexDirection='column' alignItems='center'>
					<Box display='flex' alignItems='center' gap={4}>
						{currentElement.type !== 'Image' && (
							<Box display='flex'>
								<input
									type='color'
									style={{ width: '50px', border: 0 }}
									value={currentElement.color}
									onChange={(e): void => handleChange(e.target.value, 'color')}
								/>
							</Box>
						)}
						{'fontSize' in currentElement && (
							<Box>
								<label htmlFor='font-size-input' style={{ fontSize: 15 }}>
									Font Size
								</label>
								<Input
									type='number'
									id='font-size-input'
									value={currentElement.fontSize}
									onChange={(e): void => handleChange(e.target.value, 'fontSize')}
								/>
							</Box>
						)}
						{'link' in currentElement && (
							<Box>
								<label htmlFor='link-input' style={{ fontSize: 15 }}>
									Link to
								</label>
								<Input
									id='link-input'
									value={currentElement.link}
									onChange={(e): void => handleChange(e.target.value, 'link')}
								/>
							</Box>
						)}
						<Box display='flex' justifyContent='space-around' width='100%'>
							{['left', 'center', 'right'].map((item: string) => (
								<IconButton onClick={(): void => handleChange(item, 'textAlign')} key={`${uuid()}`}>
									<Icon fontSize='large'>{`format_align_${item}`}</Icon>
								</IconButton>
							))}
						</Box>
						<IconButton
							disabled={!deletable}
							onClick={(): void => {
								handleDelete(currentIndex);
								handleClose();
							}}>
							<DeleteIcon />
						</IconButton>
					</Box>
					<Button  onClick={handleClose}>
						Save
					</Button>
				</Box>
			</ModalContent>
		</Modal>
	);
};

export default BlogAddModal;
