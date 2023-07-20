import React, { useCallback, useMemo } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Heading, Upload } from 'components/common';
import useFaq, { FaqItem } from 'hooks/fetch-hooks/use-faq';
import useNotifications from 'hooks/use-notifications';
import { ifIsArray, uuid } from 'utils/functions';

const FAQPage: React.FC = () => {
	const { register, handleSubmit, reset: formReset } = useForm<FaqItem>();
	const [editIndex, setEditIndex] = React.useState<number | null>(null);
	const { data: faqs, addFaq, removeFaq, updateFaq } = useFaq();
	const [file, setFile] = React.useState<null | File | string>(null);
	const { error } = useNotifications();

	const reset = useCallback(
		(item?: FaqItem) => {
			formReset(item);
			setFile(item?.attachment || null);
		},
		[formReset, setFile]
	);

	const handleAddItem: SubmitHandler<FaqItem> = (data: FaqItem) => {
		const existingItem = faqs?.find((item) => item.index === Number(data.index));
		if (existingItem) {
			error('Index already exists. Please choose a different index.');
			return;
		}

		const newItem: FaqItem = {
			_id: '',
			index: Number(data.index),
			question: data.question,
			answer: data.answer,
			attachment: file ?? undefined,
		};

		addFaq(newItem);
		reset();
	};

	const handleEditItem = (index: number): void => {
		if (faqs) {
			setEditIndex(index);
			const item = faqs[index] as FaqItem;
			reset({
				index: 0,
				question: '',
				answer: '',
				attachment: undefined,
			});
			setFile(item.attachment || null);
		}
	};

	const handleUpdateItem: SubmitHandler<FaqItem> = (data: FaqItem) => {
		if (editIndex !== null) {
			if (faqs) {
				const updatedItem: FaqItem = {
					...faqs[editIndex],
					index: data.index,
					question: data.question,
					answer: data.answer,
					attachment: file ?? undefined,
				};
				updateFaq(updatedItem);
				setEditIndex(null);
				reset({
					index: 0,
					question: '',
					answer: '',
					attachment: undefined,
				});
			}
		}
	};

	const handleDeleteItem = (itemId: string): void => {
		console.log('itemid: ', itemId);
		removeFaq(itemId);
	};

	const sortedFaqItems = useMemo(
		() =>
			ifIsArray<FaqItem>(faqs).sort((a, b) => {
				if (!!a?.index && !!b?.index) return +(a?.index || 0) < +(b?.index || 0) ? -1 : 1;
				return 0;
			}),
		[faqs]
	);

	return (
		<div>
			<Heading>Frequently Asked Questions</Heading>
			<form onSubmit={handleSubmit(editIndex !== null ? handleUpdateItem : handleAddItem)}>
				<Grid container spacing={2} alignItems='center'>
					<Grid item xs={5} sm={1}>
						<TextField
							label='Order'
							{...register('index', { required: true, min: 1 })}
							type='number'
							inputProps={{ min: 1 }}
							fullWidth
							autoFocus
						/>
					</Grid>
					<Grid item xs={12} sm={5}>
						<TextField fullWidth label='Question' {...register('question', { required: true })} />
					</Grid>
					<Grid item xs={12} sm={5}>
						<TextField fullWidth label='Answer' {...register('answer', { required: true })} />
					</Grid>
					<Grid item xs={12} sm={1}>
						<Upload
							file={file ?? undefined}
							showFile
							onChange={(f): void => setFile(f as File)}
							onDelete={(): void => setFile(null)}
						/>
					</Grid>
					<Grid item xs={12} sm={1}>
						<Button type='submit'  color='primary'>
							{editIndex !== null ? 'Update' : 'Add'}
						</Button>
					</Grid>
				</Grid>
			</form>
			<Box mt={3}>
				{sortedFaqItems.map((item, index) => (
					<Accordion key={uuid()}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography variant='h5'>
								{item.index}. {item.question}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography variant='body1'>{item.answer}</Typography>
						</AccordionDetails>
						{item.attachment && (
							<Box padding={1}>
								<img
									src={
										typeof item.attachment === 'string'
											? item.attachment
											: URL.createObjectURL(item.attachment)
									}
									alt={typeof item.attachment === 'string' ? item.attachment : item.attachment.name}
									style={{ maxWidth: '100%', maxHeight: '200px' }}
								/>
							</Box>
						)}

						<Box display='flex' justifyContent='flex-end' mb={1} mr={1}>
							<Button variant='outlined' color='primary' onClick={(): void => handleEditItem(index)}>
								Edit
							</Button>
							<Button
								variant='outlined'
								color='error'
								onClick={(): void => handleDeleteItem(item?._id || '')}
								style={{ marginLeft: '8px' }}>
								Delete
							</Button>
						</Box>
					</Accordion>
				))}
			</Box>
		</div>
	);
};

export default FAQPage;
