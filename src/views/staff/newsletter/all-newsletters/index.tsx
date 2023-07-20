import React, { FC, useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Flex, Heading } from 'components/common';
import CustomTable, { IColumn } from 'components/common/table';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useNewsletter from 'hooks/fetch-hooks/use-newsletter';
import { INewsletter } from 'hooks/fetch-hooks/use-newsletter/index.actions';
import MailIcon from '@mui/icons-material/Mail';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import NewsletterContext from '../newsletter-context';
import NewsletterForm from '../form-newsletter';

const tableColumns: IColumn[] = [
	{
		key: 'subject',
		label: 'subject',
		width: '50%',
		align: 'left',
	},
	{
		key: 'sentAt',
		label: 'sent',
		width: '25%',
		align: 'center',
	},
	{
		key: 'actions',
		label: 'actions',
		width: '25%',
		align: 'center',
	},
];

const getSendButtonIcon = (isSent: boolean, callback: () => void): JSX.Element =>
	isSent ? <MarkEmailReadIcon /> : <MailIcon onClick={callback} />;

const AllNewsletter: FC = () => {
	const { t } = useTranslation();
	const {
		loadingNewsletters,
		loadingNewsletter,
		getNewsletters,
		data: newsletters,
		deleteNewsletter,
		addNewsletter,
		send,
		setData,
		update,
	} = useNewsletter<INewsletter[]>();
	const [type, setType] = useState('Add_Newsletter');
	const [newsletterId, setNewsletterId] = useState('');

	useEffect(() => {
		getNewsletters('admin');
		// eslint-disable-next-line
	}, []);

	const handleEdit = (flowId: string): void => {
		setNewsletterId(flowId);
		setType('Edit_flow');
	};

	const rows = useMemo(() => {
		const myData = newsletters?.map((newsletter) => ({
			...newsletter,
			actions: (
				<Box
					key={newsletter._id}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
					<EditIcon onClick={(): void => handleEdit(newsletter._id)} />
					{loadingNewsletter === `send-${newsletter._id}` ? (
						<CircularProgress size={20} />
					) : (
						getSendButtonIcon(newsletter.sent, (): void => send(newsletter._id))
					)}
					{loadingNewsletter === `delete-${newsletter._id}` ? (
						<CircularProgress size={20} />
					) : (
						<DeleteIcon onClick={(): void => deleteNewsletter(newsletter._id)} />
					)}
				</Box>
			),
		}));
		return myData;
		// eslint-disable-next-line
	}, [newsletters, loadingNewsletter]);

	const newlsletterContext = useMemo(
		() => ({ addNewsletter, setter: setData, loadingNewsletter, update }),
		[addNewsletter, setData, loadingNewsletter, update]
	);

	return (
		<Flex justifyCenter>
			<NewsletterContext.Provider value={newlsletterContext}>
				{type === 'Add_Newsletter' ? (
					<NewsletterForm type='Add_Newsletter' />
				) : (
					<NewsletterForm type='Edit_Newsletter' newsletterId={newsletterId} setType={setType} />
				)}
			</NewsletterContext.Provider>
			<Heading>{t('all_newsletters')}</Heading>
			<CustomTable
				pagination
				loading={loadingNewsletters}
				data={{ rows, columns: tableColumns }}
				noContentMessage='There is no content yet'
			/>
		</Flex>
	);
};

export default AllNewsletter;
