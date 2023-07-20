import React, { useState, useCallback, useMemo, Fragment, FC } from 'react';
import { Box, Card, CardHeader, CardContent, IconButton, Typography, Collapse, styled, CardProps } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { uuid } from 'utils/functions';
import Flex from '../wrapper/flex';

const StyledCard: FC<CardProps> = styled(Card)(({ theme }) => ({
	width: '800px',
	maxWidth: '100%',
	margin: '10px',
	cursor: 'pointer',
	border: `${theme.palette.primary.main} solid 1px`,
	'&:hover': {
		boxShadow: '10px 25px 10px -5px rgba(0, 0, 0, 0.2)',
	},
	'@media (max-width: 810px)': {
		width: '350px',
	},
}));

interface IProps {
	data: DataPropType;
}

export interface IData {
	title: string;
	length: number; // --> it refers to the
	data_arr: {
		length: number[];
		sub_title: string;
		content_arr: {
			key: string;
			length: number[][];
		}[];
	}[];
}

export type DataPropType = IData[];

const StaticContent: FC<IProps> = ({ data }) => {
	const { t: translate } = useTranslation();
	const { pathname } = useLocation();

	const [expanded, setExpanded] = useState<boolean[]>(Array(data.length).fill(false));

	const handleExpandClick = (index: number): void => {
		setExpanded((prevExpanded) => {
			const newExpanded = [...prevExpanded];
			newExpanded[index] = !newExpanded[index];
			return newExpanded;
		});
	};

	const isExpanded = (index: number): boolean => expanded[index];

	const baseTKey = useMemo(() => `${pathname.replaceAll('-', '_').replace('/', '')}.`, [pathname]);

	const t = useCallback(
		(key: string, index?: number, pres?: number[]) => {
			let constructed = '';
			if (pres !== undefined) for (const pre of pres) constructed = key.replace('arr_item', `${pre + 1}`);
			key.includes('_arr_item') && index !== undefined && (constructed = key.replace('arr_item', `${index + 1}`));
			return translate(baseTKey.concat(constructed));
		},
		[translate, baseTKey]
	);
	const tItem = data[0] as IData;

	return (
		<Flex justifyCenter column>
			{Array.from(Array(data[0].length).keys()).map((item, index) => (
				<StyledCard key={uuid()} onClick={(): void => handleExpandClick(index)}>
					<CardHeader
						title={t(data[0].title, index)}
						action={
							<IconButton aria-expanded={isExpanded(index)} aria-label='show more'>
								{isExpanded(index) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							</IconButton>
						}
					/>
					<Collapse in={isExpanded(index)} timeout='auto' unmountOnExit>
						<CardContent>
							{Array.from(Array(tItem.data_arr[0].length[index]).keys()).map((n, indexDataArr) => (
								<Fragment key={`title-${uuid()}`}>
									<Typography variant='h6' component='h3'>
										{t(tItem.data_arr[0].sub_title, indexDataArr, [index])}
									</Typography>
									{tItem.data_arr[0].content_arr && (
										<ul>
											{Array.from(
												Array(
													tItem.data_arr[0].content_arr[0].length[index][indexDataArr]
												).keys()
											).map((v, indexContentArr) => (
												<Box component='li' key={`item-${uuid()}`}>
													{t(tItem.data_arr[0].content_arr[0].key, indexContentArr, [
														index,
														indexDataArr,
													])}
												</Box>
											))}
										</ul>
									)}
								</Fragment>
							))}
						</CardContent>
					</Collapse>
				</StyledCard>
			))}
		</Flex>
	);
};

export default StaticContent;
