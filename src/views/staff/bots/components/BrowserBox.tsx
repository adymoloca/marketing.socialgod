import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';
import { capitalize } from 'utils/functions';
import { Bot } from '../active-bots';
import ResizableBox from './ResizebleBox';

interface DraggableBoxProps {
	botData: Bot;
	onClick: () => void;
	index: number;
	isSelected: boolean;
	removeBot: () => void;
	zIndex?: number;
}

const BrowserBox: React.FC<DraggableBoxProps> = (props) => {
	const { onClick, zIndex, index, isSelected, botData, removeBot } = props;
	// const { isDrawerOpen } = useAppSelector(state => state.utils);

	const nodeDraggabbleRef = useRef<HTMLDivElement | null>(null);

	const theme = useTheme();

	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;

	const handleDrag = (e: any): void => {
		// Prevent dragging if the drag starts from inside the resizable box
		onClick();
		const draggableBox = document.getElementById('draggable-box');
		const { target } = e;

		if (draggableBox && target !== draggableBox) {
			e.stopPropagation();
		}
	};

	return (
		<Draggable
			nodeRef={nodeDraggabbleRef}
			bounds={{
				top: -screenHeight + 170,
				right: screenWidth,
				left: -(index > 4 ? (index - 5) * 310 : index * 310),
				bottom: screenHeight * 2,
			}}
			handle='.drag-handle'
			onDrag={handleDrag}>
			<Box
				ref={nodeDraggabbleRef}
				id='draggable-box'
				sx={{
					borderTopRightRadius: '14px',
					borderTopLeftRadius: '14px',
					position: 'absolute',
					top: `${screenHeight / 2 + 250 + (index > 4 ? 350 : 0)}px`,
					left: `${index > 4 ? (index - 5) * 310 : index * 310}px`,
					width: 'auto',
					height: 'max-content',
					background: 'white',
					zIndex,
				}}
				onClick={onClick}>
				<Box
					className='drag-handle'
					sx={{
						borderTopRightRadius: '14px',
						borderTopLeftRadius: '14px',
						border: '1px solid #000',
						borderBottom: 'none',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						px: '8px',
						background: isSelected ? `${theme?.palette?.primary?.main}` : '#969696',
						cursor: 'move',
					}}>
					<Typography sx={{ color: '#fff', fontWeight: 600 }}>{botData.name}</Typography>
					<IconButton onClick={removeBot}>
						<Close sx={{ color: '#fff' }} />
					</IconButton>
				</Box>
				<ResizableBox>
					<Typography sx={{ px: '10px' }}>{capitalize(botData.role)}</Typography>
				</ResizableBox>
			</Box>
		</Draggable>
	);
};

BrowserBox.defaultProps = {
	zIndex: 0,
};

export default BrowserBox;
