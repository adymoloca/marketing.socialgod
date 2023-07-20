import { Box } from '@mui/material';
import React, { useState } from 'react';

interface ResizableBoxProps {
	children: React.ReactNode;
}

const ResizableBox: React.FC<ResizableBoxProps> = ({ children }) => {
	const [width, setWidth] = useState<number>(300);
	const [height, setHeight] = useState<number>(300);

	const handleMouseMove = (e: MouseEvent): void => {
		e.stopPropagation();
		setWidth(e.clientX);
		setHeight(e.clientY);
	};

	const handleMouseUp = (): void => {
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
		e.preventDefault();
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	return (
		<Box
			sx={{
				width: `${width}px`,
				height: `${height}px`,
				minWidth: '200px',
				border: '1px solid black',
				resize: 'both',
				overflow: 'auto',
				position: 'relative',
			}}>
			{children}
			<Box onMouseDown={handleMouseDown} />
		</Box>
	);
};

export default ResizableBox;
