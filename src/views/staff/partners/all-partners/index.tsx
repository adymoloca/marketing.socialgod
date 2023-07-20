import React, { FC, useMemo, useState } from 'react';
import { Box, CircularProgress, IconButton, Tooltip, Link } from '@mui/material';
import { Flex, Heading } from 'components/common';
import CustomTable, { IColumn } from 'components/common/table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import usePartners from 'hooks/fetch-hooks/use-partners';
import { IPartner } from 'hooks/fetch-hooks/use-partners/index.actions';
import { Icon } from '@iconify/react';
import { ifIsArray } from 'utils/functions';
import PartnersContext from '../partners-context';
import PartnerForm from '../form-partners';

const tableColumns: IColumn[] = [
	{
		key: 'logo',
		label: 'logo',
		width: '35%',
		align: 'left',
	},
	{
		key: 'name',
		label: 'name',
		width: '40%',
		align: 'left',
	},
	{
		key: 'actions',
		label: 'actions',
		width: '25%',
		align: 'center',
	},
];

const AllPartners: FC = () => {
	const { t } = useTranslation();
	const {
		data: partners,
		postPartner,
		update,
		setData: setPartner,
		deletePartner,
		loadingPartner,
		loadingPartners,
	} = usePartners<IPartner[]>(undefined, true);
	const [type, setType] = useState('Add_Partner');
	const [partnerId, setPartnerId] = useState('');

	const handleEdit = (pId: string): void => {
		setType('Edit_Partner');
		setPartnerId(pId);
	};
	const rows = useMemo(() => {
		const myData = ifIsArray<IPartner>(partners).map((partner) => ({
			...partner,
			logo: (
				<Link href={partner?.link ? partner.link : ''} target='_blank'>
					<Icon icon={partner?.logo} width={40} height={40} />
				</Link>
			),
			actions: (
				<Box key={partner?._id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
					<Tooltip title='Edit' onClick={(): void => handleEdit(partner?._id)}>
						<IconButton>
							<EditIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title='Delete' onClick={(): void => deletePartner(partner?._id)}>
						<IconButton>
							{loadingPartner === partner?._id ? <CircularProgress size={20} /> : <DeleteIcon />}
						</IconButton>
					</Tooltip>
				</Box>
			),
		}));
		return myData;
		// eslint-disable-next-line
	}, [partners, loadingPartner]);

	const partnersContext = useMemo(
		() => ({ postPartner, update, setter: setPartner, loadingPartner }),
		[postPartner, update, setPartner, loadingPartner]
	);

	return (
		<Flex justifyCenter>
			<PartnersContext.Provider value={partnersContext}>
				{type === 'Add_Partner' ? (
					<PartnerForm type='Add_Partner' />
				) : (
					<PartnerForm type='Edit_Partner' partnerId={partnerId} setType={setType} />
				)}
			</PartnersContext.Provider>
			<Heading>{t('all_partners')}</Heading>
			<CustomTable
				pagination
				loading={loadingPartners}
				data={{ rows, columns: tableColumns }}
				noContentMessage='There is no content yet'
			/>
		</Flex>
	);
};

export default AllPartners;
