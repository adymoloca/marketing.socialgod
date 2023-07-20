import React, { FC, Fragment, useCallback, useMemo, useState } from 'react';
import { Flex, Heading } from 'components/common';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import CustomTable, { IColumn } from 'components/common/table';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'utils/functions';
import BrowserBox from '../components/BrowserBox';

const tableColumns: IColumn[] = [
	{
		key: 'id',
		label: 'id',
		width: '25%',
		align: 'left',
	},
	{
		key: 'name',
		label: 'name',
		width: '25%',
		align: 'left',
	},
	{
		key: 'role',
		label: 'role',
		width: '25%',
		align: 'left',
	},
	{
		key: 'actions',
		label: 'actions',
		width: '25%',
		align: 'left',
	},
];
export interface Bot {
	id: number;
	name: string;
	role: string;
}

const ActiveBots: FC = () => {
	const bots: Bot[] = [
		{ id: 1, name: 'Bot de test', role: 'reddit' },
		{ id: 2, name: 'Bot manele nu aveti ?', role: 'youtube' },
		{ id: 3, name: 'Bot baba', role: 'facebook' },
		{ id: 4, name: 'Bot ii buna asta', role: 'instagram' },
		{ id: 5, name: 'Bot single', role: 'only' },
		{ id: 6, name: 'Bot emo', role: 'tik tok' },
		{ id: 7, name: 'Bot wa', role: 'twiter' },
		{ id: 8, name: 'Bot da-i', role: 'pornhub' },
		{ id: 9, name: 'Bot boss nu eu am fost', role: 'fure card bancar' },
		{ id: 10, name: 'Bot de bot', role: 'reddit' },
	];

	const { t } = useTranslation();
	const [selectedBots, setSelectedBots] = useState<Bot[]>([]);
	const [bringFront, setBringFront] = useState<number>(0);

	const moveBoxToFront = (index: number): void => {
		bringFront !== index && setBringFront(index);
	};

	const addBot = useCallback(
		(id: number) => {
			const index = bots.findIndex((bot) => bot.id === id);
			const botToAdd = bots[index];

			if (index !== -1 && selectedBots?.length < 5) {
				setSelectedBots((prev) => [botToAdd, ...prev]);
			} else if (index !== -1) {
				const temp = [...selectedBots];
				temp.pop();
				const newArray = [botToAdd, ...temp];
				setSelectedBots(newArray);
			}
		},
		// eslint-disable-next-line
		[selectedBots]
	);

	const removeBot = useCallback(
		(id: number) => {
			const updatedBots = selectedBots.filter((bot) => bot.id !== id);
			setSelectedBots(updatedBots);
		},
		[selectedBots]
	);

	const handleCheck = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>, id: number) => {
			if (e.target.checked) addBot(id);
			else removeBot(id);
		},
		[addBot, removeBot]
	);

	const isChecked = (id: number, selectedBotsParsed: Bot[]): boolean =>
		selectedBotsParsed.findIndex((bot) => bot.id === id) > -1;

	const rows = useMemo(() => {
		const myData = bots?.map((bot) => ({
			...bot,
			actions: (
				<Box key={bot.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<FormControlLabel
						control={
							<Checkbox
								onChange={(e): void => handleCheck(e, bot.id)}
								checked={isChecked(bot.id, selectedBots)}
							/>
						}
						label={capitalize(t('show_details'))}
					/>
				</Box>
			),
		}));
		return myData;
		// eslint-disable-next-line
	}, [isChecked]);

	return (
		<Flex
			justifyCenter
			sx={{
				position: 'relative',
				paddingBottom: '24px',
				minHeight: selectedBots?.length > 0 ? '160vh' : 'inherit',
				alignContent: 'flex-start',
			}}>
			<Heading>{t('active_bots')}</Heading>
			<Box sx={{ width: '100%' }}>
				<CustomTable
					pagination
					loading={false}
					data={{ rows, columns: tableColumns }}
					noContentMessage='There is no content yet'
				/>
			</Box>
			{selectedBots?.map((bot, index) => (
				<Fragment key={bot.id}>
					<BrowserBox
						removeBot={(): void => removeBot(bot.id)}
						botData={bot}
						onClick={(): void => moveBoxToFront(index)}
						index={index}
						isSelected={bringFront === index}
						zIndex={bringFront === index ? 9999 : 9990}
					/>
				</Fragment>
			))}
		</Flex>
	);
};

export default ActiveBots;
