import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { FC } from 'react';

interface IProps {
	chartData: ChartData<'bar', number[], unknown>;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Bot performance',
		},
	},
};

const labels = ['Today', 'Last Day', 'Last Three Days', 'Last Week', 'Last Month', 'Last three Months', 'Last Year'];

export const data = {
	labels,
	datasets: [
		{
			label: 'Time Active in hours',
			data: labels.map(() => faker.number.float({ min: 0, max: 1000 })),
			backgroundColor: '#0000ff',
		},
		{
			label: 'Money in $',
			data: labels.map(() => faker.number.float({ min: 0, max: 1000 })),
			backgroundColor: '#00ff00',
		},
	],
};

const TabsContent: FC<IProps> = (props: IProps) => {
	const { chartData } = props;

	return <Bar options={options} data={chartData} />;
};

export default TabsContent;
