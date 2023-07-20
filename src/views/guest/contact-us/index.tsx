import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@mui/material';
import { Flex } from 'components/common';
import useContact, { IContact } from 'hooks/fetch-hooks/use-contact';

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

const ContactUs: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		message: '',
		subject: '',
	});
	const [isSnackbarOpen, setSnackbarOpen] = useState(false);
	const { postContact } = useContact();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const { name, email, message, subject } = formData;
		const values: IContact = {
			name,
			email,
			message,
			subject,
		};

		console.log('contact data', values);
		postContact(values);

		setFormData({
			name: '',
			email: '',
			message: '',
			subject: '',
		});

		setSnackbarOpen(true);
	};

	const handleSnackbarClose = (): void => {
		setSnackbarOpen(false);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Flex sx={{ width: '50%', height: 300, alignItems: 'center', justifyContent: 'center' }}>
					<TextField label='Name' name='name' value={formData.name} onChange={handleChange} required />
					<TextField
						label='Email'
						name='email'
						type='email'
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<TextField
						label='Message'
						name='message'
						multiline
						rows={4}
						value={formData.message}
						onChange={handleChange}
						required
					/>
					<Button  type='submit'>
						Submit
					</Button>
				</Flex>
			</form>

			<Snackbar
				open={isSnackbarOpen}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
				message='Form submitted successfully!'
			/>
		</>
	);
};

export default ContactUs;
