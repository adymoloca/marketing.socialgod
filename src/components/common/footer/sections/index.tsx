/* Imports go  here */
import { Theme, Typography, TypographyProps, styled, useTheme } from '@mui/material';
import { NavigateFunction, useNavigate } from 'react-router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize, uuid } from 'utils/functions';
import { ButtonText, SectionsWrapper, SectionWrapper } from './index.styled';
import { FooterChildren, FooterItem } from '..';

const AnimatedHoverText: FC<TypographyProps> = styled(Typography)(({ theme }) => ({
	color: theme.palette.common.white,
	fontWeight: '200px',
	transform: 'translateX(0px)',
	padding: '8px',
	// '@keyframes motion': {
	//     '0%': {  },
	//     '100%': {
	//     }
	// },
	':hover': {
		transform: 'translateX(7px)',
		color: theme.palette.primary.main,
		backgroundColor: theme.palette.background.default,
		// animation: "0.3s motion ease-in-out",
	},
	transition: 'all 0.3s ease-in-out',
	fontSize: '1.1rem',
}));

interface FooterSectionsProps {
	sections: FooterItem[];
}

const FooterSections: FC<FooterSectionsProps> = ({ sections }): JSX.Element => {
	const navigate: NavigateFunction = useNavigate();
	const theme = useTheme<Theme>();
	const { t } = useTranslation();

	return (
		<SectionsWrapper>
			{sections.map(
				(item: FooterItem): JSX.Element => (
					<SectionWrapper key={uuid()}>
						<Typography
							component='span'
							sx={{
								color: theme.palette.common.white,
								fontSize: '1.75rem',
								fontWeight: 600,
								m: '0 0 8px 8px',
							}}>
							{capitalize(t(item.title))}
						</Typography>
						{item.children.map(
							(childItem: FooterChildren): JSX.Element => (
								<span key={uuid()}>
									<ButtonText onClick={(): void => navigate(childItem.url)} size='small'>
										<AnimatedHoverText>{capitalize(t(childItem.title))}</AnimatedHoverText>
									</ButtonText>
								</span>
							)
						)}
					</SectionWrapper>
				)
			)}
		</SectionsWrapper>
	);
};

export default FooterSections;
