import { Divider, Typography, useTheme } from '@mui/material';
import { CardSG, Flex } from 'components/common';
import { Icon } from '@iconify/react';
import { GreyText, IconBackground, SignUpButton } from '../index.styled';
import { PriceCardInterface } from '../index.interfaces';
import PriceCardBenefits from './benefits';

const PriceCard: React.FC<PriceCardInterface> = (props): JSX.Element => {

	const { icon, title, benefits } = props;
	const theme = useTheme();

	return (
		<CardSG height={470} width={350} hover>
			<Flex justifyCenter alignItems='center' width='100%' height='100%' id='test'>
				<Flex gap={2}>
					<IconBackground>
						<Icon icon={icon} width={36} height={36} color={theme.palette.primary.main} />
					</IconBackground>
					<Typography fontSize='30px' fontWeight='bold'>{title}</Typography>
				</Flex>
				<Divider />
				<PriceCardBenefits benefits={benefits}/>
				<Flex column justifyCenter gap={1}>
					<SignUpButton variant="contained">Sign up<Icon icon='maki:arrow' /></SignUpButton>
					<GreyText>Get started for free</GreyText>
				</Flex>
			</Flex>
		</CardSG>
	);
};

export default PriceCard;