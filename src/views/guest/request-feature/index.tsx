import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import useFeatureRequest, { IFeatureRequest } from 'hooks/fetch-hooks/use-request-feature';

const FeatureRequest: React.FC = () => {
	const [formData, setFormData] = useState<IFeatureRequest>({
		title: '',
		description: '',
	});
	const { postFeatureRequest } = useFeatureRequest();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const { title, description } = formData;
		const values: IFeatureRequest = {
			title,
			description,
		};
		console.log('Form submitted:', values);
		postFeatureRequest(values);
		// Reset form fields
		setFormData({ title: '', description: '' });
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<Container maxWidth='sm'>
			<Typography variant='h4' align='center' gutterBottom>
				Request a New Feature
			</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					label='Feature Title'
					name='title'
					value={formData.title}
					onChange={handleInputChange}
					fullWidth
					required
					margin='normal'
				/>
				<TextField
					label='Feature Description'
					name='description'
					value={formData.description}
					onChange={handleInputChange}
					fullWidth
					multiline
					rows={4}
					required
					margin='normal'
				/>
				<Button type='submit'  color='primary' fullWidth>
					Submit
				</Button>
			</form>
		</Container>
	);
};

export default FeatureRequest;
