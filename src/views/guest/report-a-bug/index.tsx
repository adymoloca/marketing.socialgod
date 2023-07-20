import React, { useState } from 'react';
import { Button, TextField, Typography, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { postReport } from 'hooks/fetch-hooks/use-reports/index.action';

interface IReport {
	description: string;
}

function Alert(props: AlertProps): JSX.Element {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const BugReportPage: React.FC = () => {
	const [formData, setFormData] = useState<IReport>({
		description: '',
	});
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

	const handleSnackbarClose = ():void => {
		setIsSnackbarOpen(false);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>):void => {
		event.preventDefault();
		console.log('reports data', formData);
		postReport(formData);

		setIsSnackbarOpen(true);
		setFormData({
			description: '',
		});
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	return (
		<>
			<Typography variant='h5'>Report a Bug</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					label='Bug Description'
					variant='outlined'
					value={formData.description}
					onChange={handleChange}
					fullWidth
					multiline
					rows={4}
					margin='normal'
				/>
				<Button type='submit'  color='primary'>
					Submit
				</Button>
			</form>
			<Snackbar open={isSnackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity='success'>
					Bug report submitted successfully!
				</Alert>
			</Snackbar>
		</>
	);
};

export default BugReportPage;
