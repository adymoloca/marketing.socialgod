import React, { FC, useMemo, useState } from 'react';
import { TextField, Paper, Box, Grid, CircularProgress } from '@mui/material';
import { ButtonSG } from 'components/common';
import useServices from 'hooks/fetch-hooks/use-service';
import { useNavigate } from 'react-router';

const AddServiceForm: FC = () => {
	const { postServices, loadingService } = useServices();
	const navigate = useNavigate();
	// const [disabled, setDisabled] = useState(false);
	const [values, setValues] = useState({ platform: '', name: '', source: '' });

	const handleAdd = (): void => {
		postServices({
			services: { platform: values.platform, icon: { name: values.name, source: values.source } },
			onFinish: () => setValues({ platform: '', name: '', source: '' }),
		});
		navigate('/staff/services');
	};

	// eslint-disable-next-line max-len
	const disabled = useMemo(() => !!(values.platform === '' || values.name === '' || values.source === ''), [values]);

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
				<Box sx={{ display: 'flex', width: '100%' }}>
					<TextField
						sx={{ marginRight: '10px' }}
						margin='normal'
						value={values.platform || ''}
						onChange={(event): void => setValues((prev) => ({ ...prev, platform: event.target.value }))}
						required
						fullWidth
						id='platform'
						label='Platform'
						name='platform'
						autoFocus
					/>
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
					{loadingService ? <CircularProgress size={20} /> : 'Create'}
				</ButtonSG>
			</Box>
		</Grid>
	);
};

export default AddServiceForm;
