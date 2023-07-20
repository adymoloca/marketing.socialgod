import {
	Box,
	CircularProgress,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	TextField,
	TextareaAutosize,
} from '@mui/material';
import { ButtonSG, Heading } from 'components/common';
import { capitalize, uuid } from 'utils/functions';
import useNewsletter from 'hooks/fetch-hooks/use-newsletter';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { INewsletter } from 'hooks/fetch-hooks/use-newsletter/index.actions';
import useSubscribe from 'hooks/fetch-hooks/use-subscribe';
import { stateSetter } from 'utils/types/state';
import NewsletterContext from '../newsletter-context';

export interface IProps {
	type: string;
	newsletterId?: string;
	setType?: stateSetter<string>;
}

const NewsletterForm: FC<IProps> = ({ type, newsletterId, setType }) => {
	const { t } = useTranslation();
	const { categories } = useSubscribe();
	const [values, setValues] = useState<{ subject: string; content: string; categories: string[] }>({
		subject: '',
		content: '',
		categories: ['All'],
	});
	const { addNewsletter, setter: setNewsletter, update, loadingNewsletter } = useContext(NewsletterContext);
	const {
		data: newsletter,
		getNewsletter,
		loadingNewsletter: loadingNewsletterGet,
	} = useNewsletter<INewsletter>(setNewsletter);

	useEffect(() => {
		newsletterId && getNewsletter(newsletterId);
		newsletterId &&
			setValues({
				subject: newsletter?.subject,
				content: newsletter?.content,
				categories: newsletter?.categories,
			});
		// eslint-disable-next-line
	}, [newsletterId, newsletter.subject, newsletter.content]);

	useEffect(() => {
		newsletterId && setValues((prev) => ({ ...prev, categories: newsletter?.categories }));
	}, [newsletter?.categories, newsletterId]);

	const handleChangeCategory = (e: SelectChangeEvent<string[]>): void => {
		setValues((prev) => ({ ...prev, categories: e.target.value as unknown as string[] }));
	};
	const handleCreateUpdate = (): void => {
		if (type === 'Add_Newsletter') {
			addNewsletter(values);
		} else {
			newsletterId && update(values, newsletterId);
		}
		setValues({ subject: '', content: '', categories: ['All'] });
		setType && setType('Add_Newsletter');
	};
	const handleCancel = (): void => {
		if (type === 'Add_Newsletter') {
			setValues({ subject: '', content: '', categories: ['All'] });
		} else {
			newsletterId &&
				setValues({
					subject: newsletter?.subject,
					content: newsletter?.content,
					categories: newsletter?.categories,
				});
		}
	};
	const disabled = useMemo(
		() =>
			!!(
				(type === 'Add_Newsletter' &&
					(values?.subject === '' || values?.content === '' || values?.categories?.length < 1)) ||
				(type === 'Edit_Newsletter' &&
					values?.subject === newsletter?.subject &&
					values?.content === newsletter?.content &&
					values?.categories?.length === newsletter?.categories?.length)
			),
		// eslint-disable-next-line
		[values]
	);

	const disabledCancel = useMemo(
		() =>
			!!(
				(type === 'Add_Newsletter' &&
					values?.subject === '' &&
					values?.content === '' &&
					values?.categories?.[0] === 'All' &&
					values?.categories?.length === 1) ||
				(type === 'Edit_Newsletter' &&
					values?.subject === newsletter?.subject &&
					values?.content === newsletter?.content &&
					values?.categories?.length === newsletter?.categories?.length)
			),
		// eslint-disable-next-line
		[values]
	);

	const submitButtonTitle = type === 'Add_Newsletter' ? 'Create' : 'Update';

	return (
		<>
			<Heading>{t(type)}</Heading>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square width='1000px'>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
					}}>
					{loadingNewsletterGet === newsletterId ? (
						<Box
							sx={{
								width: '100%',
								height: 417,
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							{' '}
							<CircularProgress size={100} />
						</Box>
					) : (
						<>
							<Box
								sx={{
									my: 8,
									mx: 4,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									width: '70%',
								}}>
								<TextField
									margin='normal'
									required
									fullWidth
									value={values.subject}
									onChange={(event): void =>
										setValues((prev) => ({ ...prev, subject: event?.target?.value }))
									}
									id='subject'
									label='Subject'
									name='Subject'
									autoFocus
								/>
								<FormControl fullWidth>
									<InputLabel id='select-category-label'>Category</InputLabel>
									<Select
										labelId='select-category-label'
										id='select-category'
										label={capitalize(t('category'))}
										name='category'
										multiple
										value={[...(values.categories || ['All'])]}
										onChange={handleChangeCategory}>
										{categories?.map((permissions) => (
											<MenuItem key={uuid()} value={permissions}>
												{capitalize(permissions)}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<ButtonSG
									type='submit'
									fullWidth
									disabled={disabled}
									sx={{ mt: 3, mb: 2 }}
									onClick={handleCreateUpdate}>
									{loadingNewsletter === 'post-update-newsletter' ? (
										<CircularProgress size={20} />
									) : (
										submitButtonTitle
									)}
								</ButtonSG>
								<ButtonSG
									type='submit'
									fullWidth
									disabled={disabledCancel}
									sx={{ mt: 3, mb: 2 }}
									onClick={handleCancel}>
									Cancel
								</ButtonSG>
							</Box>
							<TextareaAutosize
								value={values.content}
								onChange={(event): void =>
									setValues((prev) => ({ ...prev, content: event?.target?.value }))
								}
								maxRows='10'
								aria-label='Content'
								placeholder='Content'
								style={{
									width: 'calc(100% - 80px)',
									margin: 1,
									resize: 'vertical',
									maxHeight: '300px',
									minHeight: '240px',
									fontSize: '16px',
									padding: '8px',
								}}
							/>
						</>
					)}
				</Box>
			</Grid>
		</>
	);
};

NewsletterForm.defaultProps = {
	newsletterId: '',
	setType: (): void => {},
};

export default NewsletterForm;
