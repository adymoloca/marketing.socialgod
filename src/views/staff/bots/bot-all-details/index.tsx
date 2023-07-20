import { useNavigate, useParams } from 'react-router';
import { useState, useEffect, Fragment, FC } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ChartData } from 'chart.js';
import { faker } from '@faker-js/faker';
import { getTimesArray } from 'utils/functions';
import { useTheme } from '@mui/material';
import { IBot, bots } from '../all-bots';
import TabsContent from './tabs-content';

interface TabPanelProps {
	children: React.ReactNode;
	index: number;
	value: number;
}

export interface ITab {
	id: string;
	title: string;
	botNumber?: string;
	chartData: ChartData<'bar', number[], unknown>;
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

const BotAllDetails: FC = () => {
	const [value, setValue] = useState(0);
	const { id } = useParams();
	const navigate = useNavigate();
	const [selectedBot, setSelectedBot] = useState<IBot>();
	const theme = useTheme();

	const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
		setValue(newValue);
	};

	const goBack = (): void => {
		navigate('/staff/all-bots');
	};

	const labels = getTimesArray();

	const tabs: ITab[] = [
		{
			id: '1',
			title: 'reddit',
			botNumber: '1',
			chartData: {
				labels,
				datasets: [
					{
						label: 'Time Active in hours',
						data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
						backgroundColor: '#0044ff',
						barThickness: 3,
					},
					{
						label: 'Money in $',
						data: labels.map(() => faker.number.float({ min: 0, max: 1000 })),
						backgroundColor: theme.palette.primary.light,
						barThickness: 3,
					},
				],
			},
		},
		{
			id: '2',
			title: 'google',
			botNumber: '2',
			chartData: {
				labels,
				datasets: [
					// {
					// 	label: 'Time Active in hours',
					// 	data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
					// 	backgroundColor: '#0044ff',
					// 	barThickness: 10,
					// },
					{
						label: 'Money in $',
						data: labels.map(() => faker.number.float({ min: 0, max: 1000 })),
						backgroundColor: theme.palette.primary.light,
						barThickness: 15,
					},
				],
			},
		},
	];

	useEffect(() => {
		const myBot = bots.find((element) => element.id === id);
		setSelectedBot(myBot);
	}, [id]);

	return (
		<div>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}>
				<Box onClick={goBack} sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}>
					<ArrowBackIcon sx={{ marginRight: 1, fontSize: 30 }} />
					<Typography sx={{ fontSize: 22, fontWeight: 700 }}>Go Back</Typography>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<h1>SmartBot: {selectedBot?.name}</h1>
					<Box
						sx={{
							height: 15,
							width: 15,
							borderRadius: 50,
							backgroundColor: `${selectedBot?.botStatus ? '#00FF5A' : '#ccc'}`,
							marginLeft: 2,
						}}
					/>
				</Box>
			</Box>
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={value}
						onChange={handleChange}
						variant='scrollable'
						scrollButtons='auto'
						aria-label='scrollable auto tabs example'>
						{tabs?.map((el: ITab) => (
							<Tab disableRipple key={el?.id} label={el?.title} />
						))}
					</Tabs>
				</Box>
				{tabs.map((el, index) => (
					<Fragment key={`${el.id}`}>
						<TabPanel value={value} index={index}>
							<TabsContent chartData={el.chartData} />
						</TabPanel>
					</Fragment>
				))}
			</Box>
		</div>
	);
};

export default BotAllDetails;
