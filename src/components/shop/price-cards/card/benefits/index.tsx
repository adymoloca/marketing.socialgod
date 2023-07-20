import { Icon } from '@iconify/react';
import { Typography, useTheme } from '@mui/material';
import { Flex } from 'components/common';

interface IProps {
    benefits: string[]
}

const PriceCardBenefits: React.FC<IProps> = ({benefits}): JSX.Element  => {

	const theme = useTheme();

	const handleStaticBenefits = (index: number): string => {
		switch(index){
			case 0: {
				return 'Bonus Credits';
			}
			case 1: {
				return 'Upvote Price';
			}
			case 2: {
				return 'Credits Price';
			}
			case 3: {
				return 'Upvotes';
			}
			default: {
				return '';
			}
		}
	};

	return (
		<Flex gap={2} sx={{ my: 5 }}  >
			{benefits.map((benefit: string, index: number): JSX.Element => (
				<Flex key={`${benefit}-benefit`} gap={1} mr={2}>
					<Icon color={theme.palette.primary.main} icon='akar-icons:check-box-fill' width={25} />
					<Typography key={`${benefit}-benefit`} fontWeight='bold'>
						{`${handleStaticBenefits(index)}: ${benefit}`}
					</Typography>
				</Flex>
			))}
		</Flex>
	);};

export default PriceCardBenefits;