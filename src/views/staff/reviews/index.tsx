import React, { useState, useEffect } from 'react';
import { Grid, Typography, FormControlLabel, Checkbox, Box, TextField, Button } from '@mui/material';
import { ReactComponent as Logo } from 'assets/svg/User-avatar.svg.svg';
import theme from 'utils/config/theme';
import useReview, { IReview } from 'hooks/fetch-hooks/use-review';
import { SubmitHandler } from 'react-hook-form';
import { ifIsArray } from 'utils/functions';

const emptyReview: IReview = {
	content: '',
	rating: 0,
	reviewer: '',
	position: '',
};

const ReviewControlPage: React.FC = () => {
	const { data: reviews, getReviews, addReview, removeReview, updateReview } = useReview('admin');
	const [mutableReview, setMutableReview] = useState<IReview | null>(null);
	const [review, setReview] = useState<IReview>(emptyReview);

	function handleMutableReview<T extends number | string>(name: string, value: T): void {
		setMutableReview((prev) => (prev !== null ? { ...prev, [name]: value } : { ...emptyReview, [name]: value }));
	}

	function handleReview<T extends number | string>(name: string, value: T): void {
		setReview((prev) => (prev !== null ? { ...prev, [name]: value } : { ...emptyReview, [name]: value }));
	}

	const handleUpdateReview = (r: IReview): void => {
		updateReview(r);
		setMutableReview(null);
	};

	const handleAddReview: SubmitHandler<IReview> = (r: IReview) => {
		const newReview: IReview = {
			_id: '',
			content: r.content,
			rating: r.rating,
			reviewer: r.reviewer,
			position: r.position,
		};
		addReview(newReview);
	};
	const handleDeleteReview = (reviewId: string): void => {
		removeReview(reviewId);
	};

	useEffect(() => {
		getReviews();
		// eslint-disable-next-line
	}, []);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6} md={4}>
				<Grid
					container
					direction='column'
					sx={{
						marginBottom: 2,
						border: 2,
						borderStyle: 'dashed',
						borderColor: theme.light.palette.primary.main,
						borderRadius: 5,
						height: 350,
						justifyContent: 'center',
						alignItems: 'center',
						padding: 2,
					}}>
					<TextField
						label='Reviewer Name'
						value={!review?._id ? review?.reviewer : ''}
						onChange={(e): void => handleReview<string>('reviewer', e.target.value)}
						variant='outlined'
					/>
					<TextField
						label='Reviewer Position'
						value={!review?._id ? review?.position : ''}
						onChange={(e): void => handleReview<string>('position', e.target.value)}
						variant='outlined'
					/>
					<TextField
						label='Review Content'
						value={!review?._id ? review?.content : ''}
						onChange={(e): void => handleReview<string>('content', e.target.value)}
						variant='outlined'
						multiline
						rows={3}
					/>
					<TextField
						label='Rating'
						type='number'
						value={review?.rating || ''}
						onChange={(e): void => {
							const value = Number(e.target.value);
							if (value >= 1 && value <= 5) {
								handleReview('rating', value);
							}
						}}
						variant='outlined'
						inputProps={{
							min: 1,
							max: 5,
						}}
					/>
					<Button onClick={(): unknown => handleAddReview(review)} color='primary'>
						Add Review
					</Button>
				</Grid>
			</Grid>
			{ifIsArray<IReview>(reviews).map(
				(r): JSX.Element => (
					<Grid item xs={12} sm={6} md={4} key={r._id}>
						<Grid
							container
							direction='column'
							sx={{
								marginBottom: 2,
								border: 2,
								borderStyle: 'solid',
								borderColor: theme.light.palette.primary.main,
								borderRadius: 5,
								height: 350,
								justifyContent: 'space-between',
								padding: 2,
							}}>
							<Box display='flex' alignItems='center'>
								<Logo width='100px' height='100px' />
								<Box ml={2}>
									<Typography variant='subtitle1'>{review.reviewer}</Typography>
									<Typography variant='body2' color='textSecondary'>
										{review.position}
									</Typography>
								</Box>
							</Box>
							{mutableReview?._id === review._id ? (
								<>
									<TextField
										label='Review Content'
										value={mutableReview?.content}
										onChange={(e): void => handleMutableReview<string>('content', e.target.value)}
										variant='outlined'
										multiline
										rows={3}
									/>
									<TextField
										label='Reviewer Position'
										value={mutableReview?.position}
										onChange={(e): void => handleMutableReview<string>('position', e.target.value)}
										variant='outlined'
									/>
									<TextField
										label='Review Stars'
										type='number'
										value={mutableReview?.rating}
										onChange={(e): void =>
											handleMutableReview<number>('rating', Number(e.target.value))
										}
										variant='outlined'
									/>
									<Box display='flex' justifyContent='flex-end'>
										<Button onClick={(): void => setMutableReview(null)} color='primary'>
											Cancel
										</Button>
										<Button
											onClick={(): void | null =>
												mutableReview && handleUpdateReview(mutableReview)
											}
											color='primary'>
											Save
										</Button>
									</Box>
								</>
							) : (
								<>
									<Typography variant='body1'>{review.content}</Typography>
									<Box display='flex' justifyContent='space-between' alignItems='center'>
										<Typography variant='body2'>{`Rating: ${review.rating}/5`}</Typography>
										<Box display='flex' alignItems='center'>
											<FormControlLabel
												control={
													<Checkbox
														checked={review.showOnLandingPage}
														onChange={(): string => review._id || ''}
														color='primary'
													/>
												}
												label='Show on Landing Page'
											/>
											<Button onClick={(): void => setMutableReview(review)} color='primary'>
												Edit
											</Button>
											<Button
												onClick={(): void => handleDeleteReview(review?._id || '')}
												color='primary'>
												Delete
											</Button>
										</Box>
									</Box>
								</>
							)}
						</Grid>
					</Grid>
				)
			)}
		</Grid>
	);
};

export default ReviewControlPage;
