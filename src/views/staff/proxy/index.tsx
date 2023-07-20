import { Flex, Heading } from 'components/common';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Tab, Tabs } from '@mui/material';
import { stateSetter } from 'utils/types/state';
import AddProxy from './add-proxy';
import AllProxyTable from './all-proxies';

type TabValue = 0 | 1;
const tabs = ['All proxies', 'Add proxies'];
const components = (tabValue: TabValue, setTabValue: stateSetter<TabValue>): Record<TabValue, () => JSX.Element> => ({
	0: () => <AllProxyTable />,
	1: () => <AddProxy tabValue={tabValue} setTabValue={setTabValue} />,
});
const ComponentByTab: FC<ISetter> = (setter) => {
	const { tabValue, setTabValue } = setter;

	return components(tabValue, setTabValue)[tabValue as keyof ReturnType<typeof components>]();
};

export interface ISetter {
	tabValue: TabValue;
	setTabValue: stateSetter<TabValue>;
}

const ProxyPage: FC = () => {
	const { t } = useTranslation();

	const [tabValue, setTabValue] = useState<TabValue>(0);

	const handleChange = (event: React.SyntheticEvent, newValue: TabValue): void => {
		setTabValue(newValue);
	};

	return (
		<Flex justifyCenter>
			<Heading>{t('config_proxies')}</Heading>
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
			<ComponentByTab key={tabValue} tabValue={tabValue} setTabValue={setTabValue} />
		</Flex>
	);
};

export default ProxyPage;
