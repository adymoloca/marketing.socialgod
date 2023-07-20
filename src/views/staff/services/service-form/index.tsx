import { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { TextField, Paper, Box, Grid, CircularProgress } from '@mui/material';
import { ButtonSG, Heading } from 'components/common';
import useServices, { IService } from 'hooks/fetch-hooks/use-service';
import { useNavigate } from 'react-router';
import { useAppSelector } from 'store/hooks';
import { stateSetter } from 'utils/types/state';
import ServicesContext from '../service-context';

export interface IProps {
	type: string;
	setType?: stateSetter<string>;
}

const ServiceForm: FC<IProps> = ({ type, setType }) => {
	const serviceId = useAppSelector((state) => state?.utils?.serviceId);
	const { postServices, update, loadingService, setter: setService } = useContext(ServicesContext);
	const { data: service, getService, loadingService: loadingServiceGet } = useServices<IService>(setService);

	const navigate = useNavigate();
	const [values, setValues] = useState({ platform: '', name: '', source: '' });

	useEffect(() => {
		if (type === 'Edit_Service') {
			getService(serviceId);
		}
	}, [getService, serviceId, type]);

	const incrementValues = useCallback(() => {
		if (type === 'Edit_Service') {
			setValues({ name: service?.icon?.name, source: service?.icon?.source, platform: service?.platform });
		}
	}, [service?.icon?.name, service?.icon?.source, service?.platform, type]);

	useEffect(() => {
		incrementValues();
	}, [incrementValues]);

	const handleAdd = (): void => {
		if (type === 'Add_Service') {
			postServices({
				services: { platform: values.platform, icon: { name: values.name, source: values.source } },
				onFinish: () => setValues({ platform: '', name: '', source: '' }),
			});
		} else {
			update(
				{
					services: { platform: values.platform, icon: { name: values.name, source: values.source } },
					onFinish: () => setValues({ platform: '', name: '', source: '' }),
				},
				serviceId
			);
		}
		setType && setType('Add_Service');
		navigate('/staff/services');
	};

	const disabled: boolean = useMemo(
		() =>
			!!(
				(type === 'Add_Service' && (values.name === '' || values.platform === '' || values.source === '')) ||
				(type === 'Edit_Service' &&
					values.name === service?.icon?.name &&
					values.source === service?.icon?.source &&
					values.platform === service?.platform)
			),
		[
			service?.icon?.name,
			service?.icon?.source,
			service?.platform,
			type,
			values.name,
			values.platform,
			values.source,
		]
	);

	const disabledCancel: boolean = useMemo(
		() =>
			!!(
				(type === 'Add_Service' && values.name === '' && values.platform === '' && values.source === '') ||
				(type === 'Edit_Service' &&
					values.name === service?.icon?.name &&
					values.source === service?.icon?.source &&
					values.platform === service?.platform)
			),
		[
			service?.icon?.name,
			service?.icon?.source,
			service?.platform,
			type,
			values.name,
			values.platform,
			values.source,
		]
	);

	const handleCancel = (): void => {
		if (type === 'Add_Service') {
			setValues({ platform: '', name: '', source: '' });
		} else {
			setValues({ name: service?.icon?.name, source: service?.icon?.source, platform: service?.platform });
		}
	};

	const submitTitle = type === 'Add_service' ? 'Create' : 'Update';

	return (
		<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
			<Box
				sx={{
					my: 8,
					mx: 20,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				{serviceId !== '' && loadingServiceGet === serviceId ? (
					<Box
						sx={{
							width: 480,
							height: 313,
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<CircularProgress size={100} />
					</Box>
				) : (
					<Box>
						<Heading>{type}</Heading>
						<Box sx={{ display: 'flex', width: '100%' }}>
							{type === 'Add_Service' && (
								<TextField
									sx={{ marginRight: '10px' }}
									margin='normal'
									value={values.platform || ''}
									onChange={(event): void =>
										setValues((prev) => ({ ...prev, platform: event.target.value }))
									}
									required
									fullWidth
									id='platform'
									label='Platform'
									name='platform'
									autoFocus
								/>
							)}
							<TextField
								margin='normal'
								value={values.name || ''}
								onChange={(event): void => setValues((prev) => ({ ...prev, name: event.target.value }))}
								required
								fullWidth
								id='name'
								label='Icon Name'
								name='name'
							/>
						</Box>
						<TextField
							margin='normal'
							value={values.source || ''}
							onChange={(event): void => setValues((prev) => ({ ...prev, source: event.target.value }))}
							required
							fullWidth
							id='source'
							label='Icon Source'
							name='source'
						/>
						<ButtonSG
							type='submit'
							fullWidth
							disabled={disabled}
							sx={{ mt: 3, mb: 2 }}
							onClick={handleAdd}>
							{loadingService === 'post-update-service' ? <CircularProgress size={20} /> : submitTitle}
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
				)}
			</Box>
		</Grid>
	);
};

ServiceForm.defaultProps = {
	setType: (): void => {},
};

export default ServiceForm;
