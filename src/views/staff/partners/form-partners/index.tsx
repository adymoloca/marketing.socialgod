/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, Grid, Paper, TextField } from '@mui/material';
import { ButtonSG, Heading } from 'components/common';
import { useTranslation } from 'react-i18next';
import usePartners from 'hooks/fetch-hooks/use-partners';
import { IPartner } from 'hooks/fetch-hooks/use-partners/index.actions';
import { stateSetter } from 'utils/types/state';
import PartnersContext from '../partners-context';

export interface IProps {
	type: string;
	partnerId?: string;
	setType?: stateSetter<string>;
}

const PartnerForm: FC<IProps> = ({ type, partnerId, setType }) => {
	const { t } = useTranslation();
	const { postPartner, update, setter: setPartner, loadingPartner } = useContext(PartnersContext);

	const { data: partner, getPartner, loadingPartner: loadingPartnerGet } = usePartners<IPartner>(setPartner);
	const [values, setValues] = useState<{ name: string; logo: string; link: string }>({
		name: '',
		logo: '',
		link: '',
	});

	useEffect(() => {
		partnerId && getPartner(partnerId);
		partnerId && setValues({ name: partner?.name, logo: partner?.logo, link: partner?.link });
		// eslint-disable-next-line
	}, [partnerId, partner?.name, partner?.logo]);
	const handleCancel = (): void => {
		if (type === 'Add_Partner') {
			setValues({ name: '', logo: '', link: '' });
		} else {
			partnerId && setValues({ name: partner?.name, logo: partner?.logo, link: partner?.link });
		}
	};

	const disabled: boolean = useMemo(
		() =>
			!!(
				(type === 'Add_Partner' && (values.name === '' || values.logo === '' || values.link === '')) ||
				(type === 'Edit_Partner' &&
					values.name === partner?.name &&
					values.logo === partner?.logo &&
					values.link === partner?.link)
			),
		// eslint-disable-next-line
		[values, partner]
	);

	const disabledCancel: boolean = useMemo(
		() =>
			!!(
				(type === 'Add_Partner' && values.name === '' && values.logo === '' && values.link === '') ||
				(type === 'Edit_Partner' &&
					values.name === partner?.name &&
					values.logo === partner?.logo &&
					values.link === partner?.link)
			),
		// eslint-disable-next-line
		[values, partner]
	);

	const handlePostEdit = (): void => {
		type === 'Add_Partner' ? postPartner(values) : partnerId && update(values, partnerId);
		setValues({ name: '', logo: '', link: '' });
		setType && setType('Add_Partner');
	};

	const submitButtonTitle = type === 'Add_Partner' ? 'Add partner' : 'Edit partner';

	return (
		<>
			<Heading>{t(type)}</Heading>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 20,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					{loadingPartnerGet === partnerId ? (
						<Box
							sx={{
								width: 480,
								height: 313,
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
							<Box sx={{ display: 'flex' }}>
								<TextField
									sx={{ marginRight: '10px' }}
									margin='normal'
									value={values.logo || ''}
									onChange={(event): void =>
										setValues((prev) => ({ ...prev, logo: event.target.value }))
									}
									required
									fullWidth
									id='logo'
									label='Logo'
									name='logo'
									autoFocus
								/>
								<TextField
									margin='normal'
									value={values.name || ''}
									onChange={(event): void =>
										setValues((prev) => ({ ...prev, name: event.target.value }))
									}
									required
									fullWidth
									id='name'
									label='Name'
									name='name'
								/>
							</Box>
							<TextField
								margin='normal'
								value={values.link || ''}
								onChange={(event): void => setValues((prev) => ({ ...prev, link: event.target.value }))}
								required
								fullWidth
								id='link'
								label='Link'
								name='link'
							/>
							<ButtonSG
								type='submit'
								fullWidth
								disabled={disabled}
								sx={{ mt: 3, mb: 2 }}
								onClick={handlePostEdit}>
								{loadingPartner === 'post-update-partner' ? (
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
						</>
					)}
				</Box>
			</Grid>
		</>
	);
};

PartnerForm.defaultProps = {
	partnerId: '',
	setType: (): void => {},
};

export default PartnerForm;
