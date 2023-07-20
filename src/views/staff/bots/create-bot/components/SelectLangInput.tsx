import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { stateSetter } from 'utils/types/state';
import { BotObject } from '../ParentCreateBot';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const languageArray = ['RO', 'EN', 'ES', 'FR', 'DE', 'IT'];

interface IProps {
	language: string;
	data: BotObject[];
	index: number;
	setLanguage: stateSetter<BotObject[]>;
}

const SelectLang: React.FC<IProps> = (props) => {
	const { language, setLanguage, data, index } = props;

	const handleChange = (event: SelectChangeEvent): void => {
		const languageSelected = event.target.value;
		const temp = [...data];
		const credentials = data[index]?.credentials;
		temp.splice(index, 1, { language: languageSelected, credentials });
		setLanguage(temp);
	};

	return (
		<FormControl sx={{ minWidth: 120 }}>
			<InputLabel id='select-bot-language'>Language</InputLabel>
			<Select
				fullWidth
				labelId='select-bot-language'
				id='demo-select-small'
				value={language}
				label='Language'
				onChange={handleChange}
				MenuProps={MenuProps}>
				<MenuItem value=''>
					<em>None</em>
				</MenuItem>
				{languageArray.map((lang) => (
					<MenuItem key={lang} value={lang}>
						{lang}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectLang;
