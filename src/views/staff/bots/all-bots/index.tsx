import { Flex } from 'components/common';
import { Box, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router';
import { FC } from 'react';

export interface IBot {
	id: string;
	name?: string;
	role?: string;
	botNumber?: string;
	botStatus?: boolean;
	avatar?: string;
}

export const bots: IBot[] = [
	{
		id: '1',
		name: 'Dorel',
		role: 'reddit',
		botNumber: '1',
		botStatus: true,
		avatar: `
			https://st3.depositphotos.com/
			30456762/37578/v/450/depositphotos_375780486-stock-illustration-chat-bot-robot-avatar-in.jpg
		`,
	},
	{
		id: '2',
		name: 'Gica',
		role: 'youtube',
		botNumber: '2',
		botStatus: true,
		avatar: `
			https://st3.depositphotos.com/
			30456762/37578/v/450/depositphotos_375780486-stock-illustration-chat-bot-robot-avatar-in.jpg
		`,
	},
	{
		id: '3',
		name: 'Harap',
		role: 'facebook',
		botNumber: '3',
		botStatus: false,
		avatar: `
			https://st3.depositphotos.com/
			30456762/37578/v/450/depositphotos_375780486-stock-illustration-chat-bot-robot-avatar-in.jpg
		`,
	},
];

const AllBots: FC = () => {
	const navigate = useNavigate();

	// const { loading: loadingBots, getAllBots, data: bots } = useBotsActions();

	return (
		<>
			<Flex
				sx={{
					flexDirection: 'row',
					flexWrap: 'wrap',
					justifyContent: 'space-evenly',
				}}>
				{bots?.map((el: IBot, index: number) => (
					<Box
						key={el?.id}
						onClick={(): void => navigate(`/staff/bot-all-details/${el?.id}`)}
						sx={{
							width: 170,
							height: 150,
							borderStyle: 'solid',
							display: 'flex',
							justifyContent: 'space-between',
							padding: 2,
							borderRadius: 5,
							borderwidth: 2,
							borderColor: el.botStatus ? '#00FF5A' : '#ccc',
							marginBottom: 2,
							marginX: 1,
							backgroundImage:
								'linear-gradient(to right bottom,#cccccc, #c3c3c3, #bababa, #b1b1b1, #a8a8a8)',
							opacity: '0.9',
							boxShadow: '5px 5px 22px -6px rgba(0,0,0,0.75)',
							cursor: 'pointer',
							':hover': {
								boxShadow: '8px 8px 28px -6px rgba(0,0,0,0.75)',
								transform: 'scale(1.05)',
								transition: 'all .3s ease-in-out',
							},
						}}>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-around',
							}}>
							<Avatar src={el.avatar} sx={{ marginBottom: 1, width: 75, height: 75 }} />
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
								}}>
								<Typography
									style={{
										fontSize: 17,
										fontWeight: '600',
										color: '#fff',
									}}>
									{el?.name}
								</Typography>
								<Typography sx={{ color: '#fff' }}>Bot: {index + 1}</Typography>
							</Box>
						</Box>
					</Box>
				))}
			</Flex>
			<Box
				sx={{
					width: 400,
					height: 250,
					borderRadius: 5,
					borderStyle: 'solid',
					borderwidth: 2,
					borderColor: '#000',
				}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: 1,
					}}>
					<Typography sx={{ fontSize: 17, fontWeight: 800 }}>Roumanie</Typography>
					<Box
						component='img'
						sx={{
							height: 40,
							width: 180,
						}}
						alt='The house from the offer.'
						src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
					/>
					<Typography sx={{ fontSize: 17, fontWeight: 800 }}>Roumanie</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						marginLeft: 1,
						height: 140,
						width: '100%',
						flexDirection: 'row',
					}}>
					<Box
						component='img'
						sx={{
							height: 100,
							width: 60,
						}}
						alt='The house from the offer.'
						src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
					/>
					<Box sx={{ marginLeft: '3px' }}>
						<Typography sx={{}}>George</Typography>
						<Typography sx={{}}>Paun</Typography>
						<Typography sx={{}}>Romana</Typography>
						<Typography sx={{}}>Mun. Def Jud.Cluj</Typography>
						<Typography sx={{}}>Mun. Bucuresti Sec.5</Typography>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								width: '100%',
							}}>
							<Typography sx={{}}>D.E.P.A.B.D</Typography>
							<Typography sx={{ marginLeft: 10 }}>12.04.23-09-04.2030</Typography>
						</Box>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'ceneter',
						justifyContent: 'center',
						width: 300,
					}}>
					<Typography>
						TokentokentokentoasdjnafjdsngksjTokentokentokentoasdjnafjdsngksjTokentokentokentoasdjnafjdsngksj
					</Typography>
				</Box>
			</Box>
		</>
	);
};

export default AllBots;
