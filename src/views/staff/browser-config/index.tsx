import { Box, Tab, Tabs } from '@mui/material';
import { Flex, Heading } from 'components/common';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AllBrowserConfig from './all-browser-config';
import AddBrowserConfig from './add-browser-config';

type TabValue = 0 | 1;
const tabs = ['All browser config', 'Add browser config'];
const components: Record<TabValue, () => JSX.Element> = {
	0: () => <AllBrowserConfig />,
	1: () => <AddBrowserConfig />,
};
const ComponentByTab: FC<{ tabValue: TabValue }> = ({ tabValue }) => components[tabValue as keyof typeof components]();
const BrowserConfig: FC = () => {
	const { t } = useTranslation();
	const [tabValue, setTabValue] = useState<TabValue>(0);
	const handleChange = (event: React.SyntheticEvent, newValue: TabValue): void => {
		setTabValue(newValue);
	};

	return (
		<Flex justifyCenter>
			<Heading>{t('browser_configs')}</Heading>
			<Box sx={{ width: '100%', borderBottom: 1, mb: 2, borderColor: 'divider' }}>
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

export default BrowserConfig;
