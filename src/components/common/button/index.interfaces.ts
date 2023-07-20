import { ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

export interface IButtonSG extends ButtonProps {
	children?: string | ReactNode;
	shadow?: boolean;
	hover?: boolean;
	width?: number
}