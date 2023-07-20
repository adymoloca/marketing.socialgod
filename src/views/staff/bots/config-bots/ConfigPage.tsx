import React, { FC, useState } from 'react';
import { Flex, Heading } from 'components/common';
import { Box, Tab, Tabs } from '@mui/material';
import ConfigBox from './components/ConfigBox';
import ConfigProxies from './components/config-proxies';

type TabValue = 0 | 1;
const tabs = ['Proxies', 'Browser config'];
const components: Record<TabValue, () => JSX.Element> = {
	0: () => <ConfigProxies />,
	1: () => <ConfigBox />,
};
const ComponentByTab: FC<{ tabValue: TabValue }> = ({ tabValue }) => components[tabValue as keyof typeof components]();

const ConfigPage: FC = () => {
	const [tabValue, setTabValue] = useState<TabValue>(0);
	const handleChange = (event: React.SyntheticEvent, newValue: TabValue): void => {
		setTabValue(newValue);
	};

	return (
		<Flex justifyCenter>
			<Heading>Config bots</Heading>
			<Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={tabValue}
					onChange={handleChange}
					variant='scrollable'
					scrollButtons='auto'
					aria-label='scrollable auto tabs example'>
					{tabs?.map((el: string) => (
						<Tab key={el} label={el} />
					))}
				</Tabs>
			</Box>
			<ComponentByTab tabValue={tabValue} key={tabValue} />
		</Flex>
	);
};

export default ConfigPage;
