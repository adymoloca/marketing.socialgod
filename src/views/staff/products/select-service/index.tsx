import { FC } from 'react';
import { CardHeader, CardContent, MenuItem } from '@mui/material';
import useServices, { IService } from 'hooks/fetch-hooks/use-service';
import { Flex } from 'components/common';
import { ifIsArray } from 'utils/functions';
import { FormBox, FormContainer, TextField } from '../index.styled';

interface IProps {
	service: string;
	setService: (param: IProps['service']) => void;
}

const SelectService: FC<IProps> = ({ service, setService }) => {
	const { data: services } = useServices();

	return (
		<FormBox id='select-services'>
			<FormContainer>
				<CardHeader title='Select Service' />
				<CardContent>
					<Flex justifyCenter>
						<TextField
							id='service'
							label='Service'
							name='service'
							autoFocus
							select
							value={service}
							onChange={(e): void => setService(e.target.value)}>
							{ifIsArray<IService>(services).map((s) => (
								<MenuItem key={`${s.platform} - ${s._id}`} value={s._id}>
									{s.platform}
								</MenuItem>
							))}
						</TextField>
					</Flex>
				</CardContent>
			</FormContainer>
		</FormBox>
	);
};

export default SelectService;
