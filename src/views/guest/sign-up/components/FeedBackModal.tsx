import React, { FC } from 'react';
import { Box, BoxProps, Button, Dialog, DialogContent, Icon, Slide, Typography, styled, useTheme } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Close } from '@mui/icons-material';
import { LogoBoxAnimation } from 'components/landing/header/components/LogoBoxAnimation';
import { useNavigate } from 'react-router';
import Logo from 'components/common/logo';
import { uuid } from 'utils/functions';
import { modalData } from './modalData';

const FeedbackBox: FC<BoxProps> = styled(Box)(() => ({
	position: 'absolute',
	top: '40%',
	left: '-100px',
	transform: 'rotate(90deg)',
	'@keyframes enterScreen': {
		'0%': { left: '-100px' },
		'100%': { left: '-55px' },
	},
	animation: '1s ease-in 0.7s forwards enterScreen',
	zIndex: 1,
}));

const Transition = React.forwardRef(
	(
		props: TransitionProps & {
			children: React.ReactElement<any, any>;
		},
		ref: React.Ref<unknown>
	) => <Slide direction='up' ref={ref} {...props} />
);

const FeedBackModal: React.FC = () => {
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const navigate = useNavigate();

	const handleClickOpen = (): void => {
		setOpen(true);
	};

	const handleClose = (): void => {
		setOpen(false);
	};

	return (
		<FeedbackBox>
			<Button
				sx={{ borderRadius: '14px 14px 0 0', width: '150px' }}
				onClick={handleClickOpen}>
				Feedback
			</Button>
			<Dialog
				open={open}
				sx={{
					'.MuiBackdrop-root': {
						backgroundColor: 'rgba(128,144,160,.5)',
					},
				}}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby='alert-dialog-slide-description'>
				<Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
					<Button sx={{ width: '30px', color: '#696969' }} onClick={handleClose}>
						<Close />
					</Button>
				</Box>
				<DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mb: 3 }}>
					<LogoBoxAnimation sx={{ mb: 2 }}>
						<Logo width='200px' />
					</LogoBoxAnimation>
					{modalData?.map((item, _index) => (
						<Box
							key={`${item?.title} - ${uuid}`}
							onClick={(): void => navigate(item?.url)}
							sx={{
								width: '100%',
								display: 'flex',
								flexDirection: 'row',
								gap: 2,
								alignItems: 'center',
								px: 2,
								py: 1,
								cursor: 'pointer',
								borderRadius: '12px',
								':hover': {
									backgroundColor: 'rgba(128,144,160,.2)',
									'& > div > span': { color: `${theme.palette.primary.light}` },
								},
							}}>
							<Box
								sx={{
									border: '1px solid #9e9e9e',
									borderRadius: '50%',
									width: '60px',
									height: '60px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<Icon sx={{ color: '#9e9e9e', fontSize: '32px' }}>{item.icon}</Icon>
							</Box>
							<Box>
								<Typography sx={{ fontWeight: 600 }}>{item?.title}</Typography>
								<Typography sx={{ color: '#696969' }}>{item?.subtitle}</Typography>
							</Box>
						</Box>
					))}
				</DialogContent>
			</Dialog>
		</FeedbackBox>
	);
};

export default FeedBackModal;
