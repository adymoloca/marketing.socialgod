import { useMemo, useState } from 'react';
import { Flex, Heading } from 'components/common';
import CustomTable, { IColumn } from 'components/common/table';
import { useTranslation } from 'react-i18next';
import useServices, { IService } from 'hooks/fetch-hooks/use-service';
import { Box, CircularProgress, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { setPlatform, setServiceId } from 'store/slices/utils';
import EditIcon from '@mui/icons-material/Edit';
import { Icon } from '@iconify/react';
import ServiceForm from '../service-form';
import ServicesContext from '../service-context';

const tableColumns: IColumn[] = [
	{
		key: 'platform',
		label: 'platform',
		width: '40%',
		align: 'left',
	},
	{
		key: 'icon',
		label: 'icon',
		width: '35%',
		align: 'left',
	},
	{
		key: 'actions',
		label: 'actions',
		width: '25%',
		align: 'left',
	},
];

const AllServices = (): JSX.Element => {
	// eslint-disable-next-line max-len
	const {
		loadingServices,
		loadingService,
		data: services,
		deleteService,
		setData: setService,
		update,
		postServices,
	} = useServices<IService[]>(undefined);
	const [type, setType] = useState('Add_Service');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const handleExtendedFlow = (serviceId: string, platform: string): void => {
		dispatch(setPlatform(platform));
		dispatch(setServiceId(serviceId));
		navigate('/staff/flows');
	};

	const handleEdit = (serviceId: string): void => {
		setType('Edit-Service');
		dispatch(setServiceId(serviceId));
	};

	const rows = useMemo(() => {
		const myData = services?.map((service) => ({
			...service,
			icon: <Icon icon={service?.icon?.name} width={40} height={40} />,
			actions: (
				// eslint-disable-next-line react/no-array-index-key
				<Box key={service._id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<FormControlLabel
						onClick={(): void => handleExtendedFlow(service?._id, service?.platform)}
						control={<AddIcon />}
						label='Extended flow'
					/>
					<EditIcon onClick={(): void => handleEdit(service._id)} />
					{loadingService === `delete-${service._id}` ? (
						<CircularProgress size={20} />
					) : (
						<DeleteIcon onClick={(): void => deleteService(service._id)} />
					)}
				</Box>
			),
		}));
		return myData;
		// eslint-disable-next-line
	}, [services, loadingService]);

	const serviceContext = useMemo(
		() => ({ update, postServices, loadingService, setter: setService }),
		[update, postServices, loadingService, setService]
	);

	return (
		<Flex justifyCenter>
			<ServicesContext.Provider value={serviceContext}>
				{type === 'Add_Service' ? (
					<ServiceForm type='Add_Service' />
				) : (
					<ServiceForm type='Edit_Service' setType={setType} />
				)}
			</ServicesContext.Provider>
			<Heading>{t('all_services')}</Heading>
			<CustomTable
				pagination
				loading={loadingServices}
				data={{ rows, columns: tableColumns }}
				noContentMessage='There is no content yet'
			/>
		</Flex>
	);
};

export default AllServices;
