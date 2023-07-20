import { useParams } from 'react-router';
import { FC, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
	children: React.ReactNode;
	index: number;
	value: number;
}

export interface ITab {
	id: number;
	title: string;
	botNumber?: string;
}

const TabPanel: FC<TabPanelProps> = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
};

const handleBotPrimaryDetails = (id: string | undefined): JSX.Element => <p>{id}</p>;

const PostSchelduler: FC = () => {
	const [value, setValue] = useState(0);
	const { id } = useParams();

	const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
		setValue(newValue);
	};

	const tabs: ITab[] = [
		{
			id: 1,
			title: 'Dashboard',
			botNumber: '1',
		},
		{
			id: 2,
			title: 'Scheldule Posts',
			botNumber: '2',
		},
		{
			id: 3,
			title: 'Subreddit Manager',
			botNumber: '3',
		},
		{
			id: 4,
			title: 'Analytics',
			botNumber: '4',
		},
		{
			id: 5,
			title: 'Analyse',
			botNumber: '5',
		},
		{
			id: 6,
			title: 'Inbox',
			botNumber: '6',
		},
		{
			id: 7,
			title: 'Content Library',
			botNumber: '7',
		},
		{
			id: 8,
			title: 'Settings',
			botNumber: '8',
		},
	];

	return (
		<div>
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={value}
						onChange={handleChange}
						variant='scrollable'
						scrollButtons='auto'
						aria-label='scrollable auto tabs example'>
						{tabs?.map((el: ITab) => (
							<Tab key={el?.id} label={el?.title} />
						))}
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					{handleBotPrimaryDetails(id)}
				</TabPanel>
				<TabPanel value={value} index={1}>
					Item Two
				</TabPanel>
				<TabPanel value={value} index={2}>
					Item Three
				</TabPanel>
				<TabPanel value={value} index={3}>
					Item Four
				</TabPanel>
				<TabPanel value={value} index={4}>
					Item Five
				</TabPanel>
				<TabPanel value={value} index={5}>
					Item Six
				</TabPanel>
				<TabPanel value={value} index={6}>
					Item Seven
				</TabPanel>
				<TabPanel value={value} index={7}>
					Item Eight
				</TabPanel>
			</Box>
		</div>
	);
};

export default PostSchelduler;
