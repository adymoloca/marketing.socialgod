import { FC } from 'react';
import { Flex, Heading } from 'components/common';
import BotsTable from './components/BotsTable';

const ConfigBots: FC = () => (
	<Flex justifyCenter>
		<Heading>Config bots</Heading>
		<BotsTable />
	</Flex>
);

export default ConfigBots;
